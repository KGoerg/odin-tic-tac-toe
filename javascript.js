const gameBoard = (() => {
    const gridArray = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];

    let resetBoard;

    let gameResult;

});

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