import React, { useState } from 'react';
import {
  Download,
  Printer,
  ChevronDown,
  Loader2,
  Menu,
  X,
  User,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  onDownloadPdf: () => void;
  onNativePrint: () => void;
  isExporting: boolean;
  exportStep: string;
  onSectionSelect?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onDownloadPdf,
  onNativePrint,
  isExporting,
  exportStep,
  onSectionSelect,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);

    if (onSectionSelect) {
      onSectionSelect(id);
    }

    setTimeout(() => {
      let target: HTMLElement | null = null;
      const elements = document.querySelectorAll<HTMLElement>(`#${id}, [data-section="${id}"]`);
      for (const el of Array.from(elements)) {
        if (el.offsetParent !== null || el.getBoundingClientRect().height > 0) {
          target = el;
          break;
        }
      }
      if (!target && elements.length > 0) {
        target = elements[0];
      }

      if (target) {
        const isMobile = window.innerWidth < 1024;
        const headerOffset = isMobile ? 120 : 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
      }
    }, 60);
  };

  const navSections = [
    { id: 'seccion-perfil', label: 'Perfil', icon: User },
    { id: 'seccion-formacion', label: 'Formación', icon: GraduationCap },
    { id: 'seccion-competencias', label: 'Competencias', icon: Code2 },
    { id: 'seccion-experiencia', label: 'Experiencia', icon: Briefcase, badge: 'M4 Managers' },
    { id: 'seccion-proyectos', label: 'Últimos Proyectos', icon: Layers, badge: '5 Proyectos' },
    { id: 'seccion-certificados', label: 'Certificados', icon: Award },
    { id: 'seccion-aptitudes', label: 'Aptitudes', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Title */}
        <div className="flex flex-col min-w-0 pr-1">
          <a
            href="#"
            className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-slate-900 truncate hover:text-[#2C4A6F] transition-colors"
          >
            Moisés Isaías Ortíz Gracia
          </a>
          <span className="text-[11px] text-slate-500 font-medium truncate hidden sm:block">
            Desarrollador Web Fullstack · CV Profesional
          </span>
        </div>

        {/* Desktop & Tablet Landscape Section Navigation Buttons */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 p-1 bg-slate-100 rounded-xl text-[11px] xl:text-xs border border-slate-200/80 shrink-0">
          {navSections.map((sec, idx) => (
            <React.Fragment key={sec.id}>
              {idx > 0 && <span className="text-slate-300 select-none">·</span>}
              <button
                onClick={() => scrollToSection(sec.id)}
                className="px-2 xl:px-3 py-1.5 font-semibold text-slate-700 hover:text-[#2C4A6F] hover:bg-white rounded-lg shadow-none hover:shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                {sec.label}
              </button>
            </React.Fragment>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Desktop & Tablet Download Dropdown */}
          <div className="relative hidden sm:block">
            <button
              disabled={isExporting}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#2C4A6F] hover:bg-[#233D5D] rounded-xl shadow-sm transition-all active:scale-95 disabled:opacity-60 whitespace-nowrap cursor-pointer"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Exportando...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar PDF</span>
                  <ChevronDown className="w-3 h-3 opacity-75" />
                </>
              )}
            </button>

            {/* Dropdown Options */}
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onDownloadPdf();
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-start gap-3 transition-colors text-xs cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#2C4A6F] flex items-center justify-center shrink-0 mt-0.5">
                    <Download className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800 block">
                      Descarga Directa (Archivo .pdf)
                    </span>
                    <span className="text-[11px] text-slate-500 block leading-tight">
                      Genera el archivo con las 5 páginas en alta resolución
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onNativePrint();
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-start gap-3 transition-colors text-xs border-t border-slate-100 cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Printer className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800 block">
                      Imprimir / Guardar como PDF
                    </span>
                    <span className="text-[11px] text-slate-500 block leading-tight">
                      Calidad vectorial nativa del navegador
                    </span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Download Quick Action */}
          <button
            disabled={isExporting}
            onClick={onDownloadPdf}
            className="sm:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#2C4A6F] active:bg-[#233D5D] rounded-xl shadow-xs transition-transform active:scale-95 disabled:opacity-60 cursor-pointer"
            aria-label="Descargar PDF"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span className="text-[11px]">PDF</span>
              </>
            )}
          </button>

          {/* Mobile & Tablet Portrait Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de secciones'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-slate-800" /> : <Menu className="w-5 h-5 text-slate-800" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Portrait Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-xl px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
            Secciones del Curriculum
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5">
            {navSections.map((sec) => {
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-[#2C4A6F] bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-[#2C4A6F] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{sec.label}</span>
                  </div>
                  {sec.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-[#2C4A6F] font-bold">
                      {sec.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick PDF Actions on Mobile Drawer */}
          <div className="pt-2 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onDownloadPdf();
              }}
              disabled={isExporting}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#2C4A6F] text-white text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Archivo PDF</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNativePrint();
              }}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 active:scale-95 transition-all cursor-pointer"
              title="Imprimir"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Export progress banner if generating */}
      {isExporting && (
        <div className="bg-blue-50 border-t border-blue-200 px-4 py-1.5 text-center text-xs text-[#2C4A6F] font-medium flex items-center justify-center gap-2">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>{exportStep}</span>
        </div>
      )}
    </header>
  );
};
