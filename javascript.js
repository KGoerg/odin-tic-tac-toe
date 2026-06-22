const gameBoard = (() => {
    const rows = 2;
    const columns = 2;
    let board = [];

    //Creates game board
    for (let i = 0; i <= rows; i++) {
        board[i] = [];
        for (let j = 0; j <= columns; j++) {
            board[i][j] = 0;
        }
    };

    const resetBoard = () => {
        for (let i = 0; i <= rows; i++) {
        for (let j = 0; j <= columns; j++) {
            board[i][j] = 0;
        }
    }
    return board;
    };

    let turnFailed = false;

return {board, resetBoard, turnFailed};
})();

//Create player and attach scorekeeping
function createPlayer (name) {
    const playerName = name;

    let score = 0;
    const getWinCount = () => score;
    const increaseWinCount = () => score++;

    return {playerName, getWinCount, increaseWinCount}
};

//DOM elements to get player names and push them to the backend
const submitButton = document.querySelector("#submit_button");

const playerOneTextbox = document.getElementById("player_one");
const playerTwoTextbox = document.getElementById("player_two");

let playerOneSubmission;
let playerTwoSubmission;

function getInputValues() {
    playerOneSubmission = playerOneTextbox.value;
    playerTwoSubmission = playerTwoTextbox.value;
}

const form = document.querySelector("form");
// Gets value of textboxes and runs createPlayer to create players 1 & 2. 
submitButton.addEventListener("click", () => {
    form.reportValidity();
    getInputValues();
    if (playerOneSubmission === "" || playerTwoSubmission === "") {
        alert("Please input player names.")
    } else {
    playerOne = createPlayer(playerOneSubmission);
    playerTwo = createPlayer(playerTwoSubmission);
    players = [
        {
            name: playerOneSubmission,
            marker: "X",
        },
        {
            name: playerTwoSubmission,
            marker: "O",
        }
    ];
    }
    activePlayer = players[0];
});

//These variables, upon Submit button click, hold the players' names and scores.
let playerOne;
let playerTwo;

//Additional player variables
let players = [];
let activePlayer;

//DOM elements to start playing game
const squareOne = document.getElementById("square-one");
const squareTwo = document.getElementById("square-two");
const squareThree = document.getElementById("square-three");
const squareFour = document.getElementById("square-four");
const squareFive = document.getElementById("square-five");
const squareSix = document.getElementById("square-six");
const squareSeven = document.getElementById("square-seven");
const squareEight = document.getElementById("square-eight");
const squareNine = document.getElementById("square-nine");

//DOM elements for grid buttons
squareOne.addEventListener("click", () => {
    let squareOneIndexOne = 0;
    let squareOneIndexTwo = 0;
    gameFlow(squareOneIndexOne, squareOneIndexTwo);
    console.log(gameBoard.board);
    squareOne.textContent = getActivePlayer().marker;
    switchPlayerTurn();
    squareOne.disabled = true;
});

squareTwo.addEventListener("click", () => {
    let squareTwoIndexOne = 0;
    let squareTwoIndexTwo = 1;
    gameFlow(squareTwoIndexOne, squareTwoIndexTwo);
    console.log(gameBoard.board);
    squareTwo.textContent = getActivePlayer().marker;
    switchPlayerTurn();
    squareTwo.disabled = true;
});

squareThree.addEventListener("click", () => {
    let squareThreeIndexOne = 0;
    let squareThreeIndexTwo = 2;
    gameFlow(squareThreeIndexOne, squareThreeIndexTwo);
    console.log(gameBoard.board);
    squareThree.textContent = getActivePlayer().marker;
    switchPlayerTurn();
    squareThree.disabled = true;
});

squareFour.addEventListener("click", () => {
    let squareFourIndexOne = 1;
    let squareFourIndexTwo = 0;
    gameFlow(squareFourIndexOne, squareFourIndexTwo);
    console.log(gameBoard.board);
    squareFour.textContent = getActivePlayer().marker;
    switchPlayerTurn();
    squareFour.disabled = true;
});

