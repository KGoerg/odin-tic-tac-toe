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
function gameFlow() {

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

    switchPlayerTurn();
    getActivePlayer();

    let turnNumber = 0;
    const getTurnNumber = () => turnNumber;
    const increaseTurnNumber = () => {turnNumber++};

    return {getTurnNumber, increaseTurnNumber};
    // Player 1 will always go first on odd turn numbers. Player 2 will always go second on even turn numbers. Use this info to make it so that Player 1 cannot click on even turn numbers and vice versa.
};