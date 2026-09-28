import React from 'react';
import { CVData, CertificateItem } from '../types/cv';
import { Award, ExternalLink, Globe, CheckCircle2, Eye } from 'lucide-react';
import { HobbyIcon, AptitudeIcon } from './HobbyAptitudeIcon';

interface CVPage3Props {
  data: CVData;
  onOpenCertificateModal: (cert: CertificateItem) => void;
}

export const CVPage3: React.FC<CVPage3Props> = ({ data, onOpenCertificateModal }) => {
  const certMasterCSS = data.certificates.find((c) => c.id === 'cert-master-css');
  const certGitTerminal = data.certificates.find((c) => c.id === 'cert-git-terminal');
  const certReparacion = data.certificates.find((c) => c.id === 'cert-reparacion-pc');
  const certScrum = data.certificates.find((c) => c.id === 'cert-scrum');
  const certIA = data.certificates.find((c) => c.id === 'cert-ia-pedagogica');
  const certFibra = data.certificates.find((c) => c.id === 'cert-fibra-optica');

  const page5Certs = [
    certMasterCSS,
    certGitTerminal,
    certReparacion,
    certScrum,
    certIA,
    certFibra,
  ].filter((c): c is CertificateItem => c !== undefined);

  return (
    <div
      id="cv-page-5"
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
      <div
        className="absolute bottom-0 left-0 w-72 h-20 bg-[#385D8A]/30 pointer-events-none print:hidden"
        style={{
          clipPath: 'polygon(0% 100%, 100% 100%, 0% 30%)',
        }}
        aria-hidden="true"
      />

      <div className="w-full flex-1 flex flex-col space-y-4">
        {/* Section Header */}
        <div id="seccion-certificados-p2" data-section="seccion-certificados" className="scroll-mt-24 border-b-2 border-[#2C4A6F] pb-1.5 mb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#2C4A6F]" />
              <h2 className="text-base sm:text-lg font-bold text-[#2C4A6F] uppercase tracking-wider">
                Certificados
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Parte 2 · Acreditaciones Profesionales & Licencias
            </span>
          </div>
        </div>

        {/* Full-width Certificates List - 6 Cards with Visual Previews & Explicit URLs */}
        <div className="flex flex-col gap-5 sm:gap-6">
          {page5Certs.map((cert, index) => (
            <div
              key={cert.id}
              className={`cert-card p-2.5 sm:p-3 lg:p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-[#2C4A6F]/50 transition-all shadow-2xs flex flex-col sm:flex-row gap-3 sm:gap-3.5 items-start sm:items-center reveal-on-scroll stagger-${(index % 6) + 1}`}
            >
              {/* Certificate Image Thumbnail Preview */}
              {cert.imageUrl && (
                <div
                  onClick={() => onOpenCertificateModal(cert)}
                  className="cert-thumb group/thumb relative w-full sm:w-36 md:w-44 lg:w-48 h-30 sm:h-26 md:h-28 shrink-0 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs hover:shadow-md hover:border-[#2C4A6F] transition-all cursor-pointer"
                  title="Clic para ver vista previa ampliada"
                >
                  <img
                    src={cert.imageUrl}
                    alt={`Certificado ${cert.title}`}
                    className="w-full h-full object-cover object-top group-hover/thumb:scale-105 transition-transform duration-300"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-[#2C4A6F]/25 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[0.5px]">
                    <span className="text-[10px] sm:text-[11px] font-bold text-white bg-slate-900/85 px-2 py-1 rounded shadow-sm flex items-center gap-1.5">
                      <Eye className="w-3 h-3" />
                      Ver vista previa
                    </span>
                  </div>
                </div>
              )}

              {/* Certificate Details */}
              <div className="flex-1 min-w-0 space-y-1.5 w-full">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <CheckCircle2 className="w-4 h-4 text-[#2C4A6F] shrink-0" />
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                      {cert.title}
                    </h3>
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-[#2C4A6F] whitespace-nowrap pl-6 sm:pl-0">
                    {cert.period}
                  </span>
                </div>

                <div className="flex items-center gap-2 pl-6 text-xs text-slate-500 font-medium">
                  <span>{cert.issuer}</span>
                  {cert.duration && (
                    <>
                      <span>·</span>
                      <span className="text-slate-600 font-semibold">{cert.duration}</span>
                    </>
                  )}
                </div>

                <div className="pl-6 text-xs sm:text-[13px] text-slate-700 leading-relaxed text-justify">
                  {cert.description}
                </div>

                {/* Explicit Certificate Verification Link & URL */}
                <div className="pl-6 pt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
                  <span className="font-bold text-slate-800 text-[11px] sm:text-xs inline-flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-[#2C4A6F] shrink-0" />
                    <span>Enlace de verificación:</span>
                  </span>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[11px] sm:text-xs text-blue-700 hover:text-blue-900 font-semibold underline underline-offset-2 decoration-blue-600 break-all transition-colors cursor-pointer"
                    title="Abrir credencial oficial"
                  >
                    <span>{cert.link}</span>
                    <ExternalLink className="w-3 h-3 text-blue-600 shrink-0" />
                  </a>
                  <button
                    type="button"
                    onClick={() => onOpenCertificateModal(cert)}
                    className="no-print pdf-hide text-[11px] font-medium text-slate-700 hover:text-[#2C4A6F] bg-slate-100 hover:bg-slate-200 border border-slate-200/90 px-2.5 py-0.5 rounded transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3 text-[#2C4A6F]" />
                    <span>Ver vista previa</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pasatiempos e intereses & Aptitudes - Ubicados al final del Curriculum en versión Móvil (< 768px) */}
        <div className="md:hidden print:hidden pt-4 mt-2 border-t border-slate-200 space-y-6">
          {/* Pasatiempos e intereses */}
          <div id="seccion-pasatiempos" data-section="seccion-pasatiempos" className="scroll-mt-24 space-y-3 pt-1">
            <h2 className="text-base sm:text-lg font-bold text-[#385D8A] tracking-tight pb-1 border-b border-slate-200 flex items-center gap-2">
              <span>Pasatiempos e intereses</span>
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-slate-700">
              {data.hobbies.map((hobby, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <HobbyIcon name={hobby} />
                  <span className="font-semibold text-slate-800">{hobby}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Aptitudes */}
          <div id="seccion-aptitudes" data-section="seccion-aptitudes" className="scroll-mt-24 space-y-3 pt-1">
            <h2 className="text-base sm:text-lg font-bold text-[#385D8A] tracking-tight pb-1 border-b border-slate-200 flex items-center gap-2">
              <span>Aptitudes</span>
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-slate-700">
              {data.aptitudes.map((apt, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <AptitudeIcon name={apt} className="mt-0.5" />
                  <span className="font-semibold text-slate-800 leading-snug">{apt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Consent Note */}
      <div className="relative z-10 mt-8 pt-4 border-t border-slate-200/80 text-[10px] text-slate-500 flex justify-between items-center pl-16 sm:pl-28">
        <span>{data.consentNote}</span>
        <span className="text-slate-400 font-mono text-[10px] print:inline font-bold">5 / 5</span>
      </div>
    </div>
  );
};
