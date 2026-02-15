import { useState } from 'react';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

interface BookingProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Booking({ isOpen = true, onClose }: BookingProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    description: '',
    appointmentDate: '',
    appointmentTime: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const createBooking = trpc.bookings.create.useMutation({
    onSuccess: () => {
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        description: '',
        appointmentDate: '',
        appointmentTime: '',
      });
      setTimeout(() => {
        setIsSuccess(false);
        onClose?.();
      }, 3000);
    },
    onError: (error) => {
      toast.error(error.message || 'Błąd podczas rezerwacji');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.serviceType || !formData.appointmentDate || !formData.appointmentTime) {
      toast.error('Wypełnij wszystkie wymagane pola');
      return;
    }

    createBooking.mutate({
      ...formData,
      appointmentDate: new Date(formData.appointmentDate),
    });
  };

  const services = [
    'Spawanie aluminium',
    'Spawanie stali nierdzewnej',
    'Spawanie stali czarnej',
    'Konserwacja podwozia',
    'Naprawy blacharskie',
    'Naprawy mechaniczne',
    'Specjalizacja 4x4',
    'Budowa kamperów',
  ];

  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  if (isSuccess) {
    return (
      <section id="booking" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-accent/5 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center animate-scale-in">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} className="text-accent" />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">Rezerwacja potwierdzona!</h3>
            <p className="text-lg text-muted-foreground mb-2">
              Dziękujemy za rezerwację wizyty w naszym warsztacie.
            </p>
            <p className="text-muted-foreground">
              Wkrótce skontaktujemy się z Tobą, aby potwierdzić termin.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Umów wizytę
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Zarezerwuj termin wizyty w naszym warsztacie. Wybierz dogodny dla Ciebie dzień i godzinę.
          </p>
          <div className="w-12 h-1 bg-accent rounded-full mx-auto mt-6"></div>
        </div>

        {/* Booking Form */}
        <div className="max-w-2xl mx-auto glass-dark border border-orange-500/20 rounded-lg shadow-lg p-8 sm:p-12 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Imię i nazwisko *
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jan Kowalski"
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jan@example.com"
                  className="w-full"
                  required
                />
              </div>
            </div>

            {/* Phone & Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Telefon *
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="503 922 248"
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Typ usługi *
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-transparent dark:bg-zinc-950 dark:text-white"
                  required
                >
                  <option value="">Wybierz usługę</option>
                  {services.map(service => (
                    <option key={service} value={service} className="dark:bg-zinc-950">{service}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Calendar size={16} />
                  Data wizyty *
                </label>
                <Input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  min={today}
                  className="w-full dark:[color-scheme:dark]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Clock size={16} />
                  Godzina *
                </label>
                <select
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-transparent dark:bg-zinc-950 dark:text-white"
                  required
                >
                  <option value="">Wybierz godzinę</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time} className="dark:bg-zinc-950">{time}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Opis problemu / Dodatkowe informacje
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Opisz problem z Twoim pojazdem lub co chciałbyś zrealizować..."
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={createBooking.isPending}
              className="w-full bg-accent hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-glow disabled:opacity-50"
            >
              {createBooking.isPending ? 'Rezerwowanie...' : 'Zarezerwuj wizytę'}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              * Pola wymagane. Po wysłaniu rezerwacji skontaktujemy się z Tobą w ciągu 24 godzin.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
