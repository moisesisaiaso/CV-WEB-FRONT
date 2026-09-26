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
      windowWidth: 1120,
      scrollX: 0,
      scrollY: 0,
      onclone: (clonedDoc) => {
        clonedDoc.body.classList.add('pdf-export-mode');

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

        // 1. Extract clickable hyperlinks with exact coordinates relative to clonedPage
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

          const rect = anchor.getBoundingClientRect();
          if (rect.width <= 0 || rect.height <= 0) return;

          const relX = (rect.left - clonedPageRect.left) / clonedPageRect.width;
          const relY = (rect.top - clonedPageRect.top) / clonedPageRect.height;
          const relW = rect.width / clonedPageRect.width;
          const relH = rect.height / clonedPageRect.height;

          // Provide precise hit target with slight vertical padding
          pageLinks.push({
            x: relX * pdfWidth,
            y: Math.max(0, relY * pdfHeight - 0.3),
            w: relW * pdfWidth,
            h: Math.max(relH * pdfHeight + 0.6, 3.8),
            url: cleanHref,
          });
        });

        // 2. Extract visible text nodes for invisible selectable/highlightable text layer
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
                parent.tagName === 'SCRIPT' ||
                parent.tagName === 'STYLE'
              ) {
                return NodeFilter.FILTER_REJECT;
              }
              return NodeFilter.FILTER_ACCEPT;
            },
          });

          let currentNode: Node | null;
          while ((currentNode = walker.nextNode())) {
            const val = currentNode.nodeValue?.trim();
            if (!val) continue;
            const parent = currentNode.parentElement;
            if (!parent) continue;

            const range = clonedDoc.createRange();
            range.selectNodeContents(currentNode);
            const rects = range.getClientRects();

            for (let r = 0; r < rects.length; r++) {
              const rect = rects[r];
              if (rect.width <= 0 || rect.height <= 0) continue;

              const relX = (rect.left - clonedPageRect.left) / clonedPageRect.width;
              const relY = (rect.top - clonedPageRect.top) / clonedPageRect.height;
              const relW = rect.width / clonedPageRect.width;

              const computedStyle = clonedDoc.defaultView?.getComputedStyle(parent);
              const fontSizePx = computedStyle ? parseFloat(computedStyle.fontSize) : 12;
              const fontSizePt = Math.max(6, Math.min(22, fontSizePx * 0.75));

              pageTexts.push({
                text: val,
                x: relX * pdfWidth,
                y: relY * pdfHeight,
                fontSizePt,
                maxWidth: relW * pdfWidth,
              });
              break;
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

    // 2. Render invisible selectable/highlightable text layer
    if (pageTexts.length > 0) {
      pdf.saveGraphicsState();
      pdf.setTextColor(0, 0, 0);
      pageTexts.forEach(({ text, x, y, fontSizePt, maxWidth }) => {
        try {
          pdf.setFontSize(fontSizePt);
          pdf.text(text, x, y, {
            baseline: 'top',
            renderingMode: 'invisible',
            maxWidth: maxWidth && maxWidth > 4 ? maxWidth : undefined,
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
 * Initializes silent background PDF compilation when the page loads.
 * Preloads the primary High-Definition (HD) version first so downloads are instantaneous.
 */
export function initBackgroundPdfPreload(): void {
  if (typeof window === 'undefined') return;
  if (cachedBlobs.original_hd || activeCompilationPromises.original_hd) return;

  const startTask = () => {
    const p1 = document.getElementById('cv-page-1');
    if (!p1) {
      setTimeout(startTask, 400);
      return;
    }

    activeCompilationPromises.original_hd = compilePdfBlob('original_hd')
      .catch((err) => {
        console.warn('Background HD PDF pre-generation issue:', err);
        return null;
      })
      .finally(() => {
        activeCompilationPromises.original_hd = undefined;
      });
  };

  if ('requestIdleCallback' in window) {
    setTimeout(() => {
      (window as any).requestIdleCallback(startTask, { timeout: 3500 });
    }, 1200);
  } else {
    setTimeout(startTask, 1200);
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
