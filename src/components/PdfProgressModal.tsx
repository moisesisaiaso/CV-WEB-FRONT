import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Loader2, CheckCircle2, X, Download, Sparkles, Award } from 'lucide-react';
import { PdfQualityMode } from '../utils/pdfExport';

interface PdfProgressModalProps {
  isOpen: boolean;
  progress: number; // 0 to 100
  step: string;
  isComplete: boolean;
  mode?: PdfQualityMode;
  fileSizeFormatted?: string;
  onClose: () => void;
}

export const PdfProgressModal: React.FC<PdfProgressModalProps> = ({
  isOpen,
  progress,
  step,
  isComplete,
  mode = 'compact_8mb',
  fileSizeFormatted,
  onClose,
}) => {
  const isCompact = mode === 'compact_8mb';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden z-10"
          >
            {/* Top Decorative Color Bar */}
            <div
              className={`h-1.5 w-full bg-gradient-to-r ${
                isCompact
                  ? 'from-emerald-600 via-teal-600 to-[#2C4A6F]'
                  : 'from-[#2C4A6F] via-[#385D8A] to-[#4F7AA8]'
              }`}
            />

            <div className="p-5 sm:p-6 space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center shadow-2xs shrink-0 ${
                      isComplete
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                        : isCompact
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                        : 'bg-blue-50 border-blue-100 text-[#2C4A6F]'
                    }`}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="w-6 h-6 animate-in zoom-in duration-300" />
                    ) : isCompact ? (
                      <Sparkles className="w-6 h-6" />
                    ) : (
                      <FileText className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                        {isComplete ? '¡Descarga Exitosa!' : 'Generando Documento PDF'}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isCompact
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-blue-100 text-[#2C4A6F] border border-blue-200'
                        }`}
                      >
                        {isCompact ? '≤ 8 MB · Portales ATS' : 'Alta Definición (HD)'}
                      </span>
                      {fileSizeFormatted && (
                        <span className="text-[11px] font-mono text-slate-500 font-semibold">
                          {fileSizeFormatted}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {isComplete && (
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Cerrar modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Progress Bar & Percentage */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    {isComplete ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Archivo entregado
                      </span>
                    ) : (
                      <>
                        <Loader2 className="w-3.5 h-3.5 text-[#2C4A6F] animate-spin shrink-0" />
                        <span>Progreso de compilación</span>
                      </>
                    )}
                  </span>
                  <span className="text-[#2C4A6F] font-mono text-sm font-bold">
                    {progress}%
                  </span>
                </div>

                {/* Bar Track */}
                <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner">
                  <motion.div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isComplete
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                        : isCompact
                        ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-[#2C4A6F]'
                        : 'bg-gradient-to-r from-[#2C4A6F] via-[#385D8A] to-blue-500'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(5, progress))}%` }}
                    animate={{ width: `${Math.min(100, Math.max(5, progress))}%` }}
                    transition={{ ease: 'easeOut', duration: 0.25 }}
                  />
                </div>
              </div>

              {/* Status Message */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-xs text-slate-700">
                <div
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    isComplete
                      ? 'bg-emerald-500'
                      : isCompact
                      ? 'bg-emerald-600 animate-ping'
                      : 'bg-[#2C4A6F] animate-ping'
                  }`}
                />
                <span className="truncate font-medium">{step || 'Procesando documento...'}</span>
              </div>

              {/* Info Footer Note */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                <span className="inline-flex items-center gap-1 truncate max-w-[240px]">
                  <Download className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">
                    {isCompact
                      ? 'CV-Moises-Isaias-Ortiz-Gracia-8MB.pdf'
                      : 'CV-Moises-Isaias-Ortiz-Gracia-HD.pdf'}
                  </span>
                </span>
                <span className="font-semibold text-slate-600 shrink-0">
                  {isCompact ? 'Peso Garantizado ≤ 8 MB' : 'Full HD 300 DPI'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
