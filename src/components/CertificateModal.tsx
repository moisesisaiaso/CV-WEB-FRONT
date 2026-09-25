import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  Download,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Award,
  Calendar,
  Building,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import { CertificateItem } from '../types/cv';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
  certificates: CertificateItem[];
  onSelectCertificate: (cert: CertificateItem) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
  certificates,
  onSelectCertificate,
}) => {
  const [copied, setCopied] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && certificate) {
        const currentIndex = certificates.findIndex((c) => c.id === certificate.id);
        if (currentIndex < certificates.length - 1) {
          onSelectCertificate(certificates[currentIndex + 1]);
        }
      } else if (e.key === 'ArrowLeft' && certificate) {
        const currentIndex = certificates.findIndex((c) => c.id === certificate.id);
        if (currentIndex > 0) {
          onSelectCertificate(certificates[currentIndex - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [certificate, certificates, onClose, onSelectCertificate]);

  // Reset zoom on certificate change
  useEffect(() => {
    setZoomLevel(1);
  }, [certificate?.id]);

  if (!certificate) return null;

  const currentIndex = certificates.findIndex((c) => c.id === certificate.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < certificates.length - 1;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(certificate.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm">
        {/* Backdrop click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-transparent cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[96vh] sm:max-h-[92vh]"
        >
          {/* Header Bar - Sticky at top with fully responsive title and guaranteed visible 'X' close button */}
          <div className="sticky top-0 z-30 flex items-center justify-between gap-2.5 px-3.5 sm:px-6 py-3 sm:py-3.5 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0 pr-1">
              <div className="w-8 h-8 rounded-lg bg-[#2E4D71]/10 text-[#2E4D71] flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-semibold block leading-tight">
                  Certificado {currentIndex + 1} de {certificates.length}
                </span>
                <h3 className="text-xs sm:text-sm md:text-base font-bold text-slate-900 leading-snug break-words whitespace-normal mt-0.5">
                  {certificate.title}
                </h3>
              </div>
            </div>

            {/* Always visible, high contrast Close 'X' Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 flex items-center justify-center shrink-0 transition-colors cursor-pointer shadow-xs border border-slate-300"
              aria-label="Cerrar modal de certificado"
              title="Cerrar (Esc)"
            >
              <X className="w-5 h-5 text-slate-800" strokeWidth={2.5} />
            </button>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center justify-between gap-2 px-3 sm:px-6 py-2 sm:py-2.5 bg-slate-100/80 border-b border-slate-200 text-xs text-slate-600 overflow-x-auto no-scrollbar">
            {/* Prev / Next */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                disabled={!hasPrev}
                onClick={() => hasPrev && onSelectCertificate(certificates[currentIndex - 1])}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-slate-700 font-medium cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Anterior</span>
              </button>

              <button
                disabled={!hasNext}
                onClick={() => hasNext && onSelectCertificate(certificates[currentIndex + 1])}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-slate-700 font-medium cursor-pointer shadow-2xs"
              >
                <span className="hidden sm:inline">Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Zoom controls on desktop */}
              <div className="hidden md:flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 ml-2 shadow-2xs">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.15))}
                  className="p-1 hover:bg-slate-100 rounded text-slate-700 cursor-pointer"
                  title="Reducir zoom"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-1 text-[11px] font-mono min-w-10 text-center text-slate-700">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.15))}
                  className="p-1 hover:bg-slate-100 rounded text-slate-700 cursor-pointer"
                  title="Aumentar zoom"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1 hover:bg-slate-100 rounded text-slate-700 cursor-pointer"
                  title="Restablecer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Download & External Link */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleCopyLink}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors cursor-pointer shadow-2xs"
                title="Copiar enlace"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copiar Enlace</span>
                  </>
                )}
              </button>

              <a
                href={certificate.imageUrl}
                download={`${certificate.id}.png`}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors cursor-pointer shadow-2xs"
                title="Descargar imagen"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Descargar</span>
              </a>

              <a
                href={certificate.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#2E4D71] text-white hover:bg-[#233D5D] font-medium transition-colors cursor-pointer shadow-2xs"
              >
                <span>Mega</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Certificate Image Viewport */}
          <div className="flex-1 overflow-auto p-3 sm:p-6 bg-slate-900/90 flex items-center justify-center min-h-[300px] max-h-[70vh]">
            <div
              ref={certRef}
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
                transition: 'transform 0.15s ease-out',
              }}
              className="relative max-w-full flex items-center justify-center select-none"
            >
              <img
                src={certificate.imageUrl}
                alt={certificate.title}
                className="max-h-[66vh] max-w-full w-auto h-auto object-contain rounded-xs shadow-2xl transition-transform"
                onError={(e) => {
                  console.error('Failed to load image:', certificate.imageUrl);
                }}
              />
            </div>
          </div>

          {/* Footer Details */}
          <div className="px-4 sm:px-6 py-3 bg-white border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
            <div className="space-y-0.5 min-w-0 flex-1">
              <div className="flex items-center gap-2 text-slate-600 flex-wrap">
                <span className="font-semibold text-slate-900 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-[#2E4D71]" />
                  {certificate.issuer}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#2E4D71]" />
                  {certificate.period}
                </span>
                {certificate.duration && (
                  <>
                    <span>·</span>
                    <span className="text-slate-500">{certificate.duration}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 shrink-0">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
