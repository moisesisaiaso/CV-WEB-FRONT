import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Layers,
} from 'lucide-react';
import { ProjectItem } from '../types/cv';
import { TechIcon } from './TechIcon';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Reset slide index when opening a new project
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [project?.id]);

  // Keyboard navigation: Left/Right arrows and Esc
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        setCurrentSlideIndex((prev) =>
          prev < project.sections.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex((prev) =>
          prev > 0 ? prev - 1 : project.sections.length - 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const currentSection = project.sections[currentSlideIndex] || project.sections[0];
  const totalSlides = project.sections.length;

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
        {/* Backdrop click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-transparent cursor-pointer"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[96vh] sm:max-h-[92vh]"
        >
          {/* Top Bar Header - Sticky, responsive, guaranteed 'X' */}
          <div className="sticky top-0 z-30 flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
            <div className="min-w-0 flex-1 pr-2">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium flex-wrap">
                <span className="font-semibold text-[#2C4A6F]">
                  {project.role}
                </span>
                <span>·</span>
                <span>{project.period}</span>
              </div>
              <h2 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 leading-snug break-words whitespace-normal mt-0.5">
                {project.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 flex items-center justify-center shrink-0 transition-colors cursor-pointer shadow-xs border border-slate-300"
              aria-label="Cerrar modal de proyecto"
              title="Cerrar (Esc)"
            >
              <X className="w-5 h-5 text-slate-800" strokeWidth={2.5} />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
            {/* Image Carousel Presentation */}
            <div className="space-y-3">
              <div className="relative group bg-slate-950 rounded-xl overflow-hidden shadow-lg border border-slate-800 aspect-video flex items-center justify-center">
                <img
                  src={currentSection.imageUrl}
                  alt={currentSection.title}
                  className="w-full h-full object-contain object-center transition-all duration-300"
                  referrerPolicy="no-referrer"
                />

                {/* Carousel Navigation Buttons */}
                {totalSlides > 1 && (
                  <>
                    <button
                      onClick={handlePrevSlide}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 backdrop-blur-xs transition-all shadow-md active:scale-95 cursor-pointer opacity-90 hover:opacity-100"
                      aria-label="Interfaz anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      onClick={handleNextSlide}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 backdrop-blur-xs transition-all shadow-md active:scale-95 cursor-pointer opacity-90 hover:opacity-100"
                      aria-label="Siguiente interfaz"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Counter Pill overlay */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-900/85 text-white text-xs font-mono tabular-nums backdrop-blur-sm shadow-sm border border-slate-700/60">
                      {currentSlideIndex + 1} / {totalSlides}
                    </div>
                  </>
                )}
              </div>

              {/* Current Slide Caption */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2C4A6F]" />
                    <h4 className="text-sm font-bold text-slate-900">
                      {currentSection.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {currentSection.description}
                  </p>
                </div>

                {/* Thumbnails indicator */}
                {totalSlides > 1 && (
                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    {project.sections.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          idx === currentSlideIndex
                            ? 'w-6 bg-[#2C4A6F]'
                            : 'w-2 bg-slate-300 hover:bg-slate-400'
                        }`}
                        aria-label={`Ver sección ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Technologies Used Section */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-200">
                <Layers className="w-4 h-4 text-[#2C4A6F]" />
                <h3 className="text-sm font-bold text-slate-900">
                  Tecnologías Web Aplicadas
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <TechIcon key={tech.name} name={tech.name} size="md" />
                ))}
              </div>
            </div>

            {/* Full Project Description */}
            <div className="space-y-2 pt-1">
              <h3 className="text-sm font-bold text-slate-900">
                Acerca de la Arquitectura & Solución
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                {project.fullDescription}
              </p>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-white text-slate-700 font-medium transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2C4A6F] text-white hover:bg-[#233D5D] font-medium transition-colors"
                >
                  <span>Ver Demo / Portafolio</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