squareFive.addEventListener("click", () => {
    let squareFiveIndexOne = 1;
    let squareFiveIndexTwo = 1;
    gameFlow(squareFiveIndexOne, squareFiveIndexTwo);
    console.log(gameBoard.board);
    squareFive.textContent = getActivePlayer().marker;
    switchPlayerTurn();
    squareFive.disabled = true;
});

squareSix.addEventListener("click", () => {
    let squareSixIndexOne = 1;
    let squareSixIndexTwo = 2;
    gameFlow(squareSixIndexOne, squareSixIndexTwo);
    console.log(gameBoard.board);
    squareSix.textContent = getActivePlayer().marker;
    switchPlayerTurn();
    squareSix.disabled = true;
});

squareSeven.addEventListener("click", () => {
    let squareSevenIndexOne = 2;
    let squareSevenIndexTwo = 0;
    gameFlow(squareSevenIndexOne, squareSevenIndexTwo);
    console.log(gameBoard.board);
    squareSeven.textContent = getActivePlayer().marker;
    switchPlayerTurn();
    squareSeven.disabled = true;
});

squareEight.addEventListener("click", () => {
    let squareEightIndexOne = 2;
    let squareEightIndexTwo = 1;
    gameFlow(squareEightIndexOne, squareEightIndexTwo);
    console.log(gameBoard.board);
    squareEight.textContent = getActivePlayer().marker;
    switchPlayerTurn();
    squareEight.disabled = true;
});

squareNine.addEventListener("click", () => {
    let squareNineIndexOne = 2;
    let squareNineIndexTwo = 2;
    gameFlow(squareNineIndexOne, squareNineIndexTwo);
    console.log(gameBoard.board);
    squareNine.textContent = getActivePlayer().marker;
    switchPlayerTurn();
    squareNine.disabled = true;
});

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
    resetGame();
    console.log(gameBoard.board);
});

const switchPlayerTurn = () => {
    if (gameBoard.turnFailed === true) {
        console.log("Try again!");
    } else {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }
    return activePlayer;
};

const getActivePlayer = () => activePlayer;
const resetTurnNumber = () => turnNumber = 1;
let turnNumber = 1;

