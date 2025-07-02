"use client";

import { useEffect, useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Header } from './Header';
import { GameGrid } from './GameGrid';
import { Keyboard } from './Keyboard';


import { GameStatus } from './GameStatus'; 

export function Game() {
  const { state, dispatch } = useGame();
  const [showCongrats, setShowCongrats] = useState(false);

  const isWon = state.gameStatus === 'won';
  const isLost = state.gameStatus === 'lost';

  useEffect(() => {
    if (isWon || isLost) {
      setShowCongrats(true);
    } else {
      setShowCongrats(false);
    }
  }, [isWon, isLost]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      
      if (state.gameStatus !== 'playing' && key !== 'ENTER') {
        return; 
      }

      if (key === 'ENTER') {
        if (isWon || isLost) {
          dispatch({ type: 'RESET_GAME' });
          setShowCongrats(false); 
        } else {
          dispatch({ type: 'SUBMIT_GUESS' });
        }
      } else if (key === 'BACKSPACE') {
        dispatch({ type: 'REMOVE_LETTER' });
      } else if (/^[A-Z]$/.test(key)) {
        dispatch({ type: 'ADD_LETTER', letter: key });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [dispatch, isWon, isLost, state.gameStatus]); 

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-lg">
        <GameGrid />
        <Keyboard />
      </main>
      

      <GameStatus
        isOpen={showCongrats}
        onClose={() => setShowCongrats(false)}
      />
    </div>
  );
}