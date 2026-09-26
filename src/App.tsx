import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Download,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cvData } from './data/cvData';
import { CertificateItem, ProjectItem } from './types/cv';
import { Navbar } from './components/Navbar';
import { CVPage1 } from './components/CVPage1';
import { CVPage2 } from './components/CVPage2';
import { CVPage3 } from './components/CVPage3';
import { CVPage4 } from './components/CVPage4';
import { CVPage5 } from './components/CVPage5';
import { CertificateModal } from './components/CertificateModal';
import { ProjectModal } from './components/ProjectModal';
import { ProfilePhotoModal } from './components/ProfilePhotoModal';
import { PdfProgressModal } from './components/PdfProgressModal';
import { PdfDownloadOptionsModal } from './components/PdfDownloadOptionsModal';
import {
  exportToPdf,
  downloadOrExportPdf,
  initBackgroundPdfPreload,
  PdfQualityMode,
} from './utils/pdfExport';
import { preloadAllCVImages } from './utils/imagePreloader';
import { useScrollReveal } from './hooks/useScrollReveal';
import avatarImg from './assets/images/avatar.jpeg';

interface PageMeta {
  num: number;
  title: string;
  shortTitle: string;
  category: string;
  folio: string;
}

const PAGES_META: PageMeta[] = [
  {
    num: 1,
    title: 'Datos Personales, Perfil, Formación y Experiencia',
    shortTitle: 'Perfil & Experiencia',
    category: 'Trayectoria Principal',
    folio: 'FOLIO DOC-MO-2026-01',
  },
  {
    num: 2,
    title: 'Competencias (Cont.), Pasatiempos, Aptitudes & Últimos Proyectos (Parte 1)',
    shortTitle: 'Stack & Proyectos 1',
    category: 'Especialidad Técnica',
    folio: 'FOLIO DOC-MO-2026-02',
  },
  {
    num: 3,
    title: 'Últimos Proyectos — M4Locker & M4 Padel Club (Parte 2)',
    shortTitle: 'Proyectos 2',
    category: 'Proyectos Destacados',
    folio: 'FOLIO DOC-MO-2026-03',
  },
  {
    num: 4,
    title: 'Certificados — Especializaciones & Bootcamps (Parte 1)',
    shortTitle: 'Certificados 1',
    category: 'Acreditaciones Técnicas',
    folio: 'FOLIO DOC-MO-2026-04',
  },
  {
    num: 5,
    title: 'Certificados — Acreditaciones Profesionales & Licencias (Parte 2)',
    shortTitle: 'Certificados 2',
    category: 'Licencias & Metodologías',
    folio: 'FOLIO DOC-MO-2026-05',
  },
];

