const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;
const winningPositions = [
    [0, 1, 2],    //horizontal
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],    //vertical
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],    //diagonal
    [2, 4, 6]
];

//initialize game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];    //all grids are empty in starting

    //updating UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index + 1}`;
    });

    newGameBtn.classList.remove("active");

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    });
});

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;   //update UI
        gameGrid[index] = currentPlayer;  //update gameGrid

        boxes[index].style.pointerEvents = "none";

        swapTurn();

        //check for win
        checkGameOver();
    }
}

function swapTurn() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    }
    else {
        currentPlayer = 'X';
    }

    //Update UI
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty & should have exactly same values
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            //checking who is the winner
            if (gameGrid[position[0]] === 'X') {
                answer = 'X';
            }
            else {
                answer = 'O';
            }

            //disable pointer events (We already have a winner)
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            //marking green background on boxes
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    //update UI
    if (answer !== "") {    //means we have a winner
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add('active');
        return;
    }

    //Winner not found, checking for a tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    });

    //board completely filled means game tied
    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
}

newGameBtn.addEventListener('click', initGame);