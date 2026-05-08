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

    const playerTurn = (index1, index2) => {
        let boardPosition = gameBoard.board[index1][index2];
        console.log(boardPosition);
        console.log(gameFlow.getActivePlayer().marker);
        //This works to a point. Gets the marker at the specific board index and shows current player's marker. I need to figure out how to get the current index to become the player's marker. Will need to edit the array itself. boardPosition will be useful for the tentative code below to make sure players can't override each other's spaces.
        
        // if (boardPosition !== gameFlow.getActivePlayer().marker) {
        //     console.log("You cannot select this square.")
        // } else {
        //     boardPosition = gameFlow.getActivePlayer().marker;
        // }
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

//Check that turns are properly switching
// console.log(gameFlow.getActivePlayer());
// gameFlow.switchPlayerTurn();
// console.log(gameFlow.getActivePlayer());
// gameBoard.board[0][0] = gameFlow.getActivePlayer().marker;
// console.log(gameBoard.board);
// gameFlow.switchPlayerTurn();
// console.log(gameFlow.getActivePlayer());
// gameBoard.playerTurn(0,1);

console.log(gameFlow.getActivePlayer());
gameBoard.playerTurn(0,0);
console.log(gameBoard.board);