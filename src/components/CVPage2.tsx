import React from 'react';
import { CVData, CertificateItem } from '../types/cv';
import { Award, ExternalLink, Globe, CheckCircle2, Eye } from 'lucide-react';

interface CVPage2Props {
  data: CVData;
  onOpenCertificateModal: (cert: CertificateItem) => void;
}

export const CVPage2: React.FC<CVPage2Props> = ({ data, onOpenCertificateModal }) => {
  // Page 4 contains the first 5 technical bootcamps & telecom specializations
  const certFibra = data.certificates.find((c) => c.id === 'cert-fibra-optica');
  const certFullstack = data.certificates.find((c) => c.id === 'cert-academlo-fullstack');
  const certBackend = data.certificates.find((c) => c.id === 'cert-academlo-backend');
  const certFrontend = data.certificates.find((c) => c.id === 'cert-academlo-frontend');
  const certFundamentos = data.certificates.find((c) => c.id === 'cert-academlo-fundamentos');

  const page4Certs = [
    certFibra,
    certFullstack,
    certBackend,
    certFrontend,
    certFundamentos,
  ].filter((c): c is CertificateItem => c !== undefined);

  return (
    <div
      id="cv-page-4"
      className="cv-sheet relative w-full max-w-5xl xl:max-w-6xl 2xl:max-w-[1240px] min-h-[auto] lg:min-h-[1130px] mx-auto bg-white text-slate-800 shadow-xl rounded-sm p-5 sm:p-8 lg:p-10 font-sans border border-slate-200/80 print:shadow-none print:border-none print:m-0 print:p-8 print:max-w-none print:w-full print:min-h-screen flex flex-col justify-between overflow-hidden"
    >
      {/* Decorative Top Accent Polygon matching Curriculum Aesthetic */}
      <div
        className="absolute top-0 right-0 w-44 h-12 bg-[#2C4A6F] pointer-events-none print:bg-[#2C4A6F]"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%)',
        }}
        aria-hidden="true"
      />

      <div className="w-full flex-1 flex flex-col space-y-4">
        {/* Section Header */}
        <div id="seccion-certificados" data-section="seccion-certificados" className="scroll-mt-24">
          <div className="flex items-center justify-between border-b-2 border-[#2C4A6F] pb-1.5 mb-2">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#2C4A6F]" />
              <h2 className="text-base sm:text-lg font-bold text-[#2C4A6F] uppercase tracking-wider">
                Certificados
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Parte 1 · Especializaciones & Bootcamps
            </span>
          </div>
        </div>

        {/* Full-width Certificates List - 5 Cards with Visual Previews & Explicit URLs */}
        <div className="space-y-3 flex-1">
          {page4Certs.map((cert, index) => (
            <div
              key={cert.id}
              className={`p-3 sm:p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-[#2C4A6F]/50 transition-all shadow-2xs flex flex-col sm:flex-row gap-3 sm:gap-4 items-start reveal-on-scroll stagger-${(index % 5) + 1}`}
            >
              {/* Certificate Image Thumbnail Preview */}
              {cert.imageUrl && (
                <div
                  onClick={() => onOpenCertificateModal(cert)}
                  className="group/thumb relative w-full sm:w-36 md:w-44 h-32 sm:h-28 shrink-0 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs hover:shadow-md hover:border-[#2C4A6F] transition-all cursor-pointer"
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
              <div className="flex-1 min-w-0 space-y-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2C4A6F] shrink-0" />
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                      {cert.title}
                    </h3>
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-[#2C4A6F] whitespace-nowrap pl-5 sm:pl-0">
                    {cert.period}
                  </span>
                </div>

                <div className="flex items-center gap-2 pl-5 text-xs text-slate-500 font-medium">
                  <span>{cert.issuer}</span>
                  {cert.duration && (
                    <>
                      <span>·</span>
                      <span className="text-slate-600 font-semibold">{cert.duration}</span>
                    </>
                  )}
                </div>

                <div className="pl-5 text-xs sm:text-[12.5px] text-slate-700 leading-relaxed text-justify">
                  {cert.description}
                </div>

                {/* Explicit Certificate Verification Link & URL */}
                <div className="pl-5 pt-1 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
                  <span className="font-bold text-slate-800 text-[11px] sm:text-xs inline-flex items-center gap-1">
                    <Globe className="w-3 h-3 text-[#2C4A6F] shrink-0" />
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
                    <ExternalLink className="w-3 h-3 text-slate-400 shrink-0 no-print" />
                  </a>
                  <button
                    type="button"
                    onClick={() => onOpenCertificateModal(cert)}
                    className="no-print pdf-hide text-[11px] font-medium text-slate-700 hover:text-[#2C4A6F] bg-slate-100 hover:bg-slate-200 border border-slate-200/90 px-2 py-0.5 rounded transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3 text-[#2C4A6F]" />
                    <span>Ver vista previa</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Consent Note */}
      <div className="mt-6 pt-3 border-t border-slate-200/80 text-xs text-slate-500 flex justify-between items-center">
        <span>{data.consentNote}</span>
        <span className="text-slate-400 font-mono text-[11px] print:inline">4 / 5</span>
      </div>
    </div>
  );
};
