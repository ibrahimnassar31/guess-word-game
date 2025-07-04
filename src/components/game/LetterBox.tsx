"use client";

import type { Letter, LetterState } from '@/contexts/gameTypes';
import { cn } from '@/lib/utils';

interface LetterBoxProps {
  letter: Letter;
  isActive?: boolean;
}

export function LetterBox({ letter, isActive = false }: LetterBoxProps) {
  const getBackgroundColor = (state: LetterState) => {
    switch (state) {
      case 'correct':
        return 'bg-green-500 border-green-500 text-white';
      case 'present':
        return 'bg-yellow-500 border-yellow-500 text-white';
      case 'absent':
        return 'bg-gray-500 border-gray-500 text-white';
      default:
        return letter.char
          ? 'bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600'
          : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700';
    }
  };

  return (
    <div
      className={cn(
        'w-14 h-14 border-2 rounded flex items-center justify-center font-bold text-lg transition-all duration-300',
        getBackgroundColor(letter.state),
        isActive && letter.char && 'scale-105 shadow-md',
        letter.char && 'animate-in zoom-in-50 duration-200'
      )}
    >
      {letter.char}
    </div>
  );
}
