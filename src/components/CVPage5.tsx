import React from 'react';
import { CVData, ProjectItem } from '../types/cv';
import { TechIcon } from './TechIcon';
import { Layers, ExternalLink, Github, Eye } from 'lucide-react';

interface CVPage5Props {
  data: CVData;
  onOpenProjectModal: (project: ProjectItem) => void;
}

export const CVPage5: React.FC<CVPage5Props> = ({ data, onOpenProjectModal }) => {
  // Projects 4 and 5 (M4Locker & M4 Padel Club)
  const projects = (data.projects || []).slice(3, 5);

  return (
    <div
      id="cv-page-3"
      className="cv-sheet relative w-full max-w-5xl xl:max-w-6xl 2xl:max-w-[1240px] min-h-[auto] lg:min-h-[1130px] mx-auto bg-white text-slate-800 shadow-xl rounded-sm p-5 sm:p-8 lg:p-10 font-sans border border-slate-200/80 print:shadow-none print:border-none print:m-0 print:p-8 print:max-w-none print:w-full print:min-h-screen flex flex-col justify-between overflow-hidden"
    >
      {/* Decorative Bottom Left Geometric Accent Polygon matching Curriculum Aesthetic */}
      <div
        className="absolute bottom-0 left-0 w-64 h-24 bg-[#2C4A6F] pointer-events-none print:bg-[#2C4A6F]"
        style={{
          clipPath: 'polygon(0% 100%, 100% 100%, 0% 0%)',
        }}
        aria-hidden="true"
      />

      <div className="w-full flex-1 flex flex-col space-y-5">
        {/* Section Header */}
        <div id="seccion-proyectos-p2" data-section="seccion-proyectos" className="scroll-mt-24">
          <div className="flex items-center justify-between border-b-2 border-[#2C4A6F] pb-1.5 mb-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#2C4A6F]" />
              <h2 className="text-base sm:text-lg font-bold text-[#2C4A6F] uppercase tracking-wider">
                Últimos Proyectos
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Parte 2 · Aplicaciones SaaS & Ciberseguridad
            </span>
          </div>
        </div>

        {/* Full-width Projects List */}
        <div className="space-y-6 flex-1">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => onOpenProjectModal(project)}
              className={`group border border-slate-200/90 rounded-2xl p-5 sm:p-6 bg-slate-50/50 hover:bg-white hover:border-[#2C4A6F]/60 hover:shadow-lg transition-all cursor-pointer flex flex-col lg:flex-row portrait:flex-col print:flex-row gap-5 lg:gap-6 reveal-on-scroll stagger-${index + 1}`}
            >
              {/* Browser-style Preview Frame with Full Screenshot Visibility */}
              <div className="relative w-full lg:w-80 xl:w-[420px] portrait:w-full print:w-72 aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/80 shadow-md flex flex-col shrink-0">
                {/* Browser Window Bar */}
                <div className="h-6 bg-slate-900 border-b border-slate-800 px-3 flex items-center justify-between select-none shrink-0">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono truncate max-w-[180px]">
                    {project.liveUrl ? project.liveUrl.replace('https://', '') : 'web preview'}
                  </span>
                </div>

                {/* Complete, uncropped image presentation */}
                <div className="relative flex-1 w-full bg-slate-950 flex items-center justify-center p-1.5 overflow-hidden">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-contain object-center group-hover:scale-[1.03] transition-transform duration-300"
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="no-print pdf-hide absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#2C4A6F] px-3 py-1 rounded shadow-md">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver interfaces</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Info & Technical Stack */}
              <div className="flex-1 flex flex-col justify-between space-y-3 min-w-0">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#2C4A6F] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <span className="text-xs font-semibold text-[#2C4A6F] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      {project.period}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mb-2 font-medium">
                    <span className="text-[#2C4A6F] font-bold">{project.role}</span>
                    {project.liveUrl && (
                      <span className="flex items-center gap-1 text-blue-700 hover:underline">
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        <span className="break-all">{project.liveUrl.replace('https://', '')}</span>
                      </span>
                    )}
                    {project.githubUrl && (
                      <span className="flex items-center gap-1 text-slate-600">
                        <Github className="w-3.5 h-3.5 shrink-0" />
                        <span>github.com/moisesisaiaso</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-[13.5px] text-slate-700 leading-relaxed text-justify">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Technologies Badges */}
                <div className="pt-2.5 border-t border-slate-200/60 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <TechIcon key={tech.name} name={tech.name} size="sm" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Consent Note */}
      <div className="relative z-10 mt-8 pt-4 border-t border-slate-200/80 text-[10px] text-slate-500 flex justify-between items-center pl-16 sm:pl-28">
        <span>{data.consentNote}</span>
        <span className="text-slate-400 font-mono text-[9px] print:inline">3 / 5</span>
      </div>
    </div>
  );
};
