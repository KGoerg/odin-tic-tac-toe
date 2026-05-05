const gameBoard = (() => {
    const rows = 2;
    const columns = 2;
    const board = [];

    //Creates game board
    for (let i = 0; i <= rows; i++) {
        board[i] = [];
        for (let j = 0; j <= columns; j++) {
            board[i][j] = 0;
        }
    };

    let resetBoard;
    
    let gameResult;

return {board, resetBoard, gameResult};
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
playerOne.increaseWinCount();
playerOne.increaseWinCount();
console.log(playerOne.getWinCount())

//Control turn order and rounds
const gameFlow = (() => {

    const playerOneName = "Player One";
    const playerTwoName = "Player Two";

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
    
    return {switchPlayerTurn, getActivePlayer};
})();

//Check that turns are properly switching
gameFlow.switchPlayerTurn();
console.log(gameFlow.getActivePlayer());
gameFlow.switchPlayerTurn();
console.log(gameFlow.getActivePlayer());
gameFlow.switchPlayerTurn();
console.log(gameFlow.getActivePlayer());
gameFlow.switchPlayerTurn();
console.log(gameFlow.getActivePlayer());
