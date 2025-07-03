"use client";

import { useGame } from '@/contexts/GameContext';
import { GuessRow } from './GuessRow';

export function GameGrid() {
  const { state } = useGame();

  return (
    <div className="flex flex-col gap-2 items-center mb-8">
      {state.guesses.map((guess, index) => (
        <GuessRow
          key={index}
          guess={guess}
          isActive={index === state.currentGuess}
          rowIndex={index}
        />
      ))}
    </div>
  );
}