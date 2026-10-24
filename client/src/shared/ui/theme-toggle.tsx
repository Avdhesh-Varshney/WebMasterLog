import { useState } from 'react';
import { CircleHalf, Moon, Sun } from '@phosphor-icons/react';
import { storage } from '../utils/storage';
import { Button } from './button';

type Theme = 'system' | 'light' | 'dark';
const order: Theme[] = ['system', 'light', 'dark'];
const icons = { system: CircleHalf, light: Sun, dark: Moon };

const readTheme = (): Theme => {
  const t = storage.get('theme');
  return t === 'light' || t === 'dark' ? t : 'system';
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readTheme);
  const Icon = icons[theme];

  const cycle = () => {
    const next = order[(order.indexOf(theme) + 1) % order.length];
    setTheme(next);
    if (next === 'system') {
      storage.remove('theme');
      delete document.documentElement.dataset.theme;
    } else {
      storage.set('theme', next);
      document.documentElement.dataset.theme = next;
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-8 px-0"
      aria-label={`Theme: ${theme}`}
      onPress={cycle}
    >
      <Icon size={16} />
    </Button>
  );
}
