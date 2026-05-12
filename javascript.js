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
        console.log(boardPosition);
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

//Working on a "getWinner" function to announce the winner. Might want to use array.every method.
    const getWinner = () => {
        //Determine Player One winner
        if (
            //First column down
            gameBoard.board[0][0] && gameBoard.board[1][0] && gameBoard.board[2][0] === "X" ||
            
            // Second column down
            gameBoard.board[0][1] && gameBoard.board[1][1] && gameBoard.board[2][1] === "X" ||
            
            //Third column down
            gameBoard.board[0][2] && gameBoard.board[1][2] && gameBoard.board[2][2] === "X" ||
        
            //Left to right diagonal
            gameBoard.board[0][0] && gameBoard.board[1][1] && gameBoard.board[2][2] === "X" ||
        
            gameBoard.board[2][0] && gameBoard.board[1][1] && gameBoard.board[0][2] === "X" ) {
            console.log(`Player One: ${playerOne.playerName} wins!`);
        } else if (
            //First column down
            gameBoard.board[0][0] && gameBoard.board[1][0] && gameBoard.board[2][0] === "O" ||
            
            // Second column down
            gameBoard.board[0][1] && gameBoard.board[1][1] && gameBoard.board[2][1] === "O" ||
            
            //Third column down
            gameBoard.board[0][2] && gameBoard.board[1][2] && gameBoard.board[2][2] === "O" ||
        
            //Left to right diagonal
            gameBoard.board[0][0] && gameBoard.board[1][1] && gameBoard.board[2][2] === "O" ||
        
            gameBoard.board[2][0] && gameBoard.board[1][1] && gameBoard.board[0][2] === "O" ) {
            console.log(`Player Two: ${playerTwo.playerName} wins!`);
        } else {
            console.log("No winner yet!")
        }
    };
    
    return {switchPlayerTurn, getActivePlayer, getWinner};
})();

//Testing playing the game
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(0,1);
console.log(gameBoard.board);
gameFlow.getWinner();
gameFlow.switchPlayerTurn();
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(0,0);
console.log(gameBoard.board);
gameFlow.getWinner();
gameFlow.switchPlayerTurn();
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(1,1);
console.log(gameBoard.board);
gameFlow.getWinner();
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(2,1);
gameFlow.getWinner();

// console.log(gameBoard.board);
// gameBoard.playerTurn(1,0);
// console.log(gameBoard.board);
// gameBoard.playerTurn(2,0);
// gameFlow.getWinner();

// gameBoard.resetBoard();
