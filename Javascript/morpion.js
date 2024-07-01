
const playerOne = "X";
const playerTwo = "O";
let playerOneTurn = true;
let cpuModeEnabled = false;

const divContainer = document.querySelector('#tableauMorpion');
const winFinal = document.querySelector('winFinal');
const gameStatusElement = document.getElementById('gameStatus');
const endGameStatusElement = document.getElementById('endGameStatus');
const restartButton = document.getElementById('restart');
const playCpuButton = document.getElementById('playCpu'); // Bouton pour activer le mode CPU
const game = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];

function playGame(cell, rowIndex, colIndex) {
    if (game[rowIndex][colIndex] !== "" || endGameStatusElement.innerHTML !== "") {
        return; //Si les cellules sont prises ou le jeu deja fini 
    }
// jeu entre 2 joueurs lambda 
    if (playerOneTurn) {
        cell.innerHTML = playerOne;
        game[rowIndex][colIndex] = playerOne;
        checkWin(playerOne);
        gameStatus(playerOne);
    } else {
        cell.innerHTML = playerTwo;
        game[rowIndex][colIndex] = playerTwo;
        checkWin(playerTwo);
        gameStatus(playerTwo);
    }
// player one turn ! de autre player turn 
    playerOneTurn = !playerOneTurn;
// 
    if (cpuModeEnabled && !playerOneTurn && endGameStatusElement.innerHTML === "") {
        setTimeout(cpuMove, 500);
    }
}

function cpuMove() {
    if (endGameStatusElement.innerHTML !== "") {
        return; // Game is already over, do nothing
    }

    let emptyCells = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (game[i][j] === "") {
                emptyCells.push({ rowIndex: i, colIndex: j });
            }
        }
    }

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const { rowIndex, colIndex } = emptyCells[randomIndex];
        const cell = divContainer.children[rowIndex].children[colIndex];
        playGame(cell, rowIndex, colIndex);
        playerOneTurn = true; // Update playerOneTurn to switch back to human player
    }
}

function checkWin(player) {
    console.log(game);

    for (let i = 0; i < 3; i++) {
        if (game[i][0] !== "" && game[i][0] === game[i][1] && game[i][1] === game[i][2]) {
            endGameStatusElement.innerHTML = `Le joueur ${player} a gagné !`;
        }
        if (game[0][i] === player && game[1][i] === player && game[2][i] === player) {
            endGameStatusElement.innerHTML = `Le joueur ${player} a gagné !`;
        }
    }
    if (game[0][0] !== "" && game[0][0] === game[1][1] && game[1][1] === game[2][2]) {
        endGameStatusElement.innerHTML = `Le joueur ${player} a gagné !`;
    }
    if (game[0][2] !== "" && game[0][2] === game[1][1] && game[1][1] === game[2][0]) {
        endGameStatusElement.innerHTML = `Le joueur ${player} a gagné !`;
    }

    // Verification du match nul
    let draw = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (game[i][j] === "") {
                draw = false;
            }
        }
    }
    if (draw && endGameStatusElement.innerHTML === "") {
        endGameStatusElement.innerHTML = "Egalité personne n'a gagné !";
    }
}

function gameStatus(player) {
    let statusText = "";
    if (player === playerOne) {
        statusText = "Au tour du joueur O de jouer ! ";
    } else {
        statusText = "Au tour du joueur X de jouer ! ";
    }
    gameStatusElement.innerHTML = statusText;
}

function createGrid() {
    game.forEach((row, rowIndex) => {
        let divRow = document.createElement('div');
        divRow.classList.add("row");
        row.forEach((cell, colIndex) => {
            let divCell = document.createElement('div');
            divCell.classList.add("cell");
            divCell.addEventListener('click', () => {
                if (cpuModeEnabled && !playerOneTurn) {
                    return; // Prevent user from playingwhen CPU is playing
                }
                playGame(divCell, rowIndex, colIndex);
            });
            divRow.appendChild(divCell);
        });
        divContainer.appendChild(divRow);
    });
}

function restartGame() {
    game.forEach((row, rowIndex) => {
        row.forEach((_cell, colIndex) => {
            game[rowIndex][colIndex] = "";
            divContainer.children[rowIndex].children[colIndex].innerHTML = "";
        });
    });
    endGameStatusElement.innerHTML = "";
    gameStatusElement.innerHTML = "Au tour du joueur X de jouer! ";
    playerOneTurn = true;
}

playCpuButton.addEventListener('click', () => {
    cpuModeEnabled =!cpuModeEnabled;
    if (cpuModeEnabled) {
        playCpuButton.innerHTML = "Désactiver le mode CPU";
    } else {
        playCpuButton.innerHTML = "Activer le mode CPU";
    }
});

restartButton.addEventListener('click', restartGame);

createGrid();