import { useTheme } from '@/contexts/ThemeContext';

export default function AnimatedBackground() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <div
        key={theme}
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background: theme === 'light'
            ? 'repeating-linear-gradient(-45deg, #ffffff 0%, #ffffff 0.5%, #fefefe 0.5%, #fefefe 1%, #fdfdfd 1%, #fdfdfd 1.5%, #fefefe 1.5%, #fefefe 2%)'
            : 'repeating-linear-gradient(-45deg, #000000 0%, #000000 0.5%, #050505 0.5%, #050505 1%, #0a0a0a 1%, #0a0a0a 1.5%, #050505 1.5%, #050505 2%)',
          backgroundSize: '400% 400%',
        }}
      />

      {/* Animated blobs */}
      <div className={`absolute top-0 -left-4 w-72 h-72 rounded-full filter blur-3xl animate-blob ${theme === 'light' ? 'bg-orange-400/40' : 'bg-gray-400/20'}`} style={{ mixBlendMode: 'normal' }} />
      <div className={`absolute top-0 -right-4 w-72 h-72 rounded-full filter blur-3xl animate-blob animation-delay-2000 ${theme === 'light' ? 'bg-orange-500/35' : 'bg-gray-500/15'}`} style={{ mixBlendMode: 'normal' }} />
      <div className={`absolute -bottom-8 left-20 w-72 h-72 rounded-full filter blur-3xl animate-blob animation-delay-4000 ${theme === 'light' ? 'bg-orange-300/30' : 'bg-gray-300/20'}`} style={{ mixBlendMode: 'normal' }} />

      {/* Animated grid pattern - visible in both themes */}
      <div
        key={`grid-${theme}`}
        className={theme === 'light' ? 'absolute inset-0 opacity-[0.15]' : 'absolute inset-0 opacity-5'}
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, ${theme === 'light' ? 'rgba(255, 102, 0, 0.2)' : 'rgba(255, 102, 0, 0.1)'} 25%, ${theme === 'light' ? 'rgba(255, 102, 0, 0.2)' : 'rgba(255, 102, 0, 0.1)'} 26%, transparent 27%, transparent 74%, ${theme === 'light' ? 'rgba(255, 102, 0, 0.2)' : 'rgba(255, 102, 0, 0.1)'} 75%, ${theme === 'light' ? 'rgba(255, 102, 0, 0.2)' : 'rgba(255, 102, 0, 0.1)'} 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, ${theme === 'light' ? 'rgba(255, 102, 0, 0.2)' : 'rgba(255, 102, 0, 0.1)'} 25%, ${theme === 'light' ? 'rgba(255, 102, 0, 0.2)' : 'rgba(255, 102, 0, 0.1)'} 26%, transparent 27%, transparent 74%, ${theme === 'light' ? 'rgba(255, 102, 0, 0.2)' : 'rgba(255, 102, 0, 0.1)'} 75%, ${theme === 'light' ? 'rgba(255, 102, 0, 0.2)' : 'rgba(255, 102, 0, 0.1)'} 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
          animation: 'moveGrid 20s linear infinite',
        }}
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`particle-${theme}-${i}`}
          className={`fixed w-1 h-1 rounded-full animate-float ${theme === 'light' ? 'bg-orange-500/60' : 'bg-accent/30'}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes moveGrid {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