export default function App() {
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportStep, setExportStep] = useState('');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isPdfOptionsModalOpen, setIsPdfOptionsModalOpen] = useState(false);
  const [currentPdfMode, setCurrentPdfMode] = useState<PdfQualityMode>('original_hd');
  const [pdfFileSizeFormatted, setPdfFileSizeFormatted] = useState<string | undefined>();
  const [pdfProgress, setPdfProgress] = useState(0);
  const [pdfStep, setPdfStep] = useState('Iniciando descarga...');
  const [isPdfComplete, setIsPdfComplete] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activePage, setActivePage] = useState(1);

  // Preload all critical images and silently compile PDF in the background
  useEffect(() => {
    preloadAllCVImages(cvData);
    initBackgroundPdfPreload();
  }, []);

  // High-performance smooth scroll reveal
  useScrollReveal();

  // Active page scroll spy for continuous document view
  useEffect(() => {
    const handleScroll = () => {
      const pageIds = ['cv-page-1', 'cv-page-2', 'cv-page-3', 'cv-page-4', 'cv-page-5'];
      const scrollPos = window.scrollY + 220;
      for (let i = pageIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(pageIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActivePage(i + 1);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenCertificateModal = (cert: CertificateItem) => {
    setSelectedCertificate(cert);
  };

  const handleCloseCertificateModal = () => {
    setSelectedCertificate(null);
  };

  const handleOpenProjectModal = (project: ProjectItem) => {
    setSelectedProject(project);
  };

  const handleCloseProjectModal = () => {
    setSelectedProject(null);
  };

  const handleDownloadPdf = async (mode: PdfQualityMode = 'original_hd') => {
    setCurrentPdfMode(mode);
    setPdfFileSizeFormatted(undefined);
    setIsExporting(true);
    setIsPdfModalOpen(true);
    setPdfProgress(10);
    setPdfStep(
      mode === 'compact_8mb'
        ? 'Iniciando compilación optimizada para portales (≤ 8 MB)...'
        : 'Iniciando compilación de alta definición (HD)...'
    );
    setIsPdfComplete(false);

    const success = await downloadOrExportPdf(mode, ({ progress, step, isComplete, fileSizeFormatted }) => {
      setPdfProgress(progress);
      setPdfStep(step);
      setExportStep(step);
      if (fileSizeFormatted) {
        setPdfFileSizeFormatted(fileSizeFormatted);
      }
      if (isComplete) {
        setIsPdfComplete(true);
      }
    });

    setIsExporting(false);
    setExportStep('');
    if (success) {
      setIsPdfComplete(true);
      setPdfProgress(100);
      showToast(
        mode === 'compact_8mb'
          ? '¡PDF optimizado (≤ 8 MB) descargado exitosamente!'
          : '¡PDF Alta Definición (HD) descargado exitosamente!'
      );
      setTimeout(() => {
        setIsPdfModalOpen(false);
      }, 1600);
    } else {
      setIsPdfModalOpen(false);
      showToast('Se completó el proceso de exportación.');
    }
  };

  const handleNativePrint = () => {
    window.print();
  };

  const goToPage = (pageNum: number) => {
    const clamped = Math.max(1, Math.min(5, pageNum));
    setActivePage(clamped);

    const el = document.getElementById(`cv-page-${clamped}`);
    if (el) {
      const headerOffset = window.innerWidth < 768 ? 120 : 85;
      const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  };

  const handleSectionSelect = (sectionId: string) => {
    let targetPage = 1;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    if (sectionId === 'seccion-competencias' || sectionId === 'seccion-perfil' || sectionId === 'seccion-formacion' || sectionId === 'seccion-experiencia' || sectionId === 'seccion-datos') {
      targetPage = 1;
    } else if (['seccion-aptitudes', 'seccion-pasatiempos'].includes(sectionId)) {
      targetPage = isMobile ? 5 : 2;
    } else if (sectionId === 'seccion-proyectos' || sectionId === 'seccion-proyectos-p2') {
      targetPage = 2;
    } else if (sectionId === 'seccion-certificados') {
      targetPage = 4;
    } else if (sectionId === 'seccion-certificados-p2') {
      targetPage = 5;
    }

    goToPage(targetPage);
  };

  const currentPageMeta = PAGES_META.find((p) => p.num === activePage) || PAGES_META[0];

  return (
    <div className="min-h-screen bg-slate-200/60 text-slate-900 flex flex-col font-sans selection:bg-[#2C4A6F] selection:text-white">
      {/* Top Bar with Brand Title, Page Jumps & Download PDF Button */}
      <Navbar
        onDownloadPdf={handleDownloadPdf}
        onOpenPdfOptions={() => setIsPdfOptionsModalOpen(true)}
        onNativePrint={handleNativePrint}
        isExporting={isExporting}
        exportStep={exportStep}
        onSectionSelect={handleSectionSelect}
      />

      {/* Anchor point for smooth page scrolling on mobile */}
      <div id="document-viewport-anchor" className="scroll-mt-16" />

      {/* Mobile Sticky Executive Document Reader Toolbar */}
      <div className="no-print md:hidden sticky top-16 z-30 bg-slate-900/95 text-white backdrop-blur-md px-3 py-2 border-b border-slate-700/80 shadow-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          {/* Document Status & Active Sheet Title */}
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="p-1 rounded bg-[#2C4A6F] text-blue-200 shrink-0">
              <FileText className="w-3.5 h-3.5" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-white tracking-tight">
                <span className="bg-blue-600/50 text-blue-200 px-1.5 py-0.5 rounded text-[10px]">
                  Hoja {activePage} de 5
                </span>
                <span className="text-slate-200 font-medium truncate">{currentPageMeta.shortTitle}</span>
              </div>
            </div>
          </div>

          {/* Quick Page Jumps */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[10px] text-slate-400 font-medium mr-0.5 hidden xs:inline">Ir a:</span>
            {[1, 2, 3, 4, 5].map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`w-6 h-6 rounded-md text-[11px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                  activePage === pageNum
                    ? 'bg-[#2C4A6F] text-white ring-1 ring-blue-300 shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title={`Ir a la Hoja ${pageNum}`}
                aria-label={`Hoja ${pageNum}`}
              >
                {pageNum}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area: Authentic Multi-Page Document Presentation */}
      <main className="flex-1 py-4 sm:py-6 md:py-8 px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-5xl xl:max-w-6xl 2xl:max-w-[1240px] mx-auto">
          {/* Unified Document Sheets Presentation (Mobile & Desktop) */}
          <div className="desktop-cv-pages space-y-6 sm:space-y-8 lg:space-y-10">
            {/* ================= PAGE 1 ================= */}
            <div className="cv-page-container">
              <div className="space-y-2">
                {/* Official Document Sheet Header Ribbon */}
                <div className="no-print flex items-center justify-between text-xs text-slate-600 px-1 font-medium">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#2C4A6F] text-white font-bold text-[11px] shadow-2xs shrink-0">
                      Página 1 / 5
                    </span>
                    <span className="text-slate-400 hidden sm:inline">·</span>
                    <span className="text-slate-800 font-semibold truncate text-[11px] sm:text-xs">
                      Datos Personales, Perfil, Formación y Experiencia
                    </span>
                  </div>
                  <span className="bg-white px-2.5 py-0.5 rounded-md shadow-2xs text-[11px] font-mono text-slate-500 border border-slate-200 shrink-0">
                    A4 · 210 × 297 mm
                  </span>
                </div>

                <CVPage1
                  data={cvData}
                  onOpenCertificateModal={handleOpenCertificateModal}
                  onOpenProjectModal={handleOpenProjectModal}
                  onOpenProfilePhotoModal={() => setIsProfileModalOpen(true)}
                />
              </div>
            </div>

            {/* ================= PAGE 2 ================= */}
            <div className="cv-page-container">
              <div className="space-y-2">
                {/* Official Document Sheet Header Ribbon */}
                <div className="no-print flex items-center justify-between text-xs text-slate-600 px-1 font-medium">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#2C4A6F] text-white font-bold text-[11px] shadow-2xs shrink-0">
                      Página 2 / 5
                    </span>
                    <span className="text-slate-400 hidden sm:inline">·</span>
                    <span className="text-slate-800 font-semibold truncate text-[11px] sm:text-xs">
                      <span className="md:hidden">Últimos Proyectos (Parte 1)</span>
                      <span className="hidden md:inline">Competencias (Cont.), Pasatiempos, Aptitudes & Últimos Proyectos (Parte 1)</span>
                    </span>
                  </div>
                  <span className="bg-white px-2.5 py-0.5 rounded-md shadow-2xs text-[11px] font-mono text-slate-500 border border-slate-200 shrink-0">
                    A4 · 210 × 297 mm
                  </span>
                </div>

                <CVPage4
                  data={cvData}
                  onOpenProjectModal={handleOpenProjectModal}
                />
              </div>
            </div>

            {/* ================= PAGE 3 ================= */}
            <div className="cv-page-container">
              <div className="space-y-2">
                {/* Official Document Sheet Header Ribbon */}
                <div className="no-print flex items-center justify-between text-xs text-slate-600 px-1 font-medium">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#2C4A6F] text-white font-bold text-[11px] shadow-2xs shrink-0">
                      Página 3 / 5
                    </span>
                    <span className="text-slate-400 hidden sm:inline">·</span>
                    <span className="text-slate-800 font-semibold truncate text-[11px] sm:text-xs">
                      Últimos Proyectos — M4Locker & M4 Padel Club (Parte 2)
                    </span>
                  </div>
                  <span className="bg-white px-2.5 py-0.5 rounded-md shadow-2xs text-[11px] font-mono text-slate-500 border border-slate-200 shrink-0">
                    A4 · 210 × 297 mm
                  </span>
                </div>

                <CVPage5
                  data={cvData}
                  onOpenProjectModal={handleOpenProjectModal}
                />
              </div>
            </div>

            {/* ================= PAGE 4 ================= */}
            <div className="cv-page-container">
              <div className="space-y-2">
                {/* Official Document Sheet Header Ribbon */}
                <div className="no-print flex items-center justify-between text-xs text-slate-600 px-1 font-medium">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#2C4A6F] text-white font-bold text-[11px] shadow-2xs shrink-0">
                      Página 4 / 5
                    </span>
                    <span className="text-slate-400 hidden sm:inline">·</span>
                    <span className="text-slate-800 font-semibold truncate text-[11px] sm:text-xs">
                      Certificados — Especializaciones & Bootcamps (Parte 1)
                    </span>
                  </div>
                  <span className="bg-white px-2.5 py-0.5 rounded-md shadow-2xs text-[11px] font-mono text-slate-500 border border-slate-200 shrink-0">
                    A4 · 210 × 297 mm
                  </span>
                </div>

                <CVPage2
                  data={cvData}
                  onOpenCertificateModal={handleOpenCertificateModal}
                />
              </div>
            </div>

            {/* ================= PAGE 5 ================= */}
            <div className="cv-page-container">
              <div className="space-y-2">
                {/* Official Document Sheet Header Ribbon */}
                <div className="no-print flex items-center justify-between text-xs text-slate-600 px-1 font-medium">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#2C4A6F] text-white font-bold text-[11px] shadow-2xs shrink-0">
                      Página 5 / 5
                    </span>
                    <span className="text-slate-400 hidden sm:inline">·</span>
                    <span className="text-slate-800 font-semibold truncate text-[11px] sm:text-xs">
                      <span className="md:hidden">Certificados (Parte 2), Pasatiempos & Aptitudes</span>
                      <span className="hidden md:inline">Certificados — Acreditaciones Profesionales & Licencias (Parte 2)</span>
                    </span>
                  </div>
                  <span className="bg-white px-2.5 py-0.5 rounded-md shadow-2xs text-[11px] font-mono text-slate-500 border border-slate-200 shrink-0">
                    A4 · 210 × 297 mm
                  </span>
                </div>

                <CVPage3
                  data={cvData}
                  onOpenCertificateModal={handleOpenCertificateModal}
                />
              </div>
            </div>
          </div>

          {/* Mobile Bottom Document Navigation Controls */}
          <div className="no-print lg:hidden mt-6 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-2">
            <button
              onClick={() => goToPage(Math.max(1, activePage - 1))}
              disabled={activePage === 1}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <div className="flex flex-col items-center">
              <span className="text-[11px] font-bold text-slate-800">
                Hoja {activePage} de 5
              </span>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => goToPage(idx)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      idx === activePage ? 'bg-[#2C4A6F] w-4' : 'bg-slate-300'
                    }`}
                    aria-label={`Ir a la hoja ${idx}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                if (activePage < 5) {
                  goToPage(activePage + 1);
                } else {
                  goToPage(1);
                }
              }}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-[#2C4A6F] hover:bg-[#1E334D] text-xs font-bold text-white transition-colors cursor-pointer"
            >
              <span>{activePage === 5 ? 'Inicio' : 'Siguiente'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Floating Action Button for Mobile PDF Download */}
      <div className="no-print fixed bottom-6 right-6 z-30 sm:hidden">
        <button
          onClick={() => setIsPdfOptionsModalOpen(true)}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#2C4A6F] text-white font-semibold text-xs shadow-xl active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Descargar PDF</span>
        </button>
      </div>

      {/* Real Certificate Lightbox Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={handleCloseCertificateModal}
        certificates={cvData.certificates}
        onSelectCertificate={setSelectedCertificate}
      />

      {/* Project Interfaces Carousel Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={handleCloseProjectModal}
      />

      {/* Enlarged Profile Photo Modal */}
      <ProfilePhotoModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        avatarSrc={avatarImg}
        personalInfo={cvData.personal}
      />

      {/* PDF Download Options Modal (<= 8 MB vs Full HD) */}
      <PdfDownloadOptionsModal
        isOpen={isPdfOptionsModalOpen}
        onClose={() => setIsPdfOptionsModalOpen(false)}
        onSelectOption={(mode) => handleDownloadPdf(mode)}
        onNativePrint={handleNativePrint}
      />

      {/* PDF Download Progress Modal */}
      <PdfProgressModal
        isOpen={isPdfModalOpen}
        progress={pdfProgress}
        step={pdfStep}
        isComplete={isPdfComplete}
        mode={currentPdfMode}
        fileSizeFormatted={pdfFileSizeFormatted}
        onClose={() => setIsPdfModalOpen(false)}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium flex items-center gap-2.5 max-w-sm text-center"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
