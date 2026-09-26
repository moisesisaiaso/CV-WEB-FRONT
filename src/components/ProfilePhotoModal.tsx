import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ProfilePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatarSrc: string;
  personalInfo?: unknown;
}

export const ProfilePhotoModal: React.FC<ProfilePhotoModalProps> = ({
  isOpen,
  onClose,
  avatarSrc,
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur - click outside to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
          />

          {/* Centered Modal: Enlarged Circular Photo with same round border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.82 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Close Button top-right above or beside */}
            <div className="w-full flex justify-end mb-3">
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-sm border border-white/25 transition-all cursor-pointer shadow-lg active:scale-95"
                title="Cerrar (Esc)"
                aria-label="Cerrar vista de foto"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Circular Profile Photo - Same round frame as CV, just larger */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 sm:border-6 border-white shadow-2xl ring-4 ring-[#2C4A6F]/40 bg-slate-200 select-none cursor-default"
            >
              <img
                src={avatarSrc}
                alt="Fotografía de perfil - Moisés Isaías Ortiz Gracia"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
