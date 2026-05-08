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
        let board = [];
        for (let i = 0; i <= rows; i++) {
        board[i] = [];
        for (let j = 0; j <= columns; j++) {
            board[i][j] = 0;
        }
    };
    return board;
    };

    //This works. Gets the marker at the specific board index.
    const playerTurn = (index1, index2) => {
        const boardPosition = gameBoard.board[index1][index2];
        console.log(boardPosition);
        };

    // //Need to check if this works
    // const checkExistingMarker = () => {
    //     if (!gameBoard.board.includes(gameFlow.getActivePlayer().marker) || (gameBoard.board.includes(gameFlow.activePlayer().marker))) {
    //         console.log("You cannot select this space.")
    //     }
    // };
    
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

//Check that turns are properly switching
console.log(gameFlow.getActivePlayer());
gameFlow.switchPlayerTurn();
console.log(gameFlow.getActivePlayer());
gameBoard.board[0][0] = gameFlow.getActivePlayer().marker;
console.log(gameBoard.board);