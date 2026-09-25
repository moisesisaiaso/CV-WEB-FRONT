import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, MapPin, Mail, Phone, ZoomIn, Download } from 'lucide-react';
import { PersonalInfo } from '../types/cv';

interface ProfilePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatarSrc: string;
  personalInfo: PersonalInfo;
}

export const ProfilePhotoModal: React.FC<ProfilePhotoModalProps> = ({
  isOpen,
  onClose,
  avatarSrc,
  personalInfo,
}) => {
  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
        {/* Backdrop click to dismiss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-transparent cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 bg-white border-b border-slate-200">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#2C4A6F]/10 text-[#2C4A6F] flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight truncate">
                  {personalInfo.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium truncate">
                  {personalInfo.role}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Cerrar modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Photo Display Viewport */}
          <div className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center p-4 sm:p-6 min-h-[320px] max-h-[60vh] overflow-hidden">
            <div className="relative group max-w-full max-h-full">
              <img
                src={avatarSrc}
                alt={`${personalInfo.name} - Fotografía de perfil`}
                className="max-h-[50vh] w-auto rounded-xl object-contain shadow-2xl ring-2 ring-white/20 select-none"
              />
              <div className="absolute bottom-2 right-2 bg-slate-950/75 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-3 h-3 text-cyan-300" />
                <span>Foto oficial</span>
              </div>
            </div>
          </div>

          {/* Quick Details & Info Footer */}
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200/80 shadow-2xs font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#2C4A6F] shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200/80 shadow-2xs font-medium hover:border-[#2C4A6F] hover:text-[#2C4A6F] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#2C4A6F] shrink-0" />
                <span>{personalInfo.email}</span>
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200/80 shadow-2xs font-medium hover:border-[#2C4A6F] hover:text-[#2C4A6F] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#2C4A6F] shrink-0" />
                <span>{personalInfo.phone}</span>
              </a>
            </div>

            <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
              <span>Ingeniero TIC & Desarrollador Web Fullstack</span>
              <a
                href={avatarSrc}
                download="Moises_Ortiz_Foto_Perfil.jpeg"
                className="inline-flex items-center gap-1 text-[#2C4A6F] font-semibold hover:underline"
              >
                <Download className="w-3 h-3" />
                <span>Descargar foto</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
