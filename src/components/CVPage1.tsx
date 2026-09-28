import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Home,
  Calendar,
  MapPin,
  Car,
  UserCheck,
  Globe,
  Users,
  Github,
  Linkedin,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ZoomIn,
} from 'lucide-react';
import { CVData, CertificateItem, ProjectItem } from '../types/cv';
import { RatingDots } from './RatingDots';
import { SkillMiniIcon } from './SkillMiniIcon';
import { FastTypewriter } from './FastTypewriter';
import avatarImg from '../assets/images/avatar.jpeg';

interface CVPage1Props {
  data: CVData;
  onOpenCertificateModal: (cert: CertificateItem) => void;
  onOpenProjectModal?: (project: ProjectItem) => void;
  onOpenProfilePhotoModal?: () => void;
}

export const CVPage1: React.FC<CVPage1Props> = ({ 
  data, 
  onOpenCertificateModal, 
  onOpenProjectModal,
  onOpenProfilePhotoModal,
}) => {
  const [showAllMobileSkills, setShowAllMobileSkills] = useState(false);
  const mobileSkills = showAllMobileSkills ? data.skills : data.skills.slice(0, 10);
  const page1Skills = data.skills.slice(0, 9);
  const allExperiences = data.experience;
  const projectM4 = data.projects?.find((p) => p.id === 'proj-m4managers') || data.projects?.[0];
  const universityCert = data.certificates.find((c) => c.id === 'cert-universidad') || {
    id: 'cert-universidad',
    title: 'Ingeniería en Tecnologías de la Información y la Comunicación',
    period: 'feb 2019 - oct 2023',
    issuer: 'Universidad Técnica Luis Vargas Torres de Esmeraldas',
    description:
      'Título Profesional de Tercer Nivel en Tecnologías de la Información y la Comunicación.',
    link: 'https://mega.nz/file/dvclXRrI#m4s_562tPZV431e2EOl6i-D4N-PAuyzhZCGX1K2UCNU',
    category: 'web-development' as const,
    imageUrl: '/certificates/cert-universidad.png',
  };

  return (
    <div
      id="cv-page-1"
      className="cv-sheet relative w-full max-w-5xl xl:max-w-6xl 2xl:max-w-[1240px] min-h-[auto] lg:min-h-[1130px] mx-auto bg-white text-slate-800 shadow-xl rounded-sm p-5 sm:p-8 lg:p-10 font-sans border border-slate-200/80 print:shadow-none print:border-none print:m-0 print:p-8 print:max-w-none print:w-full print:min-h-screen flex flex-col justify-between"
    >
      {/* Main Grid: Left Column + Right Column */}
      <div className="grid grid-cols-12 gap-6 sm:gap-8 lg:gap-10 flex-1">
        {/* Left Column (Aside: Datos Personales + Competencias) */}
        <div className="col-span-12 md:col-span-4 flex flex-col space-y-6">
          {/* Header Card matching exact PDF layout: unified card with profile photo, name and role */}
          <div className="bg-[#2C4A6F] text-white p-5 sm:p-6 lg:p-7 rounded-md shadow-sm text-center flex flex-col items-center">
            {/* Profile Photo cleanly housed inside the card with white border + interactive hover zoom */}
            <div
              onClick={() => onOpenProfilePhotoModal?.()}
              className="group/avatar relative w-36 h-36 sm:w-40 sm:h-40 lg:w-44 lg:h-44 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-100 mb-3.5 shrink-0 cursor-pointer transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl hover:border-blue-200"
              title="Clic para ver foto en tamaño completo"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenProfilePhotoModal?.();
                }
              }}
            >
              <img
                src={avatarImg}
                alt="Moisés Isaías Ortíz Gracia"
                className="w-full h-full object-cover object-center scale-105 group-hover/avatar:scale-110 transition-transform duration-300"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              {/* Interactive Hover Overlay */}
              <div className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white backdrop-blur-[1px] no-print">
                <ZoomIn className="w-6 h-6 text-white drop-shadow-md animate-pulse" />
                <span className="text-[10px] font-bold mt-1 bg-slate-950/80 px-2.5 py-0.5 rounded-full shadow-xs tracking-wide">
                  Ampliar foto
                </span>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-[25px] font-bold tracking-tight leading-tight">
              Moisés Isaías Ortíz
              <br />
              Gracia
            </h1>
            <p className="text-xs sm:text-sm lg:text-[15px] text-slate-200 mt-2 font-normal min-h-[1.5em]">
              <FastTypewriter text="Desarrollador web fullstack" speedMs={24} delayMs={120} />
            </p>
          </div>

          {/* Datos personales Section */}
          <div id="seccion-datos" className="space-y-3.5 reveal-on-scroll">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#385D8A] tracking-tight pb-1 border-b border-slate-200">
              Datos personales
            </h2>

            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-[13.5px] text-slate-700">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#385D8A] shrink-0 mt-0.5" />
                <a
                  href={`mailto:${data.personal.email}`}
                  className="text-blue-700 hover:text-blue-900 font-medium underline underline-offset-2 decoration-blue-500/70 hover:decoration-blue-900 break-all transition-colors"
                  title="Enviar correo"
                >
                  {data.personal.email}
                </a>
              </li>

              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#385D8A] shrink-0 mt-0.5" />
                <a
                  href={`tel:${data.personal.phone.replace(/\s+/g, '')}`}
                  className="text-blue-700 hover:text-blue-900 font-medium underline underline-offset-2 decoration-blue-500/70 hover:decoration-blue-900 transition-colors"
                  title="Llamar o contactar por teléfono"
                >
                  {data.personal.phone}
                </a>
              </li>

              <li className="flex items-start gap-2.5">
                <Home className="w-4 h-4 text-[#385D8A] shrink-0 mt-0.5" />
                <span className="leading-tight">{data.personal.address}</span>
              </li>

              <li className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#385D8A] shrink-0" />
                <span>{data.personal.birthDate}</span>
              </li>

              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#385D8A] shrink-0" />
                <span>{data.personal.location}</span>
              </li>

              <li className="flex items-center gap-2.5">
                <Car className="w-4 h-4 text-[#385D8A] shrink-0" />
                <span>{data.personal.license}</span>
              </li>

              <li className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-[#385D8A] shrink-0" />
                <span>{data.personal.gender}</span>
              </li>

              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#385D8A] shrink-0" />
                <span>{data.personal.nationality}</span>
              </li>

              <li className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-[#385D8A] shrink-0" />
                <span>{data.personal.civilStatus}</span>
              </li>

              <li className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-[#385D8A] shrink-0 mt-0.5" />
                <a
                  href={data.personal.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 font-semibold underline underline-offset-2 decoration-blue-600/80 hover:text-blue-900 hover:decoration-blue-900 break-all transition-colors leading-tight"
                  title="Visitar portafolio web"
                >
                  {data.personal.portfolio}
                </a>
              </li>

              <li className="flex items-start gap-2.5">
                <Github className="w-4 h-4 text-[#385D8A] shrink-0 mt-0.5" />
                <a
                  href={data.personal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 font-semibold underline underline-offset-2 decoration-blue-600/80 hover:text-blue-900 hover:decoration-blue-900 break-all transition-colors leading-tight"
                  title="Ver perfil de GitHub"
                >
                  {data.personal.github}
                </a>
              </li>

              <li className="flex items-start gap-2.5">
                <Linkedin className="w-4 h-4 text-[#385D8A] shrink-0 mt-0.5" />
                <a
                  href={data.personal.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 font-semibold underline underline-offset-2 decoration-blue-600/80 hover:text-blue-900 hover:decoration-blue-900 break-all transition-colors leading-tight"
                  title="Ver perfil de LinkedIn"
                >
                  {data.personal.linkedin}
                </a>
              </li>
            </ul>
          </div>

          {/* Perfil - ÚNICA Y EXCLUSIVAMENTE en móvil (< 768px): ubicado antes de Competencias */}
          <div
            id="seccion-perfil-movil"
            data-section="seccion-perfil"
            className="scroll-mt-24 space-y-2.5 md:hidden pt-1"
          >
            <h2 className="text-base sm:text-lg font-bold text-[#385D8A] tracking-tight pb-1 border-b border-slate-200">
              Perfil
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
              {data.profileSummary}
            </p>
          </div>

          {/* Competencias */}
          <div id="seccion-competencias" data-section="seccion-competencias" className="scroll-mt-24 space-y-3 pt-1 reveal-on-scroll">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#385D8A] tracking-tight pb-1 border-b border-slate-200">
              Competencias
            </h2>

            {/* Versión móvil (< 768px): Muestra las 10 primeras competencias con botón 'Ver más' para desplegar el resto */}
            <div className="space-y-2.5 md:hidden">
              {mobileSkills.map((skill) => (
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

              {data.skills.length > 10 && (
                <button
                  type="button"
                  onClick={() => setShowAllMobileSkills(!showAllMobileSkills)}
                  className="w-full mt-2 py-1.5 px-3 rounded-md bg-slate-100 hover:bg-slate-200/80 active:bg-slate-200 border border-slate-200 text-xs font-semibold text-[#2C4A6F] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  aria-expanded={showAllMobileSkills}
                >
                  {showAllMobileSkills ? (
                    <>
                      <span>Ver menos</span>
                      <ChevronUp className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <span>Ver más</span>
                      <span className="text-[11px] font-normal text-slate-500">
                        (+{data.skills.length - 10} más)
                      </span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Versión desktop, tablet e impresión A4: Primer bloque (9) para mantener la proporción exacta del folio A4 */}
            <div className="hidden md:block space-y-2.5">
              {page1Skills.map((skill) => (
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
        </div>

        {/* Right Column (Perfil + Formación + Experiencia) */}
        <div className="col-span-12 md:col-span-8 flex flex-col space-y-7">
          {/* Perfil (En tablet y escritorio: al principio, fuera del aside, en la columna principal derecha) */}
          <div
            id="seccion-perfil"
            data-section="seccion-perfil"
            className="scroll-mt-24 space-y-2.5 hidden md:block reveal-on-scroll"
          >
            <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#385D8A] tracking-tight">
              Perfil
            </h2>
            <p className="text-xs sm:text-sm lg:text-[14.5px] text-slate-700 leading-relaxed text-justify">
              {data.profileSummary}
            </p>
          </div>

          {/* Formación */}
          <div id="seccion-formacion" data-section="seccion-formacion" className="scroll-mt-24 space-y-5 reveal-on-scroll">
            <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#385D8A] tracking-tight">
              Formación
            </h2>

            {/* University degree */}
            <div className="space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-xs sm:text-sm lg:text-[15px] font-bold text-slate-900 leading-tight">
                  Ingeniería en Tecnologías de la Información y la Comunicación
                </h3>
                <span className="text-xs sm:text-[13px] font-medium text-slate-600 whitespace-nowrap">
                  feb 2019 - oct 2023
                </span>
              </div>
              <p className="text-xs sm:text-[13.5px] text-slate-600">
                Universidad Técnica Luis Vargas Torres de Esmeraldas, Esmeraldas
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-2">
                <span className="font-bold text-slate-800 text-xs sm:text-[13px]">Link:</span>
                <a
                  href={universityCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs sm:text-[13px] text-blue-700 hover:text-blue-900 font-semibold underline underline-offset-2 decoration-blue-600/80 break-all transition-colors"
                  title="Abrir título universitario oficial"
                >
                  <span>{universityCert.link}</span>
                  <ExternalLink className="w-3 h-3 text-blue-600 shrink-0" />
                </a>
                <button
                  type="button"
                  onClick={() => onOpenCertificateModal(universityCert)}
                  className="no-print pdf-hide text-[11px] font-medium text-slate-600 hover:text-[#2C4A6F] bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded transition-colors cursor-pointer"
                >
                  Ver título
                </button>
              </div>
            </div>

            {/* Academlo Frontend */}
            <div className="space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-xs sm:text-sm lg:text-[15px] font-bold text-slate-900 leading-tight">
                  Desarrollador frontend
                </h3>
                <span className="text-xs sm:text-[13px] font-medium text-slate-600 whitespace-nowrap">
                  abr 2022 - jul 2022
                </span>
              </div>
              <p className="text-xs sm:text-[13.5px] text-slate-600 font-medium">ACADEMLO, Online</p>
              <p className="text-xs sm:text-sm lg:text-[14px] text-slate-700 leading-relaxed text-justify">
                Durante el curso de Desarrollo Web Frontend, desarrollé habilidades avanzadas en
                HTML, CSS y JavaScript, y me especialicé en la creación de interfaces interactivas
                utilizando React. Además, adquirí experiencia en la integración de APIs y en el uso
                de Git para el control de versiones, aplicando las mejores prácticas de desarrollo
                web para asegurar la accesibilidad de las aplicaciones.
              </p>
            </div>

            {/* Academlo Backend */}
            <div className="space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-xs sm:text-sm lg:text-[15px] font-bold text-slate-900 leading-tight">
                  Desarrollador backend
                </h3>
                <span className="text-xs sm:text-[13px] font-medium text-slate-600 whitespace-nowrap">
                  oct 2022 - ene 2023
                </span>
              </div>
              <p className="text-xs sm:text-[13.5px] text-slate-600 font-medium">ACADEMLO, Online</p>
              <p className="text-xs sm:text-sm lg:text-[14px] text-slate-700 leading-relaxed text-justify">
                Durante el curso de Desarrollo Backend, aprendí a utilizar Node.js y Express para la
                creación de servidores. También adquirí experiencia en la gestión de bases de datos
                con PostgreSQL y Sequelize, en la implementación de sistemas de autenticación
                mediante JWT (JSON Web Tokens), y en la integración con aplicaciones frontend para
                crear soluciones completas y funcionales.
              </p>
            </div>
          </div>

          {/* Experiencia (Todas las experiencias continuas en la Página 1) */}
          <div id="seccion-experiencia" data-section="seccion-experiencia" className="scroll-mt-24 space-y-3 pt-1 reveal-on-scroll">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <h2 className="text-xl sm:text-2xl lg:text-[24px] font-bold text-[#385D8A] tracking-tight">
                Experiencia
              </h2>
              <span className="no-print text-xs font-semibold text-slate-500 hidden sm:inline">
                Puesto actual y trayectoria profesional
              </span>
            </div>

            <div className="space-y-3">
              {allExperiences.map((exp) => (
                <div key={exp.id} className="space-y-1 p-2 sm:p-0 rounded-lg bg-slate-50/60 sm:bg-transparent border border-slate-200/60 sm:border-none">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xs sm:text-sm lg:text-[14.5px] font-bold text-slate-900 leading-tight">
                        {exp.title}
                      </h3>
                      {exp.id === 'exp-m4managers-fullstack' && (
                        <span className="no-print inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Actualmente trabajando
                        </span>
                      )}
                    </div>
                    <span className="text-xs sm:text-[12.5px] font-semibold text-[#2C4A6F] whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  {exp.location && (
                    <p className="text-xs sm:text-[13px] text-slate-700 font-semibold">{exp.location}</p>
                  )}
                  <p className="text-xs sm:text-sm lg:text-[13.5px] text-slate-700 leading-relaxed text-justify">
                    {exp.description}
                  </p>
                  {exp.id === 'exp-m4managers-fullstack' && projectM4 && onOpenProjectModal && (
                    <div className="no-print pt-0.5">
                      <button
                        type="button"
                        onClick={() => onOpenProjectModal(projectM4)}
                        className="inline-flex items-center gap-1.5 text-xs text-[#2C4A6F] font-semibold hover:underline cursor-pointer group"
                      >
                        <span>Ver interfaces y arquitectura de proyectos desarrollados en M4 Managers &rarr;</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Consent Note */}
      <div className="mt-8 pt-4 border-t border-slate-200/80 text-xs text-slate-500 flex justify-between items-center">
        <span>{data.consentNote}</span>
        <span className="text-slate-400 font-mono text-[11px] print:inline">1 / 5</span>
      </div>
    </div>
  );
};
