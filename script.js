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
        displayBoard();
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

const gameController = (function() {
    
    let currentPlayer;
    let player1;
    let player2;
    const arr = gameBoard.arr;
    const playerDisplay = document.querySelector('.current-player');
    const result = document.querySelector('.result');

    const setPlayers = (event) => {
        event.preventDefault();

        let playerOne = document.querySelector('#player-one').value;
        let playerTwo = document.querySelector('#player-two').value;

        player1 = createPlayer(playerOne, 'X');
        player2 = createPlayer(playerTwo, 'O');

        currentPlayer = player1;

        playerDisplay.textContent = `${currentPlayer.name}'s turn`;

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
            playerDisplay.textContent = '';
            return result.textContent = `Take the W, ${name}`;

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
            playerDisplay.textContent = '';
            return result.textContent = 'tie!';
          }
    }

    const click = (event) => {
        let cell = event.target;
        if (cell.tagName === 'TD') {
            if (cell.textContent === 'X' || cell.textContent === 'O') {
                return;
            }
            if (currentPlayer === undefined) {
                return playerDisplay.textContent = `Enter player name!`;
            }
            const i = cell.dataset.i;
            const j = cell.dataset.j;
            gameBoard.updateBoard(i, j, currentPlayer.marker)
            checkGameOver(currentPlayer.name);
            if (result.textContent === '') {
                switchTurns();
            }
        }
    }

    const resetGame = () => {
        currentPlayer = undefined;
        gameBoard.defaultPopulate();
        playerDisplay.textContent = `Enter player name!`;
        result.textContent = '';
    }

    return {
        setPlayers,
        switchTurns,
        checkGameOver,
        click, 
        resetGame
    }
})();

function createPlayer (name, marker) {
    return { name, marker };
};

gameBoard.defaultPopulate()

// Reset button
const reset = document.querySelector('.reset-button')
reset.addEventListener('click', () => {
    gameController.resetGame();
})

// Take input from form and create an object containing two players
const playerForm = document.querySelector('.player-form')
const players = playerForm.addEventListener('submit', (event) => {
    gameController.setPlayers(event);
})


// Event listener for clicks on gameBoard
const board = document.querySelector('.board');
board.addEventListener('click', (event) => {
    gameController.click(event);
})

