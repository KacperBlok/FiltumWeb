import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function MapComponent() {
  const { theme } = useTheme();

  const workshopLocation = {
    name: 'Mechanika Pojazdowa FILTUM',
    address: 'Dębowa 15, 84-208 Dobrzewino',
    phone: '503 922 248',
    email: 'info@filtum.pl',
    hours: 'Pn-Pt: 8:00-17:00, Sob: 9:00-14:00',
    lat: 54.452512,
    lng: 18.3606913,
  };

  const openMapsDirections = () => {
    window.open(
      'https://www.google.com/maps/place/FILTUM+SPAWANIE+-+MECHANIKA+POJAZDOWA/@54.4525151,18.3581164,17z/data=!3m1!4b1!4m6!3m5!1s0x46fdbd6b36abd627:0x3bd60be17a1d9f64!8m2!3d54.452512!4d18.3606913!16s%2Fg%2F11f39c1ys7?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D',
      '_blank'
    );
  };

  return (
    <div className="space-y-6">
      {/* Map Container - styled like contact tiles */}
      <div className="w-full rounded-lg p-4 border border-border hover:border-accent hover:bg-accent/5 transition-all duration-300 group relative overflow-hidden">
        {/* Content */}
        <div className="relative z-10 text-center space-y-4 h-72 md:h-96 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
            <MapPin size={32} className="text-accent" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {workshopLocation.name}
            </h3>
            <p className="text-muted-foreground mb-4">{workshopLocation.address}</p>
            <button
              onClick={openMapsDirections}
              className="inline-flex items-center gap-2 px-6 py-2 bg-accent hover:bg-orange-600 text-white rounded-lg transition-all duration-300 hover:shadow-glow"
            >
              <Navigation size={18} />
              Otwórz w mapach
            </button>
          </div>
        </div>
      </div>

      {/* Location Info Card */}
      <div className="rounded-lg p-4 border border-border hover:border-accent hover:bg-accent/5 transition-all duration-300">
        <div className="space-y-4">
          {/* Address */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Lokalizacja</h4>
              <p className="text-muted-foreground text-sm">{workshopLocation.address}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Telefon</h4>
              <a
                href={`tel:${workshopLocation.phone}`}
                className="text-accent hover:text-orange-600 transition-colors text-sm"
              >
                {workshopLocation.phone}
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Email</h4>
              <a
                href={`mailto:${workshopLocation.email}`}
                className="text-accent hover:text-orange-600 transition-colors text-sm"
              >
                {workshopLocation.email}
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Godziny otwarcia</h4>
              <p className="text-muted-foreground text-sm">{workshopLocation.hours}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Hint */}
      <div className="rounded-lg p-4 border border-border hover:border-accent hover:bg-accent/5 transition-all duration-300">
        <p className="text-sm text-muted-foreground">
          💡 <strong>Wskazówka:</strong> Kliknij przycisk "Otwórz w mapach", aby uzyskać nawigację GPS i dokładne kierunki do naszego warsztatu.
        </p>
      </div>
    </div>
  );
}
