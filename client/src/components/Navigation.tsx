import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { label: 'O nas', id: 'about' },
    { label: 'Usługi', id: 'services' },
    { label: 'Galeria', id: 'gallery' },
    { label: 'Rezerwacja', id: 'booking' },
    { label: 'Opinie', id: 'reviews' },
    { label: 'Kontakt', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-xl shadow-lg border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-glow">
              <span className="text-white font-black text-lg">F</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-black text-foreground tracking-tight">Filtum</h1>
              <p className="text-xs text-muted-foreground -mt-0.5">Mechanika pojazdowa</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Theme Switcher & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeSwitcher />
            <button
              onClick={() => scrollToSection('booking')}
              className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              Umów wizytę
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="flex lg:hidden items-center gap-3">
            <ThemeSwitcher />
            <button
              className="p-2 text-foreground hover:text-accent transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-border animate-slide-down bg-background/95 backdrop-blur-xl rounded-b-xl">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:text-accent hover:bg-accent/5 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="px-4 py-3">
              <button
                onClick={() => scrollToSection('booking')}
                className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg"
              >
                Umów wizytę
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
