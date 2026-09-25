import React from 'react';
import { CVData, ProjectItem } from '../types/cv';
import { TechIcon } from './TechIcon';
import { RatingDots } from './RatingDots';
import { SkillMiniIcon } from './SkillMiniIcon';
import { Layers, ExternalLink, Github, Eye, Heart, Sparkles } from 'lucide-react';

interface CVPage4Props {
  data: CVData;
  onOpenProjectModal: (project: ProjectItem) => void;
}

export const CVPage4: React.FC<CVPage4Props> = ({ data, onOpenProjectModal }) => {
  // First 3 projects
  const projects = (data.projects || []).slice(0, 3);
  // Continuation of skills from Page 1 (index 9 onwards)
  const continuedSkills = data.skills.slice(9);

  return (
    <div
      id="cv-page-2"
      className="cv-sheet relative w-full max-w-5xl xl:max-w-6xl 2xl:max-w-[1240px] min-h-[auto] lg:min-h-[1130px] mx-auto bg-white text-slate-800 shadow-xl rounded-sm p-5 sm:p-8 lg:p-10 font-sans border border-slate-200/80 print:shadow-none print:border-none print:m-0 print:p-8 print:max-w-none print:w-full print:min-h-screen flex flex-col justify-between overflow-hidden"
    >
      {/* Decorative Top Accent Polygon matching Curriculum Aesthetic */}
      <div
        className="absolute top-0 right-0 w-48 h-12 bg-[#2C4A6F] pointer-events-none print:bg-[#2C4A6F]"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%)',
        }}
        aria-hidden="true"
      />

      {/* Main Grid: Left Column Aside + Right Column Projects */}
      <div className="grid grid-cols-12 gap-6 sm:gap-8 lg:gap-10 flex-1">
        {/* Left Column (Aside: Competencias Continuación + Pasatiempos + Aptitudes) - En tablet, desktop y print A4 */}
        <div className="col-span-12 md:col-span-4 hidden md:flex print:flex flex-col space-y-7">
          {/* Competencias (Continuación solo para versión Desktop / Impresión A4) */}
          <div
            id="seccion-competencias-cont"
            data-section="seccion-competencias-cont"
            className="scroll-mt-24 space-y-3"
          >
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#385D8A] tracking-tight pb-1 border-b border-slate-200">
              Competencias
            </h2>
            <div className="space-y-2.5">
              {continuedSkills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between text-xs sm:text-[13px] gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-md bg-slate-100 border border-slate-200/80">
                      <SkillMiniIcon name={skill.name} className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-slate-800 font-medium leading-tight truncate">{skill.name}</span>
                  </div>
                  <RatingDots rating={skill.rating} />
                </div>
              ))}
            </div>
          </div>

          {/* Pasatiempos e intereses */}
          <div id="seccion-pasatiempos" className="space-y-3 pt-1">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#385D8A] tracking-tight pb-1 border-b border-slate-200 flex items-center gap-2">
              <span>Pasatiempos e intereses</span>
            </h2>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-[13.5px] text-slate-700">
              {data.hobbies.map((hobby, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 bg-[#385D8A] inline-block shrink-0 rounded-[1px]" />
                  <span className="font-medium text-slate-800">{hobby}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Aptitudes */}
          <div id="seccion-aptitudes" data-section="seccion-aptitudes" className="scroll-mt-24 space-y-3 pt-1">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#385D8A] tracking-tight pb-1 border-b border-slate-200 flex items-center gap-2">
              <span>Aptitudes</span>
            </h2>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-[13.5px] text-slate-700">
              {data.aptitudes.map((apt, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-2.5 h-2.5 bg-[#385D8A] inline-block shrink-0 rounded-[1px] mt-1" />
                  <span className="font-medium text-slate-800 leading-snug">{apt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column (Projects List) */}
        <div className="col-span-12 md:col-span-8 flex flex-col space-y-4">
          {/* Section Header */}
          <div id="seccion-proyectos" data-section="seccion-proyectos" className="scroll-mt-24">
            <div className="flex items-center justify-between border-b-2 border-[#2C4A6F] pb-1.5 mb-1">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#2C4A6F]" />
                <h2 className="text-base sm:text-lg font-bold text-[#2C4A6F] uppercase tracking-wider">
                  Últimos Proyectos
                </h2>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Parte 1 · Ecosistema Digital
              </span>
            </div>
          </div>

          {/* Projects List */}
          <div className="space-y-3.5 flex-1">
            {projects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => onOpenProjectModal(project)}
                className={`group border border-slate-200 rounded-xl p-3.5 sm:p-4 bg-slate-50/50 hover:bg-white hover:border-[#2C4A6F]/60 hover:shadow-md transition-all cursor-pointer flex flex-col lg:flex-row portrait:flex-col print:flex-row gap-3.5 sm:gap-4 reveal-on-scroll stagger-${index + 1}`}
              >
                {/* Complete Uncropped Screenshot with Browser Frame: Stacks on top in mobile & tablet portrait, side-by-side on wide screens */}
                <div className="relative w-full lg:w-52 xl:w-60 2xl:w-64 portrait:w-full print:w-52 aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-700/80 shadow-sm flex flex-col shrink-0">
                  {/* Browser top-bar */}
                  <div className="h-5 bg-slate-900 border-b border-slate-800 px-2 flex items-center justify-between select-none shrink-0">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono truncate max-w-[130px]">
                      {project.liveUrl ? project.liveUrl.replace('https://', '') : 'web preview'}
                    </span>
                  </div>

                  {/* Fully displayed screenshot */}
                  <div className="relative flex-1 w-full bg-slate-950 flex items-center justify-center p-1 overflow-hidden">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-contain object-center group-hover:scale-[1.03] transition-transform duration-300"
                      loading="eager"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    <div className="no-print pdf-hide absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-white bg-[#2C4A6F] px-2.5 py-1 rounded shadow-xs">
                        <Eye className="w-3 h-3" />
                        <span>Ver interfaces</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Info & Technical Stack */}
                <div className="flex-1 flex flex-col justify-between space-y-1.5 min-w-0">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#2C4A6F] transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap">
                        {project.period}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-600 mb-1 font-medium">
                      <span className="text-[#2C4A6F] font-semibold">{project.role}</span>
                      {project.liveUrl && (
                        <span className="flex items-center gap-1 text-blue-700 hover:underline">
                          <ExternalLink className="w-3 h-3 shrink-0" />
                          <span className="break-all">{project.liveUrl.replace('https://', '')}</span>
                        </span>
                      )}
                      {project.githubUrl && (
                        <span className="flex items-center gap-1 text-slate-600">
                          <Github className="w-3 h-3 shrink-0" />
                          <span>github.com/moisesisaiaso</span>
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed text-justify line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Technologies Badges */}
                  <div className="pt-1.5 border-t border-slate-200/60 flex flex-wrap gap-1">
                    {project.technologies.slice(0, 6).map((tech) => (
                      <TechIcon key={tech.name} name={tech.name} size="sm" />
                    ))}
                    {project.technologies.length > 6 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-medium self-center">
                        +{project.technologies.length - 6}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Consent Note */}
      <div className="mt-8 pt-4 border-t border-slate-200/80 text-[10px] text-slate-500 flex justify-between items-center">
        <span>{data.consentNote}</span>
        <span className="text-slate-400 font-mono text-[9px] print:inline">2 / 5</span>
      </div>
    </div>
  );
};
