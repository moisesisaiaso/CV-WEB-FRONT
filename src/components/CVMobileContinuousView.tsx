import React from 'react';
import {
  User,
  Mail,
  Phone,
  Home,
  Calendar,
  MapPin,
  Car,
  UserCheck,
  Globe,
  Users,
  Briefcase,
  GraduationCap,
  Code2,
  Award,
  Layers,
  Sparkles,
  ExternalLink,
  Eye,
  CheckCircle2,
  Heart,
  Github,
} from 'lucide-react';
import { CVData, CertificateItem, ProjectItem } from '../types/cv';
import { RatingDots } from './RatingDots';
import { SkillMiniIcon } from './SkillMiniIcon';
import { TechIcon } from './TechIcon';
import { FastTypewriter } from './FastTypewriter';
import avatarImg from '../assets/images/avatar.jpeg';

interface CVMobileContinuousViewProps {
  data: CVData;
  onOpenCertificateModal: (cert: CertificateItem) => void;
  onOpenProjectModal: (project: ProjectItem) => void;
}

export const CVMobileContinuousView: React.FC<CVMobileContinuousViewProps> = ({
  data,
  onOpenCertificateModal,
  onOpenProjectModal,
}) => {
  const universityCert = data.certificates.find((c) => c.id === 'cert-universidad') || data.certificates[0];
  const projectM4 = data.projects?.find((p) => p.id === 'proj-m4managers') || data.projects?.[0];

  return (
    <div className="space-y-6 sm:space-y-8 font-sans text-slate-800">
      {/* 1. DATOS PERSONALES */}
      <section id="seccion-datos" data-section="seccion-datos" className="scroll-mt-28 reveal-on-scroll">
        <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-md border border-slate-200/90 space-y-6">
          {/* Header Card with Profile Photo */}
          <div className="bg-gradient-to-br from-[#2C4A6F] to-[#1E334D] text-white p-6 rounded-xl shadow-sm text-center flex flex-col items-center">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white/90 shadow-md bg-slate-100 mb-3.5 shrink-0">
              <img
                src={avatarImg}
                alt={data.personal.name}
                className="w-full h-full object-cover object-center scale-105"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight leading-tight">
              {data.personal.name}
            </h1>
            <p className="text-sm text-slate-200 mt-1 font-medium min-h-[1.5em]">
              <FastTypewriter text={data.personal.role} speedMs={24} delayMs={120} />
            </p>
          </div>

          {/* Contact & Personal Details List */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-200">
              <User className="w-4 h-4 text-[#2C4A6F]" />
              <h2 className="text-sm font-bold text-[#2C4A6F] uppercase tracking-wider">
                Datos Personales
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-[13px] text-slate-700 pt-1">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#2C4A6F] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Correo Electrónico</span>
                  <a
                    href={`mailto:${data.personal.email}`}
                    className="text-slate-800 font-semibold hover:text-[#2C4A6F] break-all transition-colors"
                  >
                    {data.personal.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#2C4A6F] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Teléfono / WhatsApp</span>
                  <a
                    href={`tel:${data.personal.phone.replace(/\s+/g, '')}`}
                    className="text-slate-800 font-semibold hover:text-[#2C4A6F] transition-colors"
                  >
                    {data.personal.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Home className="w-4 h-4 text-[#2C4A6F] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Dirección</span>
                  <span className="font-semibold text-slate-800">{data.personal.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2C4A6F] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Lugar de Residencia</span>
                  <span className="font-semibold text-slate-800">{data.personal.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-[#2C4A6F] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Fecha de Nacimiento</span>
                  <span className="font-semibold text-slate-800">{data.personal.birthDate}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-[#2C4A6F] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Nacionalidad</span>
                  <span className="font-semibold text-slate-800">{data.personal.nationality}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Car className="w-4 h-4 text-[#2C4A6F] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Licencia de Conducir</span>
                  <span className="font-semibold text-slate-800">{data.personal.license}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <UserCheck className="w-4 h-4 text-[#2C4A6F] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Estado Civil</span>
                  <span className="font-semibold text-slate-800">{data.personal.civilStatus}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-[#2C4A6F] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Portafolio Web</span>
                  <a
                    href={data.personal.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 font-bold underline underline-offset-2 decoration-blue-600 hover:text-blue-900 break-all transition-colors"
                  >
                    {data.personal.portfolio}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Github className="w-4 h-4 text-[#2C4A6F] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Perfil GitHub</span>
                  <a
                    href={data.personal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 font-bold underline underline-offset-2 decoration-blue-600 hover:text-blue-900 break-all transition-colors"
                  >
                    {data.personal.github}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PERFIL (INMEDIATAMENTE DESPUÉS DE DATOS PERSONALES) */}
      <section id="seccion-perfil" data-section="seccion-perfil" className="scroll-mt-28 reveal-on-scroll">
        <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-md border border-slate-200/90 space-y-3">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-200">
            <User className="w-4 h-4 text-[#2C4A6F]" />
            <h2 className="text-base font-bold text-[#2C4A6F] uppercase tracking-wider">
              Perfil Profesional
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
            {data.profileSummary}
          </p>
        </div>
      </section>

      {/* 3. FORMACIÓN (LUEGO DE PERFIL) */}
      <section id="seccion-formacion" data-section="seccion-formacion" className="scroll-mt-28 reveal-on-scroll">
        <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-md border border-slate-200/90 space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-200">
            <GraduationCap className="w-4 h-4 text-[#2C4A6F]" />
            <h2 className="text-base font-bold text-[#2C4A6F] uppercase tracking-wider">
              Formación Académica
            </h2>
          </div>

          <div className="space-y-4">
            {data.education.map((edu) => {
              const certItem = edu.certificateId
                ? data.certificates.find((c) => c.id === edu.certificateId)
                : null;
              return (
                <div
                  key={edu.id}
                  className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-1.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {edu.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{edu.institution}</p>
                  {edu.description && (
                    <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed text-justify">
                      {edu.description}
                    </p>
                  )}
                  {certItem && (
                    <div className="pt-0.5">
                      <button
                        type="button"
                        onClick={() => onOpenCertificateModal(certItem)}
                        className="text-xs text-blue-700 hover:text-blue-900 font-semibold underline text-left break-all cursor-pointer transition-colors inline-flex items-center gap-1"
                      >
                        <span>Ver Certificado & Acreditación &rarr;</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. COMPETENCIAS (LUEGO DE FORMACIÓN, TOTALMENTE UNIFICADAS Y CONTINUAS) */}
      <section id="seccion-competencias" data-section="seccion-competencias" className="scroll-mt-28 reveal-on-scroll">
        <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-md border border-slate-200/90 space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#2C4A6F]" />
              <h2 className="text-base font-bold text-[#2C4A6F] uppercase tracking-wider">
                Competencias Técnicas
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-slate-500">
              {data.skills.length} Tecnologías
            </span>
          </div>

          <p className="text-xs text-slate-600">
            Nivel de dominio y especialización técnica evaluado de 1 a 5:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {data.skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-[#2C4A6F]/50 transition-all gap-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-lg bg-white border border-slate-200 shadow-2xs">
                    <SkillMiniIcon name={skill.name} className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-semibold text-slate-800 leading-tight truncate">
                    {skill.name}
                  </span>
                </div>
                <RatingDots rating={skill.rating} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXPERIENCIA (ALL UNIFIED IN ONE BLOCK, M4 MANAGERS AT TOP) */}
      <section id="seccion-experiencia" data-section="seccion-experiencia" className="scroll-mt-28 reveal-on-scroll">
        <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-md border border-slate-200/90 space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#2C4A6F]" />
              <h2 className="text-base font-bold text-[#2C4A6F] uppercase tracking-wider">
                Experiencia Laboral
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-slate-500">
              Trayectoria Profesional
            </span>
          </div>

          <div className="space-y-4">
            {data.experience.map((exp) => {
              const isCurrent = exp.id === 'exp-m4managers-fullstack';
              return (
                <div
                  key={exp.id}
                  className={`p-4 rounded-xl border transition-all space-y-2 ${
                    isCurrent
                      ? 'bg-gradient-to-r from-blue-50/40 via-white to-slate-50 border-[#2C4A6F]/40 shadow-xs'
                      : 'bg-slate-50/80 border-slate-200/70'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">
                        {exp.title}
                      </h3>
                      {isCurrent && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Actualmente trabajando
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-[#2C4A6F] whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>

                  {exp.location && (
                    <p className="text-xs text-slate-600 font-semibold">{exp.location}</p>
                  )}

                  <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed text-justify">
                    {exp.description}
                  </p>

                  {isCurrent && projectM4 && (
                    <div className="pt-1.5">
                      <button
                        type="button"
                        onClick={() => onOpenProjectModal(projectM4)}
                        className="inline-flex items-center gap-1.5 text-xs text-[#2C4A6F] font-bold hover:underline cursor-pointer"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Ver los 5 proyectos desarrollados en M4 Managers &rarr;</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. ÚLTIMOS PROYECTOS (ALL 5 PROJECTS TOGETHER) */}
      <section id="seccion-proyectos" data-section="seccion-proyectos" className="scroll-mt-28 reveal-on-scroll">
        <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-md border border-slate-200/90 space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#2C4A6F]" />
              <h2 className="text-base font-bold text-[#2C4A6F] uppercase tracking-wider">
                Últimos Proyectos
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-slate-500">
              5 Plataformas Web
            </span>
          </div>

          <div className="space-y-4">
            {(data.projects || []).map((project) => (
              <div
                key={project.id}
                onClick={() => onOpenProjectModal(project)}
                className="group border border-slate-200/90 rounded-xl p-3.5 sm:p-4 bg-slate-50/70 hover:bg-white hover:border-[#2C4A6F]/60 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row gap-3.5"
              >
                {/* Complete Uncropped Screenshot with Browser Frame */}
                <div className="relative w-full sm:w-48 aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-700/80 shadow-sm flex flex-col shrink-0">
                  {/* Browser top-bar */}
                  <div className="h-5 bg-slate-900 border-b border-slate-800 px-2 flex items-center justify-between select-none shrink-0">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono truncate max-w-[120px]">
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
                    <div className="absolute inset-0 bg-slate-950/40 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-white bg-[#2C4A6F] px-2 py-0.5 rounded shadow-xs">
                        <Eye className="w-3 h-3" />
                        <span>Ver interfaces</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#2C4A6F] transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {project.period}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-600 mb-1.5 font-medium">
                      <span className="text-[#2C4A6F] font-semibold">{project.role}</span>
                      {project.liveUrl && (
                        <span className="text-blue-700 font-semibold break-all">
                          {project.liveUrl.replace('https://', '')}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed text-justify line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex flex-wrap gap-1">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <TechIcon key={tech.name} name={tech.name} size="sm" />
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium self-center">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CERTIFICADOS (ALL UNIFIED IN ONE BLOCK) */}
      <section id="seccion-certificados" data-section="seccion-certificados" className="scroll-mt-28 reveal-on-scroll">
        <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-md border border-slate-200/90 space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#2C4A6F]" />
              <h2 className="text-base font-bold text-[#2C4A6F] uppercase tracking-wider">
                Certificados & Acreditaciones
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-slate-500">
              {data.certificates.length} Certificaciones
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.certificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => onOpenCertificateModal(cert)}
                className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:border-[#2C4A6F]/60 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-2 group"
              >
                <div>
                  {cert.imageUrl && (
                    <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 mb-2.5">
                      <img
                        src={cert.imageUrl}
                        alt={`Certificado ${cert.title}`}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-1 mb-1">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#2C4A6F] transition-colors leading-snug">
                      {cert.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1 font-medium">
                    <span>{cert.issuer}</span>
                    <span>·</span>
                    <span>{cert.period}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-blue-700 font-semibold group-hover:underline flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    Ver certificado ampliado
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2C4A6F]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PASATIEMPOS Y APTITUDES */}
      <section id="seccion-pasatiempos" data-section="seccion-pasatiempos" className="scroll-mt-28 reveal-on-scroll">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Pasatiempos */}
          <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-200/90 space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-200">
              <Heart className="w-4 h-4 text-[#2C4A6F]" />
              <h2 className="text-sm font-bold text-[#2C4A6F] uppercase tracking-wider">
                Pasatiempos e Intereses
              </h2>
            </div>
            <ul className="space-y-2 text-xs sm:text-[13px] text-slate-700">
              {data.hobbies.map((hobby, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 bg-[#2C4A6F] inline-block shrink-0 rounded-[2px]" />
                  <span className="font-semibold text-slate-800">{hobby}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Aptitudes */}
          <div id="seccion-aptitudes" data-section="seccion-aptitudes" className="bg-white rounded-2xl p-5 shadow-md border border-slate-200/90 space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-200">
              <Sparkles className="w-4 h-4 text-[#2C4A6F]" />
              <h2 className="text-sm font-bold text-[#2C4A6F] uppercase tracking-wider">
                Aptitudes
              </h2>
            </div>
            <ul className="space-y-2 text-xs sm:text-[13px] text-slate-700">
              {data.aptitudes.map((apt, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-semibold text-slate-800 leading-snug">{apt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer Consent Note */}
      <div className="p-4 rounded-xl bg-slate-200/60 text-[11px] text-slate-600 text-center leading-relaxed">
        {data.consentNote}
      </div>
    </div>
  );
};
