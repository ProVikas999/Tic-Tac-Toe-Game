const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const lightModeBtn = document.getElementById('lightMode');
const darkModeBtn = document.getElementById('darkMode');
let darkModeActive = false;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('id'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  checkGameStatus();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkGameStatus() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      gameActive = false;
      statusDisplay.textContent = `Player ${gameState[a]} won!`;
      return;
    }
  }

  if (!gameState.includes('')) {
    gameActive = false;
    statusDisplay.textContent = "It's a tie!";
  }
}

function handleReset() {
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  statusDisplay.textContent = '';
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}

// Event listeners for light and dark mode buttons
lightModeBtn.addEventListener('click', () => {
  document.body.classList.remove('dark-mode');
  darkModeActive = false;
});

darkModeBtn.addEventListener('click', () => {
  document.body.classList.add('dark-mode');
  darkModeActive = true;
});

// Event listener for cell clicks
board.addEventListener('click', handleCellClick);

// Event listener for reset button
resetBtn.addEventListener('click', handleReset);
