import { useRef, useState } from 'react';
import { Wrench, Zap, Shield, Hammer, Truck, Flame, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  detailedDescription: string;
  additionalFeatures: string[];
}

export default function ServicesPremium() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const services: ServiceCard[] = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: 'Naprawa Mechaniczna',
      description: 'Kompleksowe naprawy i serwis samochodów',
      features: ['Diagnostyka', 'Wymiana części', 'Regulacje'],
      detailedDescription: 'Oferujemy pełen zakres usług mechanicznych dla wszystkich marek samochodów. Nasz zespół doświadczonych mechaników wykorzystuje najnowocześniejszy sprzęt diagnostyczny, aby szybko i precyzyjnie zidentyfikować oraz naprawić wszelkie usterki.',
      additionalFeatures: [
        'Kompleksowa diagnostyka komputerowa',
        'Naprawa układów hamulcowych',
        'Wymiana rozrządu i pasków klinowych',
        'Serwis klimatyzacji',
        'Naprawa zawieszenia',
        'Wymiana oleju i filtrów',
        'Gwarancja na wykonane usługi'
      ],
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Spawanie Aluminium',
      description: 'Profesjonalne spawanie aluminium i stopów',
      features: ['TIG/MIG', 'Wysokiej jakości', 'Certyfikowane'],
      detailedDescription: 'Specjalizujemy się w spawaniu aluminium metodami TIG i MIG. Posiadamy certyfikaty i wieloletnie doświadczenie w pracy z aluminium oraz jego stopami, co gwarantuje najwyższą jakość wykonania.',
      additionalFeatures: [
        'Spawanie metodą TIG (AC/DC)',
        'Spawanie metodą MIG',
        'Naprawa felg aluminiowych',
        'Spawanie bloków silnika',
        'Spawanie skrzyń biegów',
        'Spawanie ram i podwozi',
        'Certyfikowane spawy zgodne z normami'
      ],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Spawanie Stali',
      description: 'Spawanie stali nierdzewnej i czarnej',
      features: ['Precyzja', 'Trwałość', 'Gwarancja'],
      detailedDescription: 'Wykonujemy profesjonalne spawanie stali nierdzewnej i czarnej. Nasze usługi obejmują zarówno drobne naprawy, jak i kompleksowe prace spawalnicze przy konstrukcjach nośnych.',
      additionalFeatures: [
        'Spawanie konstrukcji stalowych',
        'Naprawa układów wydechowych',
        'Spawanie ram i podwozi',
        'Spawanie stali nierdzewnej',
        'Spawanie elementów zawieszenia',
        'Prace spawalnicze przy przyczepach',
        'Wzmacnianie konstrukcji'
      ],
    },
    {
      icon: <Hammer className="w-8 h-8" />,
      title: 'Prace Karoseryjne',
      description: 'Naprawa i renowacja karoserii',
      features: ['Lakierowanie', 'Prostowanie', 'Detailing'],
      detailedDescription: 'Kompleksowe usługi blacharsko-lakiernicze. Od drobnych poprawek po całkowitą renowację karoserii. Używamy najwyższej jakości lakierów i materiałów.',
      additionalFeatures: [
        'Naprawa po kolizjach',
        'Prostowanie blach',
        'Lakierowanie proszkowe',
        'Usuwanie rdzy i zabezpieczanie',
        'Polerowanie i detailing',
        'Naprawa plastików i zderzaków',
        'Dopasowanie kolorów lakieru'
      ],
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Specjalizacja 4x4',
      description: 'Naprawa samochodów terenowych',
      features: ['Off-road', 'Zawieszenie', 'Tuning'],
      detailedDescription: 'Specjalizujemy się w serwisie i modyfikacjach pojazdów terenowych. Oferujemy zarówno naprawy standardowe, jak i zaawansowane modyfikacje off-roadowe.',
      additionalFeatures: [
        'Podnoszenie zawieszenia (lift)',
        'Montaż wyciągarek',
        'Instalacja oświetlenia LED',
        'Wzmacnianie podwozia',
        'Montaż bagażników dachowych',
        'Tuning silnika',
        'Przygotowanie do jazdy terenowej'
      ],
    },
    {
      icon: <Flame className="w-8 h-8" />,
      title: 'Budowa Kamperów',
      description: 'Projektowanie i budowa kampery',
      features: ['Projekt', 'Montaż', 'Wyposażenie'],
      detailedDescription: 'Realizujemy kompleksowe projekty zabudowy kamperowej. Od projektu, przez wykonanie konstrukcji, aż po pełne wyposażenie wnętrza zgodnie z Twoimi potrzebami.',
      additionalFeatures: [
        'Indywidualne projekty zabudowy',
        'Instalacje elektryczne 12V/230V',
        'Instalacje wodne i sanitarne',
        'Montaż ogrzewania',
        'Zabudowa mebli i schowków',
        'Izolacja termiczna i akustyczna',
        'Homologacja zabudowy'
      ],
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
    setHoveredIndex(null);
  };

  const handleLearnMore = (service: ServiceCard, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCardClick = (service: ServiceCard) => {
    // On mobile, clicking the card opens the modal
    if (window.innerWidth < 768) {
      setSelectedService(service);
      setIsModalOpen(true);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">Usługi</h2>
          <p className="dark:text-gray-400 text-gray-600 text-lg max-w-2xl mx-auto">
            Pełny zakres profesjonalnych usług mechanicznych i spawalniczych
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => handleCardClick(service)}
              className="group relative h-full transition-all duration-300 cursor-pointer"
              style={{
                transitionProperty: 'transform',
                transitionDuration: '0.3s',
              }}
            >
              {/* Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/50 to-red-500/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

              {/* Card Content */}
              <div className="relative h-full p-8 glass-dark rounded-xl border border-orange-500/20 group-hover:border-orange-500/50 transition-all duration-300 z-10">
                {/* Icon Container */}
                <div className="mb-6 inline-flex p-4 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 group-hover:from-orange-500/40 group-hover:to-red-500/40 transition-all duration-300">
                  <div className="text-orange-500 group-hover:text-orange-400 transition-colors duration-300 animate-bounce-slow">
                    {service.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3 dark:group-hover:text-orange-400 group-hover:text-gray-700 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="dark:text-white/90 text-gray-700 mb-6 dark:group-hover:text-white group-hover:text-gray-600 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm dark:text-white/80 text-gray-600 dark:group-hover:text-white group-hover:text-gray-700 transition-colors duration-300"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 dark:group-hover:bg-orange-400 group-hover:bg-orange-600 transition-colors duration-300" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Learn More Button */}
                <button 
                  onClick={(e) => handleLearnMore(service, e)}
                  className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold opacity-0 md:group-hover:opacity-100 md:transform md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300 hover:from-orange-700 hover:to-orange-600"
                >
                  Dowiedz się więcej
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto glass-dark border-orange-500/30 dark:text-white light:text-gray-900">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl text-orange-400">
              {selectedService?.icon}
              {selectedService?.title}
            </DialogTitle>
            <DialogDescription className="dark:text-white/90 light:text-gray-700 text-base mt-4">
              {selectedService?.detailedDescription}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-orange-400 mb-4">Zakres usług:</h4>
            <ul className="space-y-3">
              {selectedService?.additionalFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 dark:text-white/90 light:text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <p className="text-sm dark:text-white/90 light:text-gray-700">
              <strong className="text-orange-400">Skontaktuj się z nami</strong>, aby uzyskać więcej informacji lub umówić wizytę w naszym warsztacie.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
