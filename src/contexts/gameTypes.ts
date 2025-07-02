export type LetterState = 'correct' | 'present' | 'absent' | 'empty';

export interface Letter {
  char: string;
  state: LetterState;
}

export interface GameState {
  currentWord: string;
  guesses: Letter[][];
  currentGuess: number;
  currentPosition: number;
  gameStatus: 'playing' | 'won' | 'lost';
  keyboardState: Record<string, LetterState>;
  lastWinInfo?: {
    tries: number;
    word: string;
  };
}

export type GameAction =
  | { type: 'ADD_LETTER'; letter: string }
  | { type: 'REMOVE_LETTER' }
  | { type: 'SUBMIT_GUESS' }
  | { type: 'RESET_GAME' }
  | { type: 'SET_GAME_STATUS'; status: 'playing' | 'won' | 'lost' };
