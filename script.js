const ROWS = 6 ;
const COLS = 7;
const WIN_LENGTH = 4 ;

const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1]
];

let board = [];
let currentPlayer = 1 ;
let gameOver = false;

const boardEl = document.getElementById('board');
const player1El = document.getElementById('player-1');
const player2El = document.getElementById('player-2');
const statusText = document.getElementById('status-text');
const restartBtn = document.getElementById('restart-btn') ;


initGame();


function initGame() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  currentPlayer = 1;
  gameOver = false ;
  statusText.textContent = '' ;
  restartBtn.style.display = 'none';

  updateTurnIndicator();
  renderBoard();
}

function renderBoard() {
  boardEl.innerHTML = '';

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      cell.addEventListener('click', () => dropDisc(c));

      boardEl.appendChild(cell) ;
    }
  }
}

function dropDisc(col) {
  if (gameOver) return;

  let row = -1 ;
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r][col] === 0) {
      row = r;
      break ;
    }
  }

  if (row === -1) return;

  board[row][col] = currentPlayer ;
  updateCell(row, col, currentPlayer);

  const winningCells = findWinningCells(board, row, col);
  if (winningCells) {
    gameOver = true ;
    statusText.textContent = `PLAYER ${currentPlayer} wins!`;
    restartBtn.style.display = 'inline-block';
    highlightWinningCells(winningCells);
    return;
  }

  if (checkDraw()) {
    gameOver = true;
    statusText.textContent = "It's a draw!" ;
    restartBtn.style.display = 'inline-block';
    return;
  }

  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateTurnIndicator();
}

function updateCell(row, col, player) {
  const index = row * COLS + col;
  const cell = boardEl.children[index];

  if (player === 1) {
    cell.textContent = 'O';
    cell.classList.add('o');
  } else {
    cell.textContent = 'X' ;
    cell.classList.add('x');
  }
}

function highlightWinningCells(cells) {
  for (const [r, c] of cells) {
    const index = r * COLS + c;
    boardEl.children[index].classList.add('is-winning') ;
  }
}

function findWinningCells(grid, row, col) {
  const player = grid[row][col];

  for (const [dr, dc] of DIRECTIONS) {
    const cells = [[row, col]];

    for (const sign of [1, -1]) {
      let r = row + dr * sign;
      let c = col + dc * sign;

      while (grid[r]?.[c] === player) {
        cells.push([r, c]);
        r += dr * sign;
        c += dc * sign ;
      }
    }

    if (cells.length >= WIN_LENGTH) return cells ;
  }

  return null ;
}

function checkDraw() {
  return board[0].every(cell => cell !== 0);
}

function updateTurnIndicator() {
  if (currentPlayer === 1) {
    player1El.classList.add('is-active');
    player2El.classList.remove('is-active');
  } else {
    player2El.classList.add('is-active') ;
    player1El.classList.remove('is-active');
  }
}


restartBtn.addEventListener('click', initGame);