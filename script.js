const gameBoard = (function() {
    let arr = [];
    let rows = 3;
    let columns = 3;

    const defaultPopulate = () => {
        // Populate array with X's as default
        for (let i = 0; i < rows; i++) {
            arr[i] = [];
            for (let j = 0; j < columns; j++) {
                arr[i][j] = '';
            }
        }
        return 'done'
    }

    // Display array as an html table
    const displayBoard = function() {
        const board = document.querySelector('.board')
        board.textContent = '';
    
        let table = document.createElement('table');
        let tableBody = document.createElement('tbody');
    
        for (let i = 0; i < 3; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < 3; j++) {
                let marker = arr[i][j];
                const cell = document.createElement("td");
                const cellText = document.createTextNode(marker);
                cell.appendChild(cellText);
                row.appendChild(cell);
                cell.setAttribute('data-i', `${i}`);
                cell.setAttribute('data-j', `${j}`)
            }
            tableBody.appendChild(row);
        }
        table.appendChild(tableBody);
        board.appendChild(table);
    };

    const updateBoard = (i, j, marker) => {
        arr[i][j] = marker;
        displayBoard();
    }

    return {
        defaultPopulate,
        displayBoard,
        updateBoard
    }
})();

function createPlayer (name, marker) {
    return { name, marker };
};

const player1 = createPlayer('player1', 'X');
const player2 = createPlayer('player2', 'O');
let currentPlayer = player1;

const gameController = (function() {

    const switchTurns = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
            console.log(`changing player to ${currentPlayer.name}`)
        } else {
            currentPlayer = player1;
            console.log(`changing player to ${currentPlayer.name}`)
        }
    }

    

    return {
        switchTurns
    }
})();

const board = document.querySelector('.board');
board.addEventListener('click', (event) => {
    if (event.target.tagName === 'TD') {

        console.log(currentPlayer.name);

        let cell = event.target;
        const i = cell.dataset.i;
        const j = cell.dataset.j;
        gameBoard.updateBoard(i, j, currentPlayer.marker)
        gameController.switchTurns();
    }
    else {
        console.log(event.target)
    }
})

gameBoard.defaultPopulate()
gameBoard.displayBoard();

const reset = document.querySelector('.reset-button')
reset.addEventListener('click', () => {
    gameBoard.defaultPopulate();
    gameBoard.displayBoard();
})