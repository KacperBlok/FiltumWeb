import { Award, Users, Zap, Shield } from 'lucide-react';

export default function AboutPremium() {
  const stats = [
    { icon: Award, label: 'Lat doświadczenia', value: '20+' },
    { icon: Users, label: 'Zadowolonych klientów', value: '1000+' },
    { icon: Zap, label: 'Ukończonych napraw', value: '5000+' },
    { icon: Shield, label: 'Gwarancja jakości', value: '100%' },
  ];

  const timeline = [
    { year: '2004', title: 'Założenie Warsztatu', description: 'Początek działalności FILTUM' },
    { year: '2010', title: 'Rozszerzenie Usług', description: 'Dodanie spawalnictwa zaawansowanego' },
    { year: '2015', title: 'Specjalizacja 4x4', description: 'Naprawa samochodów terenowych' },
    { year: '2020', title: 'Budowa Kamperów', description: 'Nowa linia usług - budowa kampery' },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">O nas</h2>
          <p className="dark:text-gray-400 text-gray-600 text-lg max-w-2xl mx-auto">
            Ponad 20 lat doświadczenia w branży automotive
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left Side - Description */}
          <div className="space-y-6 animate-slide-left">
            <p className="dark:text-gray-300 text-gray-800 text-lg leading-relaxed">
              Mechanika Pojazdowa FILTUM to warsztat z bogatą tradycją i doświadczeniem. Specjalizujemy się w naprawach samochodów terenowych 4x4, zaawansowanym spawalnictwie oraz budowie kampery.
            </p>

            <p className="dark:text-gray-400 text-gray-700 leading-relaxed">
              Nasz zespół to doświadczeni fachowcy, którzy dbają o każdy szczegół. Używamy najnowocześniejszego sprzętu i materiałów najwyższej jakości, aby zapewnić naszym klientom bezpieczeństwo i niezawodność.
            </p>

            <div className="space-y-3 pt-4">
              {['Profesjonalizm', 'Jakość', 'Rzetelność', 'Innowacyjność'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
                  <span className="dark:text-gray-300 text-gray-800 font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Stats */}
          <div className="grid grid-cols-2 gap-4 animate-slide-right">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="glass-dark p-6 rounded-xl border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 hover:shadow-neon group animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 group-hover:from-orange-500/40 group-hover:to-red-500/40 transition-all duration-300">
                    <Icon className="w-6 h-6 text-orange-500 group-hover:text-orange-400 transition-colors" />
                  </div>
                  <div className="text-3xl font-bold text-orange-500 mb-2">{stat.value}</div>
                  <p className="text-sm dark:text-gray-400 text-gray-700">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-12 text-center animate-fade-in">Historia Filtum</h2>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="relative pl-8 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 ring-4 ring-background" />

                {/* Timeline Line */}
                {index !== timeline.length - 1 && (
                  <div className="absolute left-1.5 top-6 w-0.5 h-12 bg-gradient-to-b from-orange-500/50 to-transparent" />
                )}

                {/* Content */}
                <div className="glass-dark p-6 rounded-lg border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300">
                  <div className="text-sm font-semibold text-orange-500 mb-2">{item.year}</div>
                  <h4 className="text-xl font-bold dark:text-white text-gray-900 mb-2">{item.title}</h4>
                  <p className="dark:text-gray-400 text-gray-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
