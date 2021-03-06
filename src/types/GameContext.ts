interface GameOver {
  winner: number;
}

interface Random {
  D6: () => number;
}

interface Events {
  endTurn: () => void;
}

export interface GameContext {
  numPlayers: number;
  turn: number;
  currentPlayer: number;
  gameOver?: GameOver;
  random: Random;
  events: Events;
}
