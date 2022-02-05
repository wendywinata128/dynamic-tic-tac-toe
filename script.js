let isPlayerOne = true;
let playerOneMove = [];
let playerTwoMove = [];
let winCombination = [];
let endGame = false;
let lengthTicTacToe = 3;

generateWinningCombination();
generateBox();

document.getElementById(
  "container"
).style.gridTemplateColumns = `repeat(${lengthTicTacToe}, 1fr)`;

document
  .getElementById("lengthToe")
  .addEventListener("change", (e) => changeLengthTicTacToe(e));

function changeLengthTicTacToe(e) {
  playerOneMove = [];
  playerTwoMove = [];
  winCombination = [];
  endGame = false;
  isPlayerOne = false;
  lengthTicTacToe = e.target.value;
  generateWinningCombination();
  generateBox();

  document.getElementById(
    "container"
  ).style.gridTemplateColumns = `repeat(${lengthTicTacToe}, 1fr)`;

  changePlayer();
}

function generateWinningCombination() {
  const diagonalCombination = [];
  let counterDiagonal = -1;

  for (let i = 0; i < lengthTicTacToe; i++) {
    counterDiagonal++;
    for (let j = 0; j < lengthTicTacToe; j++) {
      if (i - j == 0) {
        if (diagonalCombination[0] == null) diagonalCombination[0] = [];
        diagonalCombination[0].push(`${i}${j}`);
      }
      if (i == counterDiagonal && j == lengthTicTacToe - counterDiagonal - 1) {
        if (diagonalCombination[1] == null) diagonalCombination[1] = [];
        diagonalCombination[1].push(`${i}${j}`);
      }

      if (winCombination[i] == null) winCombination[i] = [];
      winCombination[i].push(`${i}${j}`);

      if (winCombination[lengthTicTacToe + j] == null)
        winCombination[lengthTicTacToe + j] = [];
      winCombination[lengthTicTacToe + j].push(`${i}${j}`);
    }
  }

  winCombination = winCombination.concat(diagonalCombination);
}

function checkPossibleWin() {
  const result = isPlayerOne
    ? winCombination.some((combination) => {
        return combination.every((val) => {
          return playerOneMove.includes(val);
        });
      })
    : winCombination.some((combination) => {
        return combination.every((val) => {
          return playerTwoMove.includes(val);
        });
      });

  if (result) {
    endGame = true;
    document.getElementById("moving-status").innerHTML = `<b>${
      isPlayerOne ? "Player One" : "Player Two"
    }</b> Win The Game`;
    return;
  }

  changePlayer();
}

function changePlayer() {
  isPlayerOne = !isPlayerOne;

  document.getElementById("moving-status").innerHTML = `<b>${
    isPlayerOne ? "Player One" : "Player Two"
  }</b> Turn To Moving .....`;
}

function generateBox() {
  const container = document.getElementById("container");
  container.innerHTML = "";

  for (let i = 0; i < lengthTicTacToe; i++) {
    for (let j = 0; j < lengthTicTacToe; j++) {
      const box = document.createElement("div");
      box.className = "box";

      box.addEventListener("click", () => {
        if (box.classList.contains("checked") || endGame) return;

        box.className = "box";
        box.classList.add("checked");
        box.classList.add(isPlayerOne ? "checked-o" : "checked-x");

        if (isPlayerOne) playerOneMove.push(`${i}${j}`);
        else playerTwoMove.push(`${i}${j}`);
        checkPossibleWin();
      });

      container.append(box);
    }
  }
}
