import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 hover:bg-accent/20 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon
          size={20}
          className="text-accent group-hover:scale-110 transition-transform duration-300"
        />
      ) : (
        <Sun
          size={20}
          className="text-accent group-hover:scale-110 transition-transform duration-300"
        />
      )}
      
      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {theme === 'light' ? 'Ciemny motyw' : 'Jasny motyw'}
      </div>
    </button>
  );
}
