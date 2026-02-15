import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-orange-500/20">
      <div className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">F</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">FILTUM</h3>
                <p className="text-xs dark:text-gray-300 text-gray-600">Mechanika Pojazdowa</p>
              </div>
            </div>
            <p className="text-sm dark:text-gray-300 text-gray-600 leading-relaxed">
              Profesjonalna mechanika, spawanie i budowa kamperów dla pojazdów terenowych.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Nawigacja</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="dark:text-gray-300 text-gray-600 hover:text-accent transition-colors">
                  O nas
                </a>
              </li>
              <li>
                <a href="#services" className="dark:text-gray-300 text-gray-600 hover:text-accent transition-colors">
                  Usługi
                </a>
              </li>
              <li>
                <a href="#gallery" className="dark:text-gray-300 text-gray-600 hover:text-accent transition-colors">
                  Galeria
                </a>
              </li>
              <li>
                <a href="#reviews" className="dark:text-gray-300 text-gray-600 hover:text-accent transition-colors">
                  Opinie
                </a>
              </li>
              <li>
                <a href="#contact" className="dark:text-gray-300 text-gray-600 hover:text-accent transition-colors">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Kontakt</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-accent flex-shrink-0 mt-1" />
                <a href="tel:+48503922248" className="dark:text-gray-300 text-gray-600 hover:text-accent transition-colors">
                  503 922 248
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-accent flex-shrink-0 mt-1" />
                <a href="mailto:info@filtum.pl" className="dark:text-gray-300 text-gray-600 hover:text-accent transition-colors">
                  info@filtum.pl
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-accent flex-shrink-0 mt-1" />
                <span className="dark:text-gray-300 text-gray-600">
                  Dębowa 15
                  <br />
                  84-208 Dobrzewino
                </span>
              </li>
            </ul>
          </div>

          {/* Hours & Social */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Godziny otwarcia</h4>
            <ul className="space-y-2 text-sm dark:text-gray-300 text-gray-600 mb-6">
              <li>Poniedziałek - Piątek: 8:00 - 17:00</li>
              <li>Sobota: 9:00 - 14:00</li>
              <li>Niedziela: Zamknięte</li>
            </ul>
            <h4 className="font-semibold text-lg mb-3">Obserwuj nas</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-accent/20 hover:bg-accent rounded-full flex items-center justify-center transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-accent/20 hover:bg-accent rounded-full flex items-center justify-center transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-accent/20 hover:bg-accent rounded-full flex items-center justify-center transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-center text-sm dark:text-gray-400 text-gray-600">
            © {currentYear} Mechanika Pojazdowa FILTUM. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </div>
      </div>
    </footer>
  );
}
