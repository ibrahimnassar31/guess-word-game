"use client";

import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Delete, CornerDownLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

import type { LetterState } from '@/contexts/gameTypes';

interface KeyProps {
  letter: string;
  state?: LetterState;
  isSpecial?: boolean;
  onClick: () => void;
}

function Key({ letter, state, isSpecial = false, onClick }: KeyProps) {
  const getKeyStyle = (state?: LetterState) => {
    const baseStyle = "min-w-8 h-12 font-semibold text-sm transition-all duration-200 hover:scale-105";
    
    if (isSpecial) {
      return cn(baseStyle, "min-w-16 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600");
    }
    
    switch (state) {
      case 'correct':
        return cn(baseStyle, "bg-green-500 hover:bg-green-600 text-white border-green-500");
      case 'present':
        return cn(baseStyle, "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500");
      case 'absent':
        return cn(baseStyle, "bg-gray-500 hover:bg-gray-600 text-white border-gray-500");
      default:
        return cn(baseStyle, "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600");
    }
  };

  const renderKeyContent = () => {
    if (letter === 'ENTER') {
      return <CornerDownLeft className="h-4 w-4" />;
    }
    if (letter === 'BACKSPACE') {
      return <Delete className="h-4 w-4" />;
    }
    return letter;
  };

  return (
    <Button
      variant="outline"
      className={getKeyStyle(state)}
      onClick={onClick}
      disabled={false}
    >
      {renderKeyContent()}
    </Button>
  );
}

export function Keyboard() {
  const { state, dispatch } = useGame();

  const handleKeyPress = (key: string) => {
    if (key === 'ENTER') {
      dispatch({ type: 'SUBMIT_GUESS' });
    } else if (key === 'BACKSPACE') {
      dispatch({ type: 'REMOVE_LETTER' });
    } else {
      dispatch({ type: 'ADD_LETTER', letter: key });
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1">
          {row.map((letter) => (
            <Key
              key={letter}
              letter={letter}
              state={state.keyboardState[letter as keyof typeof state.keyboardState]}
              isSpecial={letter === 'ENTER' || letter === 'BACKSPACE'}
              onClick={() => handleKeyPress(letter)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}