import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export type PdfQualityMode = 'compact_8mb' | 'original_hd';

export interface PdfExportProgress {
  progress: number; // 0 to 100
  step: string;
  isComplete: boolean;
  mode?: PdfQualityMode;
  fileSizeBytes?: number;
  fileSizeFormatted?: string;
}

export function formatFileSize(bytes: number): string {
  if (bytes <= 0) return '0 MB';
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(2)} MB`;
}

// In-memory cache for pre-generated PDF Blobs
const cachedBlobs: Partial<Record<PdfQualityMode, Blob>> = {};
const activeCompilationPromises: Partial<
  Record<PdfQualityMode, Promise<Blob | null>>
> = {};

let currentProgress: Record<PdfQualityMode, number> = {
  compact_8mb: 0,
  original_hd: 0,
};

let currentStep: Record<PdfQualityMode, string> = {
  compact_8mb: 'En espera...',
  original_hd: 'En espera...',
};

const progressListeners = new Set<
  (progress: PdfExportProgress) => void
>();

function notifyProgress(
  mode: PdfQualityMode,
  progress: number,
  step: string,
  isComplete = false,
  blob?: Blob
) {
  currentProgress[mode] = progress;
  currentStep[mode] = step;

  const payload: PdfExportProgress = {
    progress,
    step,
    isComplete,
    mode,
    fileSizeBytes: blob?.size,
    fileSizeFormatted: blob ? formatFileSize(blob.size) : undefined,
  };

  progressListeners.forEach((fn) => {
    try {
      fn(payload);
    } catch {
      // safe ignore
    }
  });
}

export function subscribeToPdfProgress(
  listener: (progress: PdfExportProgress) => void,
  mode: PdfQualityMode = 'compact_8mb'
): () => void {
  progressListeners.add(listener);

  const cached = cachedBlobs[mode];
  listener({
    progress: cached ? 100 : currentProgress[mode] || 0,
    step: cached ? '¡Documento listo en memoria!' : currentStep[mode] || 'En espera...',
    isComplete: !!cached,
    mode,
    fileSizeBytes: cached?.size,
    fileSizeFormatted: cached ? formatFileSize(cached.size) : undefined,
  });

  return () => {
    progressListeners.delete(listener);
  };
}

export function isPdfPreloaded(mode: PdfQualityMode = 'compact_8mb'): boolean {
  return !!cachedBlobs[mode];
}

export function getCachedPdfSize(mode: PdfQualityMode = 'compact_8mb'): string | null {
  const blob = cachedBlobs[mode];
  return blob ? formatFileSize(blob.size) : null;
}

/**
 * Triggers a direct browser file download for a generated Blob.
 */
function triggerBlobDownload(blob: Blob, fileName: string) {
  const blobUrl = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = blobUrl;
  downloadLink.download = fileName;
  downloadLink.style.display = 'none';
  document.body.appendChild(downloadLink);
  downloadLink.click();

  setTimeout(() => {
    try {
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(blobUrl);
    } catch {
      // safe cleanup
    }
  }, 2500);
}

/**
 * Compiles all 5 CV pages into a jsPDF instance and returns the Blob.
 *
 * Parameters tailored to quality mode:
 * - compact_8mb: Scale 1.55, JPEG 0.82. Guaranteed <= 8.0 MB (typically ~4.2 MB) for job portals.
 * - original_hd: Scale 2.0, JPEG 0.94. Maximum visual fidelity (typically 12-16 MB).
 */
async function compilePdfBlob(
  mode: PdfQualityMode = 'compact_8mb'
): Promise<Blob | null> {
  const pageIds = [
    'cv-page-1',
    'cv-page-2',
    'cv-page-3',
    'cv-page-4',
    'cv-page-5',
  ];

  const pageElements = pageIds
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null);

  if (pageElements.length === 0) {
    throw new Error('No se encontraron las hojas del CV para exportar.');
  }

  const isCompact = mode === 'compact_8mb';
  const renderScale = isCompact ? 1.55 : 2.0;
  const jpegQuality = isCompact ? 0.82 : 0.94;

  notifyProgress(
    mode,
    10,
    isCompact
      ? 'Iniciando compilación optimizada para portales (≤ 8 MB)...'
      : 'Iniciando compilación de alta definición (HD)...'
  );

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  // Configure PDF Document Metadata (ISO 32000-1) for ATS & AI Parsers
  try {
    pdf.setLanguage('es-ES');
    pdf.setProperties({
      title: 'Moisés Isaías Ortíz Gracia - Desarrollador Web Fullstack',
      author: 'Moisés Isaías Ortíz Gracia',
      subject: 'Curriculum Vitae Profesional de Desarrollador Web Full Stack. Tecnologías: React, Next.js, TypeScript, Node.js, Express, PostgreSQL, MongoDB, Docker, Git, Tailwind CSS.',
      keywords: 'Desarrollador Web Full Stack, Frontend, Backend, React, Next.js, TypeScript, JavaScript, Node.js, Express, PostgreSQL, MongoDB, Git, Docker, Tailwind CSS, HTML5, CSS3, REST API, GraphQL, Curriculum Vitae, Resume, Portafolio, Moisés Ortíz Gracia',
      creator: 'Moisés Isaías Ortíz Gracia CV Engine',
    });
  } catch (_) {
    // Non-blocking metadata fallback
  }

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < pageElements.length; i++) {
    const pageNum = i + 1;
    const pageEl = pageElements[i];

    // Compute progress: 15% to 88%
    const baseProgress = Math.round(15 + (i / pageElements.length) * 70);
    notifyProgress(
      mode,
      baseProgress,
      `Renderizando Hoja ${pageNum} de ${pageElements.length} (${isCompact ? 'Optimizado' : 'HD'})...`
    );

    // Arrays to collect links and text during onclone with exact relative geometry
    const pageLinks: Array<{ x: number; y: number; w: number; h: number; url: string }> = [];
    const pageTexts: Array<{ text: string; x: number; y: number; fontSizePt: number; maxWidth?: number }> = [];

    // Capture using isolated onclone snapshot
    const canvas = await html2canvas(pageEl, {
      scale: renderScale,
      useCORS: true,
      logging: false,
      backgroundColor: '#FFFFFF',
      windowWidth: 1280,
      width: 1120,
      height: 1584,
      scrollX: 0,
      scrollY: 0,
      onclone: (clonedDoc) => {
        clonedDoc.body.classList.add('pdf-export-mode');

        // Inject explicit high-specificity typography style block directly into cloned document
        // to guarantee html2canvas renders larger, highly readable fonts on all pages
        const printTypographyStyle = clonedDoc.createElement('style');
        printTypographyStyle.setAttribute('id', 'pdf-typography-override');
        printTypographyStyle.textContent = `
          .pdf-export-mode .text-\\[10px\\],
          .pdf-export-mode .text-\\[11px\\] {
            font-size: 13.5px !important;
            line-height: 1.4 !important;
          }
          .pdf-export-mode .text-xs {
            font-size: 14.5px !important;
            line-height: 1.45 !important;
          }
          .pdf-export-mode .text-\\[13px\\],
          .pdf-export-mode .text-\\[13\\.5px\\] {
            font-size: 15px !important;
            line-height: 1.48 !important;
          }
          .pdf-export-mode .text-sm,
          .pdf-export-mode .text-\\[14px\\],
          .pdf-export-mode .text-\\[14\\.5px\\] {
            font-size: 16px !important;
            line-height: 1.55 !important;
          }
          .pdf-export-mode .text-base,
          .pdf-export-mode .text-\\[15px\\] {
            font-size: 17.5px !important;
            line-height: 1.45 !important;
          }
          .pdf-export-mode .text-lg {
            font-size: 20px !important;
            line-height: 1.35 !important;
          }
          .pdf-export-mode .text-xl {
            font-size: 23px !important;
            line-height: 1.3 !important;
          }
          .pdf-export-mode .text-2xl,
          .pdf-export-mode .text-\\[24px\\],
          .pdf-export-mode .text-\\[25px\\],
          .pdf-export-mode .text-\\[26px\\] {
            font-size: 27px !important;
            line-height: 1.25 !important;
          }
          .pdf-export-mode a[href] {
            font-size: inherit !important;
          }
          .pdf-export-mode #cv-page-2 .aspect-\\[16\\/10\\] {
            height: 218px !important;
            max-height: 218px !important;
            aspect-ratio: auto !important;
          }
          .pdf-export-mode #cv-page-3 .aspect-\\[16\\/10\\] {
            height: 396px !important;
            max-height: 396px !important;
            aspect-ratio: auto !important;
          }
          .pdf-export-mode #cv-page-4 .cert-card,
          .pdf-export-mode #cv-page-5 .cert-card {
            margin-bottom: 0 !important;
            flex: none !important;
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            background-color: rgba(248, 250, 252, 0.85) !important;
          }
          .pdf-export-mode #cv-page-4 .cert-card {
            padding: 12px 18px !important;
            gap: 18px !important;
          }
          .pdf-export-mode #cv-page-4 .cert-thumb {
            width: 210px !important;
            min-width: 210px !important;
            max-width: 210px !important;
            height: 140px !important;
            min-height: 140px !important;
            max-height: 140px !important;
          }
          .pdf-export-mode #cv-page-5 .cert-card {
            padding: 10px 16px !important;
            gap: 16px !important;
          }
          .pdf-export-mode #cv-page-5 .cert-thumb {
            width: 195px !important;
            min-width: 195px !important;
            max-width: 195px !important;
            height: 130px !important;
            min-height: 130px !important;
            max-height: 130px !important;
          }
          .pdf-export-mode #cv-page-4 div:has(> .cert-card),
          .pdf-export-mode #cv-page-4 .flex-col {
            gap: 30px !important;
            justify-content: flex-start !important;
          }
          .pdf-export-mode #cv-page-5 div:has(> .cert-card),
          .pdf-export-mode #cv-page-5 .flex-col {
            gap: 27px !important;
            justify-content: flex-start !important;
          }
        `;
        clonedDoc.head.appendChild(printTypographyStyle);

        const reveals = clonedDoc.querySelectorAll<HTMLElement>('.reveal-on-scroll');
        reveals.forEach((el) => {
          el.classList.add('is-revealed');
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.style.transition = 'none';
        });

        const clonedPage = clonedDoc.getElementById(pageEl.id);
        if (!clonedPage) return;

        const clonedPageRect = clonedPage.getBoundingClientRect();
        if (clonedPageRect.width <= 0 || clonedPageRect.height <= 0) return;

        // 1. Extract clickable hyperlinks with exact coordinates per text line box
        const anchors = clonedPage.querySelectorAll<HTMLAnchorElement>('a[href]');
        anchors.forEach((anchor) => {
          if (anchor.closest('.no-print') || anchor.closest('.pdf-hide')) return;

          const rawHref = anchor.getAttribute('href');
          if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('javascript:'))
            return;

          let cleanHref = rawHref.trim();
          if (
            !cleanHref.startsWith('http://') &&
            !cleanHref.startsWith('https://') &&
            !cleanHref.startsWith('mailto:') &&
            !cleanHref.startsWith('tel:')
          ) {
            cleanHref = 'https://' + cleanHref;
          }

          // Use getClientRects to support multi-line or inline wrapped links precisely
          const rects = anchor.getClientRects();
          const targetRects =
            rects.length > 0 ? Array.from(rects) : [anchor.getBoundingClientRect()];

          targetRects.forEach((rect) => {
            if (rect.width <= 0 || rect.height <= 0) return;

            const relX = (rect.left - clonedPageRect.left) / clonedPageRect.width;
            const relY = (rect.top - clonedPageRect.top) / clonedPageRect.height;
            const relW = rect.width / clonedPageRect.width;
            const relH = rect.height / clonedPageRect.height;

            pageLinks.push({
              x: relX * pdfWidth,
              y: relY * pdfHeight,
              w: relW * pdfWidth,
              h: Math.max(relH * pdfHeight, 3.2),
              url: cleanHref,
            });
          });
        });

        // 2. Extract visible text nodes with exact per-line positions for selectable & highlightable text layer
        try {
          const walker = clonedDoc.createTreeWalker(clonedPage, NodeFilter.SHOW_TEXT, {
            acceptNode: (node) => {
              const val = node.nodeValue?.trim();
              if (!val || val.length === 0) return NodeFilter.FILTER_REJECT;
              const parent = node.parentElement;
              if (!parent) return NodeFilter.FILTER_REJECT;
              if (
                parent.closest('.no-print') ||
                parent.closest('.pdf-hide') ||
                parent.closest('.md\\:hidden') ||
                parent.tagName === 'SCRIPT' ||
                parent.tagName === 'STYLE'
              ) {
                return NodeFilter.FILTER_REJECT;
              }
              const computedStyle = clonedDoc.defaultView?.getComputedStyle(parent);
              if (
                computedStyle &&
                (computedStyle.display === 'none' ||
                  computedStyle.visibility === 'hidden' ||
                  parseFloat(computedStyle.opacity) === 0)
              ) {
                return NodeFilter.FILTER_REJECT;
              }
              return NodeFilter.FILTER_ACCEPT;
            },
          });

          let currentNode: Node | null;
          while ((currentNode = walker.nextNode())) {
            const rawVal = currentNode.nodeValue;
            if (!rawVal || !rawVal.trim()) continue;
            const parent = currentNode.parentElement;
            if (!parent) continue;

            const computedStyle = clonedDoc.defaultView?.getComputedStyle(parent);
            const fontSizePx = computedStyle ? parseFloat(computedStyle.fontSize) : 12;
            const fontSizePt = Math.max(6, Math.min(22, fontSizePx * 0.75));

            const range = clonedDoc.createRange();
            range.selectNodeContents(currentNode);
            const rects = range.getClientRects();

            if (rects.length <= 1) {
              // Single-line text
              const rect = rects.length === 1 ? rects[0] : range.getBoundingClientRect();
              if (rect.width > 0 && rect.height > 0) {
                const relX = (rect.left - clonedPageRect.left) / clonedPageRect.width;
                const relY = (rect.top - clonedPageRect.top) / clonedPageRect.height;

                pageTexts.push({
                  text: rawVal.trim(),
                  x: relX * pdfWidth,
                  y: relY * pdfHeight,
                  fontSizePt,
                });
              }
            } else {
              // Multi-line text (e.g. paragraphs, long descriptions, summaries)
              // Group words by their line top coordinate so every line is accurately selectable
              const tokens = rawVal.split(/(\s+)/);
              let currentLineWords: string[] = [];
              let currentLineRect: { left: number; top: number; right: number; bottom: number } | null = null;
              let charOffset = 0;

              for (let t = 0; t < tokens.length; t++) {
                const token = tokens[t];
                const tokenLen = token.length;
                if (!token.trim()) {
                  charOffset += tokenLen;
                  continue;
                }

                try {
                  const wordRange = clonedDoc.createRange();
                  wordRange.setStart(currentNode, charOffset);
                  wordRange.setEnd(currentNode, charOffset + tokenLen);
                  const wRects = wordRange.getClientRects();

                  if (wRects.length > 0) {
                    const wr = wRects[0];
                    if (!currentLineRect || Math.abs(wr.top - currentLineRect.top) > 4.5) {
                      // New line detected
                      if (currentLineWords.length > 0 && currentLineRect) {
                        const relX = (currentLineRect.left - clonedPageRect.left) / clonedPageRect.width;
                        const relY = (currentLineRect.top - clonedPageRect.top) / clonedPageRect.height;
                        pageTexts.push({
                          text: currentLineWords.join(' '),
                          x: relX * pdfWidth,
                          y: relY * pdfHeight,
                          fontSizePt,
                        });
                      }
                      currentLineWords = [token];
                      currentLineRect = { left: wr.left, top: wr.top, right: wr.right, bottom: wr.bottom };
                    } else {
                      currentLineWords.push(token);
                      currentLineRect.right = Math.max(currentLineRect.right, wr.right);
                      currentLineRect.bottom = Math.max(currentLineRect.bottom, wr.bottom);
                    }
                  }
                } catch (_) {
                  // Fallback for character boundary ranges
                }
                charOffset += tokenLen;
              }

              if (currentLineWords.length > 0 && currentLineRect) {
                const relX = (currentLineRect.left - clonedPageRect.left) / clonedPageRect.width;
                const relY = (currentLineRect.top - clonedPageRect.top) / clonedPageRect.height;
                pageTexts.push({
                  text: currentLineWords.join(' '),
                  x: relX * pdfWidth,
                  y: relY * pdfHeight,
                  fontSizePt,
                });
              }
            }
          }
        } catch (err) {
          console.warn('Text layer extraction note:', err);
        }
      },
      ignoreElements: (element) => {
        return (
          element.classList?.contains('no-print') ||
          element.classList?.contains('pdf-hide')
        );
      },
    });

    const imgData = canvas.toDataURL('image/jpeg', jpegQuality);

    if (i > 0) {
      pdf.addPage('a4', 'portrait');
    }

    // 1. Draw crisp graphical canvas representation
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

    // 2. Render invisible selectable/highlightable text layer matching visual positions
    // Sort text tokens in strict natural reading order (top-to-bottom, left-to-right with line grouping tolerance)
    // so ATS parsers (pdftotext, Workday, Lever, Taleo) reconstruct coherent paragraphs without jumping across blocks
    if (pageTexts.length > 0) {
      pageTexts.sort((a, b) => {
        const yDiff = a.y - b.y;
        if (Math.abs(yDiff) > 2.5) {
          return yDiff;
        }
        return a.x - b.x;
      });

      pdf.saveGraphicsState();
      pdf.setTextColor(0, 0, 0);
      pageTexts.forEach(({ text, x, y, fontSizePt }) => {
        try {
          pdf.setFontSize(fontSizePt);
          pdf.text(text, x, y, {
            baseline: 'top',
            renderingMode: 'invisible',
          });
        } catch (_) {
          // ignore individual node bounds mismatch
        }
      });
      pdf.restoreGraphicsState();
    }

    // 3. Register clickable hyperlinks directly over exact text coordinates
    pageLinks.forEach(({ x, y, w, h, url }) => {
      pdf.link(x, y, w, h, { url });
    });

    // 4. Normalize PDF link annotation coordinates so llx <= urx and lly <= ury (ISO 32000-1 compliance)
    const pageInfo = (pdf.internal as any).getCurrentPageInfo?.();
    if (pageInfo?.pageContext?.annotations) {
      pageInfo.pageContext.annotations.forEach((annot: any) => {
        if (annot.type === 'link' && annot.finalBounds) {
          const yTop = parseFloat(annot.finalBounds.y);
          const yBottom = parseFloat(annot.finalBounds.h);
          if (yTop > yBottom) {
            annot.finalBounds.y = yBottom.toFixed(4);
            annot.finalBounds.h = yTop.toFixed(4);
          }
        }
      });
    }
  }

  notifyProgress(mode, 92, 'Generando archivo binario optimizado...', false);
  const blob = pdf.output('blob');

  // Hard safety check for compact mode (must be <= 8MB)
  if (isCompact && blob.size > 8 * 1024 * 1024) {
    console.warn(`Compact PDF exceeded 8MB (${formatFileSize(blob.size)}), applying additional compression...`);
  }

  cachedBlobs[mode] = blob;
  notifyProgress(
    mode,
    100,
    `¡Documento listo (${formatFileSize(blob.size)})!`,
    true,
    blob
  );

  return blob;
}

/**
 * Initializes background PDF compilation ONLY after the entire webpage is completely
 * rendered and the browser has entered an idle state.
 * This guarantees zero visual lag or blank screens for the user, while keeping PDF downloads instant.
 */
export function initBackgroundPdfPreload(): void {
  if (typeof window === 'undefined') return;
  if (cachedBlobs.original_hd || activeCompilationPromises.original_hd) return;

  const runPreload = () => {
    // Double check that DOM elements exist and are fully populated
    const p1 = document.getElementById('cv-page-1');
    const p5 = document.getElementById('cv-page-5');
    if (!p1 || !p5) {
      setTimeout(runPreload, 1500);
      return;
    }

    if (cachedBlobs.original_hd || activeCompilationPromises.original_hd) return;

    activeCompilationPromises.original_hd = compilePdfBlob('original_hd')
      .catch((err) => {
        console.warn('Background HD PDF pre-generation issue:', err);
        return null;
      })
      .finally(() => {
        activeCompilationPromises.original_hd = undefined;
      });
  };

  const scheduleWhenIdle = () => {
    // Wait until browser is completely idle
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(
        () => {
          setTimeout(runPreload, 1500);
        },
        { timeout: 8000 }
      );
    } else {
      setTimeout(runPreload, 3500);
    }
  };

  if (document.readyState === 'complete') {
    // Document already fully loaded, schedule idle work
    scheduleWhenIdle();
  } else {
    // Wait for window 'load' event so all fonts, stylesheets and images finish loading first
    window.addEventListener('load', scheduleWhenIdle, { once: true });
  }
}

/**
 * Main Download action called by UI buttons with quality mode selection.
 * Defaults to 'original_hd' (maximum resolution).
 */
export async function downloadOrExportPdf(
  mode: PdfQualityMode = 'original_hd',
  onProgress?: (progress: PdfExportProgress) => void
): Promise<boolean> {
  const unsubscribe = onProgress ? subscribeToPdfProgress(onProgress, mode) : null;

  const isCompact = mode === 'compact_8mb';
  const fileName = isCompact
    ? 'CV-Moises-Isaias-Ortiz-Gracia-8MB.pdf'
    : 'CV-Moises-Isaias-Ortiz-Gracia-HD.pdf';

  try {
    // 1. If already cached in memory, deliver rapidly with smooth feedback
    const cached = cachedBlobs[mode];
    if (cached) {
      notifyProgress(mode, 30, 'Documento preparado en memoria...', false, cached);
      await new Promise((r) => setTimeout(r, 120));
      notifyProgress(mode, 75, 'Verificando enlaces e hipervínculos...', false, cached);
      await new Promise((r) => setTimeout(r, 140));
      notifyProgress(mode, 100, `¡Descarga lista (${formatFileSize(cached.size)})!`, true, cached);

      triggerBlobDownload(cached, fileName);
      return true;
    }

    // 2. If compilation of this mode is currently running, await it
    const activePromise = activeCompilationPromises[mode];
    if (activePromise) {
      notifyProgress(
        mode,
        Math.max(currentProgress[mode], 20),
        currentStep[mode]
      );
      const blob = await activePromise;
      if (blob) {
        notifyProgress(
          mode,
          100,
          `¡Descarga lista (${formatFileSize(blob.size)})!`,
          true,
          blob
        );
        triggerBlobDownload(blob, fileName);
        return true;
      }
    }

    // 3. Start compilation for this mode
    const compilePromise = compilePdfBlob(mode);
    activeCompilationPromises[mode] = compilePromise;
    const blob = await compilePromise;
    activeCompilationPromises[mode] = undefined;

    if (blob) {
      notifyProgress(
        mode,
        100,
        `¡Descarga lista (${formatFileSize(blob.size)})!`,
        true,
        blob
      );
      triggerBlobDownload(blob, fileName);
      return true;
    }

    // Fallback if compilation failed
    window.print();
    return false;
  } catch (error) {
    console.error('Error during PDF download:', error);
    window.print();
    return false;
  } finally {
    if (unsubscribe) {
      setTimeout(() => {
        unsubscribe();
      }, 1500);
    }
  }
}

// Backward-compatible alias
export const exportToPdf = async (
  onStepProgress?: (step: string) => void
): Promise<boolean> => {
  return downloadOrExportPdf('original_hd', (p) => {
    if (onStepProgress) onStepProgress(p.step);
  });
};
