import { useTheme } from '@/contexts/ThemeContext';

export default function AnimatedDivider() {
  const { theme } = useTheme();

  return (
    <div className="relative h-24 flex items-center justify-center overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          fill: theme === 'light' ? '#f5f5f5' : '#1a1a1a',
        }}
      >
        <path
          d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
          className="animate-wave"
          style={{
            animationDuration: '8s',
          }}
        />
      </svg>
    </div>
  );
}
