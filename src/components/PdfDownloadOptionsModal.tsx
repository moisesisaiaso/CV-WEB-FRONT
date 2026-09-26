import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileCheck, Sparkles, Award, X, Printer, ArrowRight } from 'lucide-react';
import { PdfQualityMode } from '../utils/pdfExport';

interface PdfDownloadOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (mode: PdfQualityMode) => void;
  onNativePrint: () => void;
}

export const PdfDownloadOptionsModal: React.FC<PdfDownloadOptionsModalProps> = ({
  isOpen,
  onClose,
  onSelectOption,
  onNativePrint,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10"
          >
            {/* Top Color Accent */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#2C4A6F] via-[#385D8A] to-[#4F7AA8]" />

            <div className="p-5 sm:p-7 space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2C4A6F] text-[11px] font-bold border border-blue-100">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Descarga de Documento Oficial</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    Selecciona el formato de PDF
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Elige la opción que mejor se adapte a tus necesidades de postulación o impresión.
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  aria-label="Cerrar modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Options Cards */}
              <div className="space-y-3">
                {/* Option 1: Full HD Quality (Primary / High Resolution) */}
                <button
                  onClick={() => {
                    onClose();
                    onSelectOption('original_hd');
                  }}
                  className="w-full text-left p-4 rounded-xl border-2 border-[#2C4A6F]/80 bg-blue-50/20 hover:bg-blue-50/50 hover:border-[#2C4A6F] transition-all cursor-pointer group shadow-2xs relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#2C4A6F] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <Award className="w-5 h-5 text-[#2C4A6F]" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-[#2C4A6F] transition-colors">
                            PDF Alta Definición (Full HD)
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#2C4A6F] text-white shadow-2xs">
                            Full HD · Máxima Calidad
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Máxima fidelidad gráfica (resolución 2x Retina a 300 DPI). Calidad óptima para lectura en pantalla e impresión profesional.
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-[#2C4A6F] font-medium pt-1">
                          <span>• 5 Páginas completas</span>
                          <span>• Enlaces activos</span>
                          <span>• Fidelidad gráfica 100%</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#2C4A6F] group-hover:translate-x-1 transition-transform shrink-0 mt-2" />
                  </div>
                </button>

                {/* Option 2: Compact <= 8 MB (At the end, for portals with strict file size limits) */}
                <button
                  onClick={() => {
                    onClose();
                    onSelectOption('compact_8mb');
                  }}
                  className="w-full text-left p-4 rounded-xl border border-slate-200 bg-white hover:bg-emerald-50/40 hover:border-emerald-500/60 transition-all cursor-pointer group shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <Sparkles className="w-5 h-5 text-emerald-700" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-emerald-900 transition-colors">
                            PDF Optimizado para Portales
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-2xs">
                            ≤ 8 MB
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Diseñado específicamente para plataformas de empleo (LinkedIn, Computrabajo, bolsas de trabajo y plataformas ATS) con límite estricto de peso.
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-emerald-700 font-medium pt-1">
                          <span>• 5 Páginas completas</span>
                          <span>• Enlaces activos</span>
                          <span>• Peso ligero garantizado</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-transform shrink-0 mt-2" />
                  </div>
                </button>
              </div>

              {/* Native Print Option Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>¿Prefieres la vista de impresión del sistema?</span>
                <button
                  onClick={() => {
                    onClose();
                    onNativePrint();
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2C4A6F] hover:underline cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir directo</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
