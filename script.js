const gameBoard = (function() {
    let arr = [];
    let rows = 3;
    let columns = 3;

    // Populate array with X's as default
    for (let i = 0; i < rows; i++) {
        arr[i] = [];
        for (let j = 0; j < columns; j++) {
            arr[i][j] = 'X';
        }
    }

    // Display array as an html table
    const displayBoard = function() {
        const board = document.querySelector('.board')
    
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

    const updateBoard = () => {

    }

    return {
        displayBoard,
        updateBoard
    }
})();

function createPlayer (name, marker) {
    return { name, marker };
};

const player1 = createPlayer('player1', 'X');
const player2 = createPlayer('player2', 'O');



const gameController = (function() {
    let currentPlayer = player1;

    const switchTurns = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    let allCells = document.querySelectorAll('td')
    allCells.forEach((cell) => {
        cell.addEventListener('click', () => {
            const i = cell.dataset.i;
            const j = cell.dataset.j;
            updateBoard(i, j, currentPlayer.marker)
        })
    });

    return {
        currentPlayer, 
    }
})();

console.log(gameController.currentPlayer.marker)