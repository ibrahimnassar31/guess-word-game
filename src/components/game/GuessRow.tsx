"use client";

import { useGame } from '@/contexts/GameContext';
import type { Letter } from '@/contexts/gameTypes';
import { LetterBox } from './LetterBox';

interface GuessRowProps {
  guess: Letter[];
  isActive: boolean;
  rowIndex: number;
}

export function GuessRow({ guess, isActive, rowIndex }: GuessRowProps) {
  const { state } = useGame();

  return (
    <div className="flex gap-2 justify-center">
      {guess.map((letter, index) => (
        <LetterBox
          key={`${rowIndex}-${index}`}
          letter={letter}
          isActive={isActive && index === state.currentPosition - 1}
        />
      ))}
    </div>
  );
}
