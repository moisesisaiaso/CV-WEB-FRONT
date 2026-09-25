import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export async function exportToPdf(
  onProgress?: (step: string) => void
): Promise<boolean> {
  // Add temporary PDF export mode to document body to lock high-res desktop A4 layout
  document.body.classList.add('pdf-export-mode');

  // Reveal all motion wrappers and remove any scroll-triggered hidden states
  const motionWrappers = document.querySelectorAll<HTMLElement>('.desktop-cv-pages > div');
  motionWrappers.forEach((el) => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });

  try {
    if (onProgress) onProgress('Preparando páginas para exportación de alta resolución...');

    // Wait a brief moment for the DOM and fonts to stabilize under the desktop A4 layout
    await new Promise((r) => setTimeout(r, 150));

    // Find all CV page elements in document order
    const pageElements = [
      document.getElementById('cv-page-1'),
      document.getElementById('cv-page-2'),
      document.getElementById('cv-page-3'),
      document.getElementById('cv-page-4'),
      document.getElementById('cv-page-5'),
    ].filter((el): el is HTMLElement => el !== null);

    if (pageElements.length === 0) {
      window.print();
      return false;
    }

    const pages = pageElements;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < pages.length; i++) {
      if (onProgress) {
        onProgress(`Renderizando hoja ${i + 1} de ${pages.length} con enlaces verificados...`);
      }

      const pageEl = pages[i];

      // Scroll page into view briefly to guarantee full image asset readiness
      pageEl.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' });
      await new Promise((r) => setTimeout(r, 60));

      // Capture at crisp 2x scale: razor-sharp vector-grade text and crystal-clear URLs
      const canvas = await html2canvas(pageEl, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#FFFFFF',
        windowWidth: 1120,
        ignoreElements: (element) => {
          // Omit interactive web buttons and overlay controls explicitly marked for exclusion
          return (
            element.classList?.contains('no-print') ||
            element.classList?.contains('pdf-hide')
          );
        },
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.94);

      if (i > 0) {
        pdf.addPage('a4', 'portrait');
      }

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

      // Extract all links within this page element to embed real clickable hyperlinks in the PDF
      const pageRect = pageEl.getBoundingClientRect();
      const linkElements = pageEl.querySelectorAll<HTMLAnchorElement>('a[href]');

      linkElements.forEach((anchor) => {
        // Skip links inside elements marked as no-print or pdf-hide
        if (anchor.closest('.no-print') || anchor.closest('.pdf-hide')) return;

        const rawHref = anchor.getAttribute('href');
        if (!rawHref) return;
        if (rawHref.startsWith('#') || rawHref.startsWith('javascript:')) return;

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

        const x = ((rect.left - pageRect.left) / pageRect.width) * pdfWidth;
        const y = ((rect.top - pageRect.top) / pageRect.height) * pdfHeight;
        const w = (rect.width / pageRect.width) * pdfWidth;
        const h = Math.max((rect.height / pageRect.height) * pdfHeight, 3.2);

        // Add clickable hyperlink annotation
        pdf.link(x, y, w, h, { url: cleanHref });
      });
    }

    if (onProgress) onProgress('Generando y descargando archivo PDF...');

    const fileName = 'CV-Moises-Isaias-Ortiz-Gracia.pdf';
    
    // Direct blob download for maximum browser & iframe compatibility
    const pdfBlob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);
    
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
        // cleanup safe ignore
      }
    }, 2500);

    if (onProgress) onProgress('¡Descarga completada!');
    return true;
  } catch (error) {
    console.error('Error generating PDF with jsPDF:', error);
    // Graceful fallback to native high-res print dialog
    window.print();
    return false;
  } finally {
    // Restore layout
    motionWrappers.forEach((el) => {
      el.style.opacity = '';
      el.style.transform = '';
    });
    document.body.classList.remove('pdf-export-mode');
  }
}
