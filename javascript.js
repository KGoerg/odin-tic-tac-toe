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

    const playerTurn = (index1, index2) => {
        let boardPosition = gameBoard.board[index1][index2];
        if (boardPosition === 0) {
            board[index1][index2] = gameFlow.getActivePlayer().marker;
        } else if (boardPosition !== 0) {
            console.log("You cannot select this space.");
        }
        };
    
    let gameResult;

return {board, resetBoard, playerTurn};
})();

//Create player and attach scorekeeping
function createPlayer (name) {
    const playerName = name;

    let score = 0;
    const getWinCount = () => score;
    const increaseWinCount = () => {score++;};

    return {playerName, getWinCount, increaseWinCount}
};

const playerOne = createPlayer("Kamie");
const playerTwo = createPlayer("Aaron");
playerOne.increaseWinCount();
playerOne.increaseWinCount();
console.log(playerOne.getWinCount())

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

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    let turnNumber = 1;
    const getTurnNumber = () => `Turn Number: ${turnNumber}`;
    const increaseTurnNumber = () => turnNumber++;

    const playerOneWins = `Player One: ${playerOne.playerName} wins!`;
    const playerTwoWins = `Player Two: ${playerTwo.playerName} wins!`;
    const noWinnerYet = "No winner yet!";
//Working on a "getWinner" function to announce the winner. Might want to use array.every method.
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
            return playerTwoWins;
        } else {
            return noWinnerYet;
        }
    };

    const checkTie = () => {
        if (turnNumber === 9 && getWinner() === noWinnerYet) {
            return "It's a tie!";
        } else if (turnNumber === 9 && getWinner() === playerOneWins || getWinner() === playerTwoWins) {
            return "We have a winner!";
        } else {
            return "Cannot check for a tie yet."
        }
        };
    
    return {switchPlayerTurn, getActivePlayer, getTurnNumber, increaseTurnNumber, getWinner, checkTie};
})();

//Testing playing the game. This is a tie:
//Turn 1 X
console.log(gameFlow.getTurnNumber());
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(0,1);
console.log(gameBoard.board);
console.log(gameFlow.getWinner());

//Turn 2 O
gameFlow.switchPlayerTurn();
gameFlow.increaseTurnNumber();
console.log(gameFlow.getTurnNumber());
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(0,0);
console.log(gameBoard.board);
console.log(gameFlow.getWinner());

//Turn 3 X
gameFlow.switchPlayerTurn();
gameFlow.increaseTurnNumber();
console.log(gameFlow.getTurnNumber());
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(1,0);
console.log(gameBoard.board);
console.log(gameFlow.getWinner());

//Turn 4 O
gameFlow.switchPlayerTurn();
gameFlow.increaseTurnNumber();
console.log(gameFlow.getTurnNumber());
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(0,2);
console.log(gameBoard.board);
console.log(gameFlow.getWinner());

// //Turn 5 X
gameFlow.switchPlayerTurn();
gameFlow.increaseTurnNumber();
console.log(gameFlow.getTurnNumber());
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(1,1);
console.log(gameBoard.board);
console.log(gameFlow.getWinner());

// //Turn 6 O
gameFlow.switchPlayerTurn();
gameFlow.increaseTurnNumber();
console.log(gameFlow.getTurnNumber());
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(1,2);
console.log(gameBoard.board);
console.log(gameFlow.getWinner());

// //Turn 7 X
gameFlow.switchPlayerTurn();
gameFlow.increaseTurnNumber();
console.log(gameFlow.getTurnNumber());
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(2,0);
console.log(gameBoard.board);
console.log(gameFlow.getWinner());

// //Turn 8 O
gameFlow.switchPlayerTurn();
gameFlow.increaseTurnNumber();
console.log(gameFlow.getTurnNumber());
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(2,2);
console.log(gameBoard.board);
console.log(gameFlow.getWinner());
console.log(gameFlow.checkTie());

//Turn 9 X
gameFlow.switchPlayerTurn();
gameFlow.increaseTurnNumber();
console.log(gameFlow.getTurnNumber());
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(2,1);
console.log(gameBoard.board);
console.log(gameFlow.getWinner());


// // gameBoard.resetBoard();
