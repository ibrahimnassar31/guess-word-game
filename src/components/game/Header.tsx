"use client";

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { HelpCircle, RotateCcw } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';

export function Header() {
  const { dispatch } = useGame();

  const handleReset = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 mb-6">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          WordGuess
        </h1>
        
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="bg-amber-400  hover:bg-amber-500 shadow-md">
                <HelpCircle className="h-5 w-5 text-white font-bold text-3xl" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>How to Play</DialogTitle>
                <DialogDescription className="space-y-3 text-left">
                  <p>Guess the 6-letter word in 6 attempts.</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold text-sm">
                        A
                      </div>
                      <span>Green: Letter is correct and in the right position</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center text-white font-bold text-sm">
                        B
                      </div>
                      <span>Yellow: Letter is in the word but wrong position</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-500 rounded flex items-center justify-center text-white font-bold text-sm">
                        C
                      </div>
                      <span>Gray: Letter is not in the word</span>
                    </div>
                  </div>
                  <p>Type your guess and press Enter to submit!</p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" size="icon" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 text-yellow-600" />
          </Button>
        </div>
      </div>
    </header>
  );
}