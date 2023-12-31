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
        const startGame = document.querySelector('.start-game')
        startGame.textContent = '';

        // Delete previous board to create new board
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

        // Display buttons to reset game and start over along with the board
        const reset = document.querySelector('.reset')
        reset.innerHTML = '<button type="button" class="reset-button">Reset</button>'
        const startOver = document.querySelector('.start-over')
        startOver.innerHTML = '<button type="button" class="start-over-button">Start Over</button>'
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

        if (playerOne === '') {
            playerOne = 'PlayerOne';
        }
        if (playerTwo === '') {
            playerTwo = 'PlayerTwo';
        }

        player1 = createPlayer(playerOne, 'X', 0);
        player2 = createPlayer(playerTwo, 'O', 0);

        currentPlayer = player1;

        playerDisplay.textContent = `${currentPlayer.name}'s turn`;
        
        updateHeader();

        return {
            player1,
            player2
        }
    }

    const updateHeader = () => {
        const formItemOne = document.querySelector('.form-item-one');
        const formitemTwo = document.querySelector('.form-item-two');
        formItemOne.innerHTML = `
        <div class="header-column header-column-one">
            <p>${player1.name} (X)</p> 
            <p class="score-display">${player1.score}</p>
        </div>
        `;
        formitemTwo.innerHTML = `
        <div class="header-column header-column-two">
            <p class="score-display">${player2.score}</p>
            <p>${player2.name} (O)</p>
        </div>
        `;
    }

    const switchTurns = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
        playerDisplay.textContent = `${currentPlayer.name}'s turn`;
    }

    const checkGameOver = (player) => {
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
            player.score += 1;
            updateHeader();
            return result.textContent = `${player.name} Wins!`;

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
            return result.textContent = `It's a tie!`;
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
            if (result.textContent === '') {
                const i = cell.dataset.i;
                const j = cell.dataset.j;
                gameBoard.updateBoard(i, j, currentPlayer.marker)
                checkGameOver(currentPlayer);
            }
            if (result.textContent === '') {
                switchTurns();
            }
        }
    }

    const resetGame = () => {
        gameBoard.defaultPopulate();
        result.textContent = '';
        currentPlayer = player1;
        playerDisplay.textContent = `${currentPlayer.name}'s turn`;
    }

    return {
        setPlayers,
        switchTurns,
        checkGameOver,
        click, 
        resetGame
    }
})();

function createPlayer (name, marker, score) {
    return { name, marker, score };
};

// Reset button
const resetButtons = document.querySelector('.reset-buttons')
resetButtons.addEventListener('click', (event) => {
    if (event.target.className === 'reset-button') {
        gameController.resetGame();
    } else if (event.target.className === 'start-over-button') {
        location.reload();
    }
})

// Take input from form and create an object containing two players
const playerForm = document.querySelector('.player-form')
const players = playerForm.addEventListener('submit', (event) => {
    gameController.setPlayers(event);
    gameBoard.defaultPopulate();
})


// Event listener for clicks on gameBoard
const board = document.querySelector('.board');
board.addEventListener('click', (event) => {
    gameController.click(event);
})