//Control turn order and rounds
function gameFlow(index1, index2) {

    const getTurnNumber = () => `Turn Number: ${turnNumber}`;
    const increaseTurnNumber = () => turnNumber++;

    const playerOneWins = `Player One: ${playerOne.playerName} wins!`;
    const playerTwoWins = `Player Two: ${playerTwo.playerName} wins!`;

    let confirmTie = false;

    let gameOverBoolean = false;

    function playerTurn() {
        let boardPosition = gameBoard.board[index1][index2];
        if (boardPosition === 0) {
            gameBoard.board[index1][index2] = getActivePlayer().marker;
            increaseTurnNumber();
            gameBoard.turnFailed = false;
        } else if (boardPosition !== 0) {
            gameBoard.turnFailed = true;
            console.log("You cannot select this space.");
        }
        };
    
    const getWinner = () => {
        //Determine Player One winner
        if (
            //First column down
            gameBoard.board[0][0] === "X" && gameBoard.board[1][0] === "X" && gameBoard.board[2][0] === "X" ||
            
            // Second column down
            gameBoard.board[0][1] === "X" && gameBoard.board[1][1] === "X" && gameBoard.board[2][1] === "X" ||
            
            //Third column down
            gameBoard.board[0][2] === "X" && gameBoard.board[1][2] === "X" && gameBoard.board[2][2] === "X" ||

            //First row across
            gameBoard.board[0][0] === "X" && gameBoard.board[0][1] === "X" && gameBoard.board[0][2] === "X" ||

            //Second row across
            gameBoard.board[1][0] === "X" && gameBoard.board[1][1] === "X" && gameBoard.board[1][2] === "X" ||

            //Third row across
            gameBoard.board[2][0] === "X" && gameBoard.board[2][1] === "X" && gameBoard.board[2][2] === "X" ||
        
            //Left to right diagonal
            gameBoard.board[0][0] === "X" && gameBoard.board[1][1] === "X" && gameBoard.board[2][2] === "X" ||
            
            //Right to left diagonal
            gameBoard.board[0][2] === "X" && gameBoard.board[1][1] === "X" && gameBoard.board[2][0] === "X" ) {
            playerOne.increaseWinCount();
            gameFlow.gameOverBoolean = true;
            return `GAME OVER! ${playerOneWins}`;
        //Determine Player Two winner
        } else if (
            //First column down
            gameBoard.board[0][0] === "O" && gameBoard.board[1][0] === "O" && gameBoard.board[2][0] === "O" ||
            
            // Second column down
            gameBoard.board[0][1] === "O" && gameBoard.board[1][1] === "O" && gameBoard.board[2][1] === "O" ||
            
            //Third column down
            gameBoard.board[0][2] === "O" && gameBoard.board[1][2] === "O" && gameBoard.board[2][2] === "O" ||

                        //First row across
            gameBoard.board[0][0] === "O" && gameBoard.board[0][1] === "O" && gameBoard.board[0][2] === "O" ||

            //Second row across
            gameBoard.board[1][0] === "O" && gameBoard.board[1][1] === "O" && gameBoard.board[1][2] === "O" ||

            //Third row across
            gameBoard.board[2][0] === "O" && gameBoard.board[2][1] === "O" && gameBoard.board[2][2] === "O" ||
        
            //Left to right diagonal
            gameBoard.board[0][0] === "O" && gameBoard.board[1][1] === "O" && gameBoard.board[2][2] === "O" ||
        
            //Right to left diagonal
            gameBoard.board[0][2] === "O" && gameBoard.board[1][1] === "O" && gameBoard.board[2][0] === "O" ) {
            playerTwo.increaseWinCount();
            gameFlow.gameOverBoolean = true;
            return `GAME OVER! ${playerTwoWins}`;
        } else if (turnNumber === 10) {
            confirmTie = true;
            gameFlow.gameOverBoolean = true;
            return "It's a tie!";
        }
    };

    const declareGameOver = () => {
        if (gameFlow.gameOverBoolean === true) {
            console.log(`Player One Score: ${playerOne.getWinCount()}`);
            console.log(`Player Two Score: ${playerTwo.getWinCount()}`);
            disableSquares();
        }
    };
    console.log(getTurnNumber());
    console.log(playerTurn());
    console.log(getWinner());
    console.log(declareGameOver());
};

function disableSquares() {
    squareOne.disabled = true;
    squareTwo.disabled = true;
    squareThree.disabled = true;
    squareFour.disabled = true;
    squareFive.disabled = true;
    squareSix.disabled = true;
    squareSeven.disabled = true;
    squareEight.disabled = true;
    squareNine.disabled = true;
}

function reEnableSquares() {
    squareOne.disabled = false;
    squareTwo.disabled = false;
    squareThree.disabled = false;
    squareFour.disabled = false;
    squareFive.disabled = false;
    squareSix.disabled = false;
    squareSeven.disabled = false;
    squareEight.disabled = false;
    squareNine.disabled = false;
}

function resetSquareText() {
    squareOne.textContent = "";
    squareTwo.textContent = "";
    squareThree.textContent = "";
    squareFour.textContent = "";
    squareFive.textContent = "";
    squareSix.textContent = "";
    squareSeven.textContent = "";
    squareEight.textContent = "";
    squareNine.textContent = "";
}

function resetGame() {
    gameBoard.resetBoard();
    if (resetTurnNumber() === 1) {
        activePlayer = players[0];
        resetSquareText();
        reEnableSquares();
    }
    gameFlow.gameOverBoolean = false;
};