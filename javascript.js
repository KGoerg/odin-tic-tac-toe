const gameBoard = (() => {
    const gridArray = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
    ];

    let resetBoard;

    let gameResult;

return {gridArray, resetBoard, gameResult};

});

console.log(gameBoard().gridArray[1][0]);

const createPlayer = ((name, marker) => {
    const playerName = name;

    const playerMarker = marker;

    let score = 0;
    const getWinCount = () => score;
    const increaseWinCount = () => {score++;};

    return {playerName, playerMarker, getWinCount, increaseWinCount}
});

const gameFlow = (() => {

});