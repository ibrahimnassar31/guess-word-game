import { words } from '@/data/words.json';
import { GameState, GameAction } from './gameTypes';

export const initialState: GameState = {
  currentWord: '',
  guesses: Array(6).fill(null).map(() => Array(6).fill({ char: '', state: 'empty' })),
  currentGuess: 0,
  currentPosition: 0,
  gameStatus: 'playing',
  keyboardState: {},
  lastWinInfo: undefined,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ADD_LETTER': {
      if (state.currentPosition >= 6 || state.gameStatus !== 'playing') {
        return state;
      }
      const newGuesses = [...state.guesses];
      newGuesses[state.currentGuess][state.currentPosition] = {
        char: action.letter,
        state: 'empty',
      };
      return {
        ...state,
        guesses: newGuesses,
        currentPosition: state.currentPosition + 1,
      };
    }
    case 'REMOVE_LETTER': {
      if (state.currentPosition <= 0 || state.gameStatus !== 'playing') {
        return state;
      }
      const newGuesses = [...state.guesses];
      newGuesses[state.currentGuess][state.currentPosition - 1] = {
        char: '',
        state: 'empty',
      };
      return {
        ...state,
        guesses: newGuesses,
        currentPosition: state.currentPosition - 1,
      };
    }
    case 'SUBMIT_GUESS': {
      if (state.currentPosition !== 6 || state.gameStatus !== 'playing') {
        return state;
      }
      const currentGuess = state.guesses[state.currentGuess];
      const guessWord = currentGuess.map(letter => letter.char).join('');
      const newGuesses = [...state.guesses];
      const newKeyboardState = { ...state.keyboardState };
      const wordLetters = state.currentWord.split('');
      const guessLetters = guessWord.split('');
      const letterCounts = wordLetters.reduce((acc, letter) => {
        acc[letter] = (acc[letter] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      guessLetters.forEach((letter, index) => {
        if (letter === wordLetters[index]) {
          newGuesses[state.currentGuess][index].state = 'correct';
          newKeyboardState[letter] = 'correct';
          letterCounts[letter]--;
        }
      });
      guessLetters.forEach((letter, index) => {
        if (newGuesses[state.currentGuess][index].state === 'empty') {
          if (letterCounts[letter] > 0) {
            newGuesses[state.currentGuess][index].state = 'present';
            if (newKeyboardState[letter] !== 'correct') {
              newKeyboardState[letter] = 'present';
            }
            letterCounts[letter]--;
          } else {
            newGuesses[state.currentGuess][index].state = 'absent';
            if (!newKeyboardState[letter]) {
              newKeyboardState[letter] = 'absent';
            }
          }
        }
      });
      const isWon = guessWord === state.currentWord;
      const isLost = state.currentGuess === 5 && !isWon;
      return {
        ...state,
        guesses: newGuesses,
        currentGuess: state.currentGuess + 1,
        currentPosition: 0,
        gameStatus: isWon ? 'won' : isLost ? 'lost' : 'playing',
        keyboardState: newKeyboardState,
        lastWinInfo: isWon
          ? {
              tries: state.currentGuess + 1,
              word: state.currentWord,
            }
          : state.lastWinInfo,
      };
    }
    case 'RESET_GAME': {
      const newWord = words[Math.floor(Math.random() * words.length)];
      return {
        ...initialState,
        currentWord: newWord,
        guesses: Array(6).fill(null).map(() => Array(6).fill({ char: '', state: 'empty' })),
        lastWinInfo: undefined,
      };
    }
    case 'SET_GAME_STATUS': {
      return {
        ...state,
        gameStatus: action.status,
      };
    }
    default:
      return state;
  }
}
