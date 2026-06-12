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

// const playerOne = createPlayer("Kamie");
// const playerTwo = createPlayer("Aaron");

let playerOne;
let playerTwo;

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

// Gets value of textboxes and runs createPlayer to create players 1 & 2. PROBLEM: Stores playerOne and playerTwo in the eventlistener and does not update the variables in the global scope.
submitButton.addEventListener("click", () => {
    getInputValues();
    playerOne = createPlayer(playerOneSubmission);
    playerTwo = createPlayer(playerTwoSubmission);
});


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

//I need to tie each square to the board array so that playerTurn can get the index of the space on the board.
squareOne.addEventListener("click", () => {
    let squareOneIndexOne = 0;
    let squareOneIndexTwo = 0;
    //Need to figure out how get playerTurn working correctly, since it accesses functions that used to be in gameFlow and no longer work correctly because they're out of scope?
    gameFlow(squareOneIndexOne, squareOneIndexTwo);
});


//Control turn order and rounds
//This doesn't need to be an IIFE.
function gameFlow(index1, index2) {

    //Names players
    const playerOneName = `Player One: ${playerOne.playerName}`;
    const playerTwoName = `Player Two: ${playerTwo.playerName}`;

    //Gives players their names and markers
    const players = [
        {
            name: playerOneName,
            marker: "X",
        },
        {
            name: playerTwoName,
            marker: "O",
        }
    ];

    //Switches player turn
    let activePlayer = players[0];
    const switchPlayerTurn = () => {
        if (gameBoard.turnFailed === true) {
            console.log("Try again!");
        } else {
            activePlayer = activePlayer === players[0] ? players[1] : players[0]
        }
    };

    const getActivePlayer = () => activePlayer;

    let turnNumber = 1;
    const getTurnNumber = () => `Turn Number: ${turnNumber}`;
    const increaseTurnNumber = () => turnNumber++;
    const resetTurnNumber = () => turnNumber = 1;

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
        }
    };
    console.log(getTurnNumber());
    console.log(getActivePlayer())
    console.log(playerTurn());
    console.log(getWinner());
    console.log(declareGameOver());
    console.log(switchPlayerTurn());
};


function resetGame() {
    gameBoard.resetBoard();
    if (resetTurnNumber() === 1) {
        activePlayer = players[0];
    }
    gameFlow.gameOverBoolean = false;
};









//Testing playing the game. This is a tie:
// Turn 1 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// console.log(gameBoard.playerTurn(0,1));
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // //Turn 2 O
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// console.log(gameBoard.playerTurn(0,1));
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();
// console.log(gameBoard.turnFailed);

// // // // // //Turn 2 (Again) O
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// console.log(gameBoard.playerTurn(1,0));
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // // // // //Turn 3 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// console.log(gameBoard.playerTurn(0,2));
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // // // // // //Turn 4 O
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// console.log(gameBoard.playerTurn(1,1));
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // // // // //Turn 5 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// console.log(gameBoard.playerTurn(1,2));
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // // // // //Turn 6 O
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// console.log(gameBoard.playerTurn(2,0));
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // // // // //Turn 7 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// console.log(gameBoard.playerTurn(2,1));
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // // // //Turn 8 O
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// console.log(gameBoard.playerTurn(2,2));
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // // // //Turn 9 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// console.log(gameBoard.playerTurn(0,0));
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// console.log(playerOne.getWinCount());

// // // //Turn 1 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(0,1);
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // // //Turn 2 O
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(0,0);
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // Turn 3 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(1,1);
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // Turn 4 O
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(1,0);
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // Turn 5 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(1,0);
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // Turn 5 (Again) X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(2,1);
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// gameFlow.resetGame();

// // Turn 1 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(2,1);
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // // Turn 2 O
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(2,2);
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // // Turn 3 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(0,2);
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // Turn 4 O
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(1,1);
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // Turn 5 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(2,0);
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // Turn 6 O
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(1,2);
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // Turn 7 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(1,0);
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // Turn 8 O
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(0,1);
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // Turn 9 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(0,0);
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// gameFlow.resetGame();

// // // Turn 1 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(0,0);
// console.log(gameBoard.board);
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();