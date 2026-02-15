import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import MapComponent from './MapComponent';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    },
    onError: (error) => {
      toast.error(error.message || 'Błąd podczas wysyłania wiadomości');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Wypełnij wszystkie wymagane pola');
      return;
    }

    submitContact.mutate(formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon',
      value: '503 922 248',
      link: 'tel:+48503922248',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@filtum.pl',
      link: 'mailto:info@filtum.pl',
    },
    {
      icon: MapPin,
      title: 'Adres',
      value: 'Dębowa 15, 84-208 Dobrzewino',
      link: 'https://www.google.com/maps/place/FILTUM+SPAWANIE+-+MECHANIKA+POJAZDOWA/@54.4525151,18.3581164,17z/data=!3m1!4b1!4m6!3m5!1s0x46fdbd6b36abd627:0x3bd60be17a1d9f64!8m2!3d54.452512!4d18.3606913!16s%2Fg%2F11f39c1ys7?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D',
    },
    {
      icon: Clock,
      title: 'Godziny otwarcia',
      value: 'Pn-Pt: 8:00-17:00, Sob: 9:00-14:00',
      link: '#',
    },
  ];

  if (isSuccess) {
    return (
      <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center animate-scale-in">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} className="text-accent" />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">Wiadomość wysłana!</h3>
            <p className="text-lg text-muted-foreground mb-2">
              Dziękujemy za Twoją wiadomość.
            </p>
            <p className="text-muted-foreground">
              Odpowiemy na Twoją wiadomość w ciągu 24 godzin.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Kontakt
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Masz pytania? Skontaktuj się z nami. Chętnie odpowiemy na wszystkie Twoje wiadomości.
          </p>
          <div className="w-12 h-1 bg-accent rounded-full mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6 animate-slide-left">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <a
                  key={index}
                  href={info.link}
                  className="flex items-start space-x-4 p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    <Icon size={24} className="text-accent group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                    <p className="text-muted-foreground">{info.value}</p>
                  </div>
                </a>
              );
            })}

            {/* Map */}
            <div className="mt-6">
              <MapComponent />
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-dark border border-orange-500/20 rounded-lg shadow-lg p-6 sm:p-8 animate-slide-right lg:max-w-md mx-auto self-start">
            <h3 className="text-2xl font-bold text-foreground mb-4">Wyślij wiadomość</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
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

              {/* Email */}
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

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Telefon
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="503 922 248"
                  className="w-full"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Wiadomość *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Twoja wiadomość..."
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={submitContact.isPending}
                className="w-full bg-accent hover:bg-orange-600 text-white py-2.5 rounded-lg font-semibold transition-all duration-200 hover:shadow-glow disabled:opacity-50"
              >
                {submitContact.isPending ? 'Wysyłanie...' : 'Wyślij wiadomość'}
              </Button>

              <p className="text-xs text-muted-foreground mb-0">
                * Pola wymagane. Odpowiemy na Twoją wiadomość w ciągu 24 godzin.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
