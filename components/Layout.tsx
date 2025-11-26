
import React, { useState, useEffect } from 'react';
import { UserRole, Language } from '../types';
import { LANGUAGES } from '../constants';
import { ShieldCheck, Menu, X, Globe, Type, Eye } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateHome: () => void;
  onNavigateArchive?: (date: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, userRole, onRoleChange, language, onLanguageChange, onNavigateHome, onNavigateArchive
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  // Apply high contrast class to body
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('contrast-125', 'grayscale');
    } else {
      document.body.classList.remove('contrast-125', 'grayscale');
    }
  }, [highContrast]);

  // Apply font size class to body
  useEffect(() => {
     if (largeText) {
         document.documentElement.classList.add('text-lg');
     } else {
         document.documentElement.classList.remove('text-lg');
     }
  }, [largeText]);

  const roles: UserRole[] = ['all', 'student', 'parent', 'business', 'educator'];

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 ${highContrast ? 'bg-white text-black' : ''}`}>
      <header className={`sticky top-0 z-50 shadow-lg ${highContrast ? 'bg-black text-white border-b-2 border-white' : 'bg-slate-900 text-white'}`}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={onNavigateHome} className="flex items-center gap-2 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg p-1">
            <ShieldCheck className={`h-8 w-8 ${highContrast ? 'text-yellow-400' : 'text-cyan-400'}`} />
            <span className="font-bold text-xl tracking-tight">Vidacyberinsights</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-4" aria-label="Main Navigation">
             {/* Role Selector - Header Compact Version */}
            <div className={`flex items-center rounded-lg p-1 ${highContrast ? 'bg-black border border-white' : 'bg-slate-800'}`} role="group" aria-label="Role Selection">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => onRoleChange(role)}
                  aria-pressed={userRole === role}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                    userRole === role 
                      ? (highContrast ? 'bg-white text-black font-bold' : 'bg-cyan-500 text-white shadow-sm')
                      : (highContrast ? 'text-white hover:underline' : 'text-slate-400 hover:text-white')
                  }`}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-slate-700 mx-2"></div>

             {/* A11y Controls */}
            <div className="flex items-center gap-2" role="group" aria-label="Accessibility Controls">
                 <button 
                    onClick={() => setLargeText(!largeText)}
                    className="p-2 hover:bg-slate-800 rounded text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    title="Toggle Font Size"
                    aria-label={largeText ? "Reset Font Size" : "Increase Font Size"}
                 >
                     <Type className="w-4 h-4" />
                 </button>
                 <button 
                    onClick={() => setHighContrast(!highContrast)}
                    className="p-2 hover:bg-slate-800 rounded text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    title="Toggle High Contrast"
                    aria-label={highContrast ? "Disable High Contrast" : "Enable High Contrast"}
                 >
                     <Eye className="w-4 h-4" />
                 </button>
            </div>

            <div className="h-6 w-px bg-slate-700 mx-2"></div>

            {/* Language Selector */}
            <div className="relative group">
              <button 
                className="flex items-center gap-1 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded p-1"
                aria-haspopup="true"
                aria-label="Select Language"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm uppercase">{language}</span>
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-xl overflow-hidden hidden group-hover:block border border-slate-200 z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code as Language)}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="xl:hidden text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="xl:hidden bg-slate-800 border-t border-slate-700 p-4 animate-in slide-in-from-top-2">
             {/* Accessibility Mobile */}
            <div className="flex gap-4 mb-4 border-b border-slate-700 pb-4">
                 <button onClick={() => setLargeText(!largeText)} className="flex items-center gap-2 text-slate-300">
                    <Type className="w-4 h-4" /> Text Size
                 </button>
                 <button onClick={() => setHighContrast(!highContrast)} className="flex items-center gap-2 text-slate-300">
                    <Eye className="w-4 h-4" /> Contrast
                 </button>
            </div>

            <div className="flex flex-col gap-2">
               <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</span>
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    onRoleChange(role);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-md ${
                    userRole === role ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-700">
                 <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Language</span>
                 <div className="grid grid-cols-2 gap-2">
                     {LANGUAGES.map((lang) => (
                         <button 
                            key={lang.code}
                            onClick={() => {onLanguageChange(lang.code as Language); setIsMenuOpen(false);}}
                            className={`text-left px-2 py-1 text-sm rounded ${language === lang.code ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                         >
                             {lang.name}
                         </button>
                     ))}
                 </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className={`py-12 mt-12 border-t ${highContrast ? 'bg-black text-white border-white' : 'bg-slate-900 text-slate-400 border-slate-800'}`}>
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-1">
                <div className="flex items-center gap-2 text-white mb-4">
                     <ShieldCheck className="h-6 w-6 text-cyan-500" />
                     <span className="font-bold text-lg">Vidacyberinsights</span>
                </div>
                <p className="text-sm opacity-80 leading-relaxed">
                    Empowering individuals, students, and businesses with accessible, role-based cybersecurity education. 
                </p>
            </div>
            
            <div>
                <h3 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">About</h3>
                <ul className="text-sm space-y-2 opacity-80">
                    <li><button onClick={onNavigateHome} className="hover:text-cyan-400 transition-colors">Our Mission</button></li>
                    <li><button className="hover:text-cyan-400 transition-colors">Team</button></li>
                    <li><button className="hover:text-cyan-400 transition-colors">Partners</button></li>
                </ul>
            </div>

            <div>
                 <h3 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">Explore</h3>
                <ul className="text-sm space-y-2 opacity-80">
                    <li><button onClick={() => onNavigateArchive && onNavigateArchive('2024')} className="hover:text-cyan-400 transition-colors">2024 Archives</button></li>
                    <li><button onClick={() => onNavigateArchive && onNavigateArchive('2023')} className="hover:text-cyan-400 transition-colors">2023 Archives</button></li>
                    <li><button className="hover:text-cyan-400 transition-colors">Glossary</button></li>
                </ul>
            </div>

             <div>
                <h3 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">Legal</h3>
                <ul className="text-sm space-y-2 opacity-80">
                    <li><button className="hover:text-cyan-400 transition-colors">Privacy Policy</button></li>
                    <li><button className="hover:text-cyan-400 transition-colors">Terms of Service</button></li>
                    <li><button className="hover:text-cyan-400 transition-colors">Cookie Policy</button></li>
                </ul>
            </div>
        </div>
        
        <div className="container mx-auto px-4 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-50">
             <p>© 2024 Vidacyberinsights. All rights reserved.</p>
             <div className="flex items-center gap-4">
                 <span>WCAG 2.1 Compliant</span>
                 <span>Powered by Gemini</span>
             </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
