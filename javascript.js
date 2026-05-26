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

    const playerTurn = (index1, index2) => {
        let boardPosition = gameBoard.board[index1][index2];
        if (boardPosition === 0) {
            board[index1][index2] = gameFlow.getActivePlayer().marker;
            gameFlow.increaseTurnNumber();
            gameBoard.turnFailed = false;
        } else if (boardPosition !== 0) {
            gameBoard.turnFailed = true;
            console.log("You cannot select this space.");
        }
        };

return {board, resetBoard, turnFailed, playerTurn};
})();

//Create player and attach scorekeeping
function createPlayer (name) {
    const playerName = name;

    let score = 0;
    const getWinCount = () => score;
    const increaseWinCount = () => score++;

    return {playerName, getWinCount, increaseWinCount}
};

const playerOne = createPlayer("Kamie");
const playerTwo = createPlayer("Aaron");

//Control turn order and rounds
const gameFlow = (() => {

    const playerOneName = `Player One: ${playerOne.playerName}`;
    const playerTwoName = `Player Two: ${playerTwo.playerName}`;

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

    let activePlayer = players[0];

    console.log(gameBoard.turnFailed);

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
    const noWinnerYet = "No winner yet!";

    let gameOverBoolean = false;
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
            return playerOneWins;
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
            return playerTwoWins;
        } else {
            return noWinnerYet;
        }
    };

    const confirmTie = "It's a tie!";
    const confirmWinner = "We have a winner!";
    const cannotCheckTie = "Cannot check for a tie yet."
    const gameOver = "GAME OVER!"

    const checkTie = () => {
        if (turnNumber === 10 && getWinner() === noWinnerYet) {
            gameFlow.gameOverBoolean = true;
            playerOne.getWinCount();
            playerTwo.getWinCount();
            return confirmTie;
        } else if (turnNumber === 10 && getWinner() === playerOneWins || getWinner() === playerTwoWins) {
            return confirmWinner;
        } else {
            return cannotCheckTie;
        }
        };

    const declareGameOver = () => {
        if (gameFlow.gameOverBoolean === true) {
            console.log(gameOver);
        }
    };

    const resetGame = () => {
        gameBoard.resetBoard();
        if (resetTurnNumber() === 1) {
            activePlayer = players[0];
        }
        gameFlow.gameOverBoolean = false;
    }
    
    return {switchPlayerTurn, getActivePlayer, getTurnNumber, increaseTurnNumber, getWinner, checkTie, declareGameOver, resetGame};
})();

//Testing playing the game. This is a tie:
// Turn 1 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// console.log(gameBoard.playerTurn(0,1));
// console.log(gameBoard.board);
// console.log(gameFlow.checkTie());
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // //Turn 2 O
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// console.log(gameBoard.playerTurn(0,1));
// console.log(gameBoard.board);
// console.log(gameFlow.checkTie());
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();
// console.log(gameBoard.turnFailed);

// // // // // //Turn 2 (Again) O
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// console.log(gameBoard.playerTurn(1,0));
// console.log(gameBoard.board);
// console.log(gameFlow.checkTie());
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // // // // //Turn 3 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// console.log(gameBoard.playerTurn(0,2));
// console.log(gameBoard.board);
// console.log(gameFlow.checkTie());
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // // // // // //Turn 4 O
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// console.log(gameBoard.playerTurn(1,1));
// console.log(gameBoard.board);
// console.log(gameFlow.checkTie());
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // // // // //Turn 5 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// console.log(gameBoard.playerTurn(1,2));
// console.log(gameBoard.board);
// console.log(gameFlow.checkTie());
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // // // // //Turn 6 O
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// console.log(gameBoard.playerTurn(2,0));
// console.log(gameBoard.board);
// console.log(gameFlow.checkTie());
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // // // // //Turn 7 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// console.log(gameBoard.playerTurn(2,1));
// console.log(gameBoard.board);
// console.log(gameFlow.checkTie());
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // // // //Turn 8 O
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// console.log(gameBoard.playerTurn(2,2));
// console.log(gameBoard.board);
// console.log(gameFlow.checkTie());
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // // // //Turn 9 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// console.log(gameBoard.playerTurn(0,0));
// console.log(gameBoard.board);
// console.log(gameFlow.checkTie());
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// console.log(playerOne.getWinCount());

// // //Turn 1 X
console.log(gameFlow.getTurnNumber());
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(0,1);
console.log(gameBoard.board);
console.log(gameFlow.checkTie());
console.log(gameFlow.getWinner());
console.log(gameFlow.declareGameOver());
gameFlow.switchPlayerTurn();
console.log(playerOne.getWinCount());

// // //Turn 2 O
console.log(gameFlow.getTurnNumber());
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(0,0);
console.log(gameBoard.board);
console.log(gameFlow.checkTie());
console.log(gameFlow.getWinner());
console.log(gameFlow.declareGameOver());
gameFlow.switchPlayerTurn();
console.log(playerOne.getWinCount());

// Turn 3 X
console.log(gameFlow.getTurnNumber());
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(1,1);
console.log(gameBoard.board);
console.log(gameFlow.checkTie());
console.log(gameFlow.getWinner());
console.log(gameFlow.declareGameOver());
gameFlow.switchPlayerTurn();
console.log(playerOne.getWinCount());

// Turn 4 O
console.log(gameFlow.getTurnNumber());
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(1,0);
console.log(gameBoard.board);
console.log(gameFlow.checkTie());
console.log(gameFlow.getWinner());
console.log(gameFlow.declareGameOver());
gameFlow.switchPlayerTurn();
console.log(playerOne.getWinCount());

// Turn 5 X
console.log(gameFlow.getTurnNumber());
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(1,0);
console.log(gameBoard.board);
console.log(gameFlow.checkTie());
console.log(gameFlow.getWinner());
console.log(gameFlow.declareGameOver());
gameFlow.switchPlayerTurn();
console.log(playerOne.getWinCount());

// Turn 5 (Again) X
console.log(gameFlow.getTurnNumber());
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(2,1);
console.log(gameBoard.board);
console.log(gameFlow.checkTie());
console.log(gameFlow.getWinner());
console.log(gameFlow.declareGameOver());
gameFlow.switchPlayerTurn();

//Need to fix checkTie so that it doesn't run getWinner, which is causing the score to increase.
console.log(playerOne.getWinCount());
// console.log(gameFlow.checkTie());
console.log(gameFlow.getWinner());
console.log(gameFlow.declareGameOver());
console.log(playerOne.getWinCount());



// gameFlow.resetGame();

// // Turn 1 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(2,1);
// console.log(gameBoard.board);
// console.log(gameFlow.checkTie());
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // Turn 2 O
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(2,2);
// console.log(gameBoard.board);
// console.log(gameFlow.checkTie());
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // Turn 3 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(0,2);
// console.log(gameBoard.board);
// console.log(gameFlow.checkTie());
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // Turn 4 O
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(1,1);
// console.log(gameBoard.board);
// console.log(gameFlow.checkTie());
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // Turn 5 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(2,0);
// console.log(gameBoard.board);
// console.log(gameFlow.checkTie());
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// // Turn 6 O
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(0,0);
// console.log(gameBoard.board);
// console.log(gameFlow.checkTie());
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();

// gameFlow.resetGame();

// // Turn 1 X
// console.log(gameFlow.getTurnNumber());
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(0,0);
// console.log(gameBoard.board);
// console.log(gameFlow.checkTie());
// console.log(gameFlow.getWinner());
// console.log(gameFlow.declareGameOver());
// gameFlow.switchPlayerTurn();