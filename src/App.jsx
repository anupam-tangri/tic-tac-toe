import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver';

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  let activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = deriveGameBoard(gameTurns);
  let winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleActivePlayerChange(rowIndex, colIndex) {
    setGameTurns((oldGameTurns) => {
      let currentPlayer = deriveActivePlayer(oldGameTurns);
      const updatedGameTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...oldGameTurns,
      ];
      return updatedGameTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
    // setPlayers(PLAYERS);
    console.log('restarting game...');
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            initialName={PLAYERS.X}
            symbol='X'
            isActive={activePlayer === 'X'}
            onPlayerNameChange={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol='O'
            isActive={activePlayer === 'O'}
            onPlayerNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard
          onSelectSquare={handleActivePlayerChange}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
