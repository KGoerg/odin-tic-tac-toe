const gameBoard = (() => {
    const rows = 2;
    const columns = 2;
    const board = [];

    const boardArray = () => {
        for (let i = 0; i <= rows; i++) {
            board[i] = [];
            for (let j = 0; j <= columns; j++) {
                board[i][j] = 0;
            }
        }
        return board;
    };

    let resetBoard;
    
    let gameResult;

return {boardArray, resetBoard, gameResult};
})();

console.log(gameBoard.boardArray());

const createPlayer = ((name, marker) => {
    const playerName = name;

    const playerMarker = marker;

    let score = 0;
    const getWinCount = () => score;
    const increaseWinCount = () => {score++;};

    return {playerName, playerMarker, getWinCount, increaseWinCount}
})();

const gameFlow = (() => {
    let turnNumber = 0;
    const getTurnNumber = () => turnNumber;
    const increaseTurnNumber = () => {turnNumber++};

    return {getTurnNumber, increaseTurnNumber};
    // Player 1 will always go first on odd turn numbers. Player 2 will always go second on even turn numbers. Use this info to make it so that Player 1 cannot click on even turn numbers and vice versa.
})();