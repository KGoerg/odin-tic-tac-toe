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
            console.log("You cannot select this square");
        }
        };
    
    let gameResult;

return {board, resetBoard, playerTurn};
})();

//Allows display of game board and, if needed, to display specific elements within the array
console.log(gameBoard.board)

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

    }
    
    return {switchPlayerTurn, getActivePlayer};
})();

//Testing playing the game
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(0,0);
console.log(gameBoard.board);
gameFlow.switchPlayerTurn();
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(0,1);
console.log(gameBoard.board);
gameFlow.switchPlayerTurn();
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(0,1);
console.log(gameBoard.board);
gameBoard.resetBoard();
console.log(gameBoard.board);
console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(0,0);
console.log(gameBoard.board);