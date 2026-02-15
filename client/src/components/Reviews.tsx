import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: reviews = [] } = trpc.reviews.getApproved.useQuery();

  // Default reviews if none from database
  const defaultReviews = [
    {
      id: 1,
      clientName: 'Jan Kowalski',
      rating: 5,
      comment: 'Świetna obsługa, profesjonalna ekipa. Mój pojazd 4x4 wygląda jak nowy. Polecam!',
      serviceType: 'Naprawa mechaniczna',
    },
    {
      id: 2,
      clientName: 'Maria Nowak',
      rating: 5,
      comment: 'Budowa kampera przeszła moje oczekiwania. Precyzja i dbałość o detale na najwyższym poziomie.',
      serviceType: 'Budowa kampera',
    },
    {
      id: 3,
      clientName: 'Piotr Lewandowski',
      rating: 5,
      comment: 'Spawanie aluminium wykonane bezprawnie. Polecam wszystkim właścicielom pojazdów terenowych.',
      serviceType: 'Spawanie aluminium',
    },
  ];

  const displayReviews = reviews.length > 0 ? reviews : defaultReviews;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayReviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [displayReviews.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + displayReviews.length) % displayReviews.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayReviews.length);
  };

  const currentReview = displayReviews[currentIndex];

  return (
    <section id="reviews" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Opinie Klientów
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Przeczytaj co mówią nasi zadowoleni klienci o naszych usługach
          </p>
          <div className="w-12 h-1 bg-accent rounded-full mx-auto mt-6"></div>
        </div>

        {/* Reviews Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="glass-dark border border-orange-500/20 rounded-lg p-8 sm:p-12 shadow-lg animate-scale-in">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className={`${
                    i < currentReview.rating
                      ? 'fill-accent text-accent'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-lg sm:text-xl text-foreground text-center mb-6 leading-relaxed italic">
              "{currentReview.comment}"
            </p>

            {/* Client Info */}
            <div className="text-center mb-8">
              <p className="font-semibold text-foreground text-lg">{currentReview.clientName}</p>
              <p className="text-sm text-muted-foreground">{currentReview.serviceType}</p>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4">
              <Button
                onClick={goToPrevious}
                className="bg-accent hover:bg-orange-600 text-white rounded-full p-2 transition-all duration-200"
              >
                <ChevronLeft size={24} />
              </Button>
              <Button
                onClick={goToNext}
                className="bg-accent hover:bg-orange-600 text-white rounded-full p-2 transition-all duration-200"
              >
                <ChevronRight size={24} />
              </Button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {displayReviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-accent w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Review Count */}
          <p className="text-center text-muted-foreground mt-8 text-sm">
            Opinia {currentIndex + 1} z {displayReviews.length}
          </p>
        </div>
      </div>
    </section>
  );
}
