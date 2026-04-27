const gameBoard = (() => {
    const gridArray = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];

    const resetBoard;

    const gameResult;

});

const player = ((name, marker) => {
    const playerName = name;

    const playerMarker = () => {
        if (marker === "x" || marker === "o") {
            return marker.toUpperCase();
        } else if !(marker === "x" || marker === "X" || marker === "o" || marker === "O") {
            return `Please enter "X" or "O"`;
        }
    });

    const winCount;

});

const gameFlow = (() => {

});