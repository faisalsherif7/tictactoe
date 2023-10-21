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
        arr,
        defaultPopulate,
        displayBoard,
        updateBoard
    }
})();

function createPlayer (name, marker) {
    return { name, marker };
};

// Take input from form and create an object containing two players
const playerForm = document.querySelector('.player-form')
const players = playerForm.addEventListener('submit', (event) => {
    gameController.setPlayers(event);
})

const player1 = createPlayer('player1', 'X');
const player2 = createPlayer('player2', 'O');

const gameController = (function() {
    
    let currentPlayer;
    const arr = gameBoard.arr;

    const setPlayers = (event) => {
        event.preventDefault();

        let playerOne = document.querySelector('#player-one').value;
        let playerTwo = document.querySelector('#player-two').value;

        const player1 = createPlayer(playerOne, 'X');
        const player2 = createPlayer(playerTwo, 'O');

        currentPlayer = player1;

        console.log(`inside setPlayers, currentplayer is ${currentPlayer}`)

        return {
            player1,
            player2
        }
    }
    

    const switchTurns = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
        const playerDisplay = document.querySelector('.current-player');
        playerDisplay.textContent = `${currentPlayer.name}'s turn`;
    }

    const checkGameOver = (name) => {
        if (// Rows
        (arr[0][0] === arr[0][1] && arr[0][0] === arr[0][2] && arr[0][0] !== '') ||
        (arr[1][0] === arr[1][1] && arr[1][0] === arr[1][2] && arr[1][0] !== '') ||
        (arr[2][0] === arr[2][1] && arr[2][0] === arr[2][2] && arr[2][0] !== '') ||
        // Columns
        (arr[0][0] === arr[1][0] && arr[0][0] === arr[2][0] && arr[0][0] !== '') ||
        (arr[0][1] === arr[1][1] && arr[0][1] === arr[2][1] && arr[0][1] !== '') ||
        (arr[0][2] === arr[1][2] && arr[0][2] === arr[2][2] && arr[0][2] !== '') ||
        // Diagonals
        (arr[0][0] === arr[1][1] && arr[0][0] === arr[2][2] && arr[0][0] !== '') ||
        (arr[0][2] === arr[1][1] && arr[0][2] === arr[2][0] && arr[0][2] !== '')
        ) {

            // There's a win
            console.log(`Take the W, ${name}`)
          } else {

            // Return function if there's a single empty column
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if(arr[i][j] === '') {
                        return;
                    };
                }
            }

            // If it got here; then there's no win, and no empty columns, so its a tie
            console.log('tie!')
          }
    }

    const click = (event) => {
        let cell = event.target;
        if (cell.tagName === 'TD') {
            if (cell.textContent === 'X' || cell.textContent === 'O') {
                return console.log("can't do that");
            }
            const i = cell.dataset.i;
            const j = cell.dataset.j;
            gameBoard.updateBoard(i, j, currentPlayer.marker)
            checkGameOver(currentPlayer.name);
            switchTurns();
        }
        else {
            console.log(event.target)
        }
    }

    return {
        setPlayers,
        switchTurns,
        checkGameOver,
        click
    }
})();



const board = document.querySelector('.board');
board.addEventListener('click', (event) => {
    gameController.click(event);
})

gameBoard.defaultPopulate()
gameBoard.displayBoard();





// From here on, code for the page

const reset = document.querySelector('.reset-button')
reset.addEventListener('click', () => {
    currentPlayer = player1;
    gameBoard.defaultPopulate();
    gameBoard.displayBoard();

    const playerDisplay = document.querySelector('.current-player');
    playerDisplay.textContent = `${currentPlayer.name}'s turn`;
})


