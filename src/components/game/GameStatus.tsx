"use client";

import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Trophy, X } from 'lucide-react';

interface GameStatusProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GameStatus({ isOpen, onClose }: GameStatusProps) {
  const { state, dispatch } = useGame();

  const handlePlayAgain = () => {
    dispatch({ type: 'RESET_GAME' });
    onClose(); 
  };


  const isWon = state.gameStatus === 'won';
  const isLost = state.gameStatus === 'lost'; 

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose} aria-label={isWon ? 'Congratulations Dialog' : 'Game Over Dialog'}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isWon ? (
              <>
                <Trophy className="h-6 w-6 text-yellow-500" aria-hidden="true" />
                <span>Congratulations!</span>
              </>
            ) : (
              <>
                <X className="h-6 w-6 text-red-500" aria-hidden="true" />
                <span>Game Over</span>
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-center space-y-4">
            <section aria-live="polite">
              {isWon ? (
                <>
                  <p className="text-lg font-semibold text-green-600">
                    You guessed the word in {state.lastWinInfo?.tries ?? state.currentGuess} {state.lastWinInfo?.tries === 1 ? 'try' : 'attempts'}!
                  </p>
                  <p className="text-base">
                    The word was{' '}
                    <strong className="text-lg font-bold text-primary">{state.lastWinInfo?.word || state.currentWord || 'Unknown'}</strong>
                  </p>
                </>
              ) : (
                <p className="text-lg font-semibold text-red-600">
                  The word was{' '}
                  <strong className="text-lg font-bold text-primary">{state.currentWord}</strong>
                </p>
              )}
            </section>
            <div className="pt-4">
              <Button onClick={handlePlayAgain} className="w-full" autoFocus>
                Play Again
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}