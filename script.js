const boardElement = document.getElementById("board");
const statusText = document.getElementById("status");

let selectedSquare = null;
let turn = "white";

const pieces = {
  r: "♜", n: "♞", b: "♝", q: "♛", k: "♚", p: "♟",
  R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔", P: "♙"
};

let board = [
  "rnbqkbnr",
  "pppppppp",
  "........",
  "........",
  "........",
  "........",
  "PPPPPPPP",
  "RNBQKBNR"
];

function drawBoard() {
  boardElement.innerHTML = "";

  board.forEach((row, r) => {
    [...row].forEach((cell, c) => {
      const square = document.createElement("div");
      square.className = `square ${(r + c) % 2 === 0 ? "white" : "black"}`;
      square.dataset.row = r;
      square.dataset.col = c;

      if (cell !== ".") {
        square.textContent = pieces[cell];
      }

      square.addEventListener("click", () => onSquareClick(square));
      boardElement.appendChild(square);
    });
  });
}

function onSquareClick(square) {
  const r = square.dataset.row;
  const c = square.dataset.col;
  const piece = board[r][c];

  if (selectedSquare) {
    movePiece(selectedSquare, square);
    clearSelection();
  } else if (piece !== "." && isCorrectTurn(piece)) {
    selectedSquare = square;
    square.classList.add("selected");
  }
}

function movePiece(from, to) {
  const fr = from.dataset.row;
  const fc = from.dataset.col;
  const tr = to.dataset.row;
  const tc = to.dataset.col;

  const piece = board[fr][fc];

  board[tr] =
    board[tr].substring(0, tc) +
    piece +
    board[tr].substring(+tc + 1);

  board[fr] =
    board[fr].substring(0, fc) +
    "." +
    board[fr].substring(+fc + 1);

  turn = turn === "white" ? "black" : "white";
  statusText.textContent = `${turn.charAt(0).toUpperCase() + turn.slice(1)}'s Turn`;

  drawBoard();
}

function clearSelection() {
  document.querySelectorAll(".selected").forEach(s => s.classList.remove("selected"));
  selectedSquare = null;
}

function isCorrectTurn(piece) {
  return turn === "white" ? piece === piece.toUpperCase() : piece === piece.toLowerCase();
}

drawBoard();
