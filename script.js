const gameBoard = (function() {
    
    // Create array to store gameboard
    let arr = [];
    let rows = 3;
    let columns = 3;

    for (let i = 0; i < rows; i++) {
        arr[i] = [];
        for (let j = 0; j < columns; j++) {
            arr[i][j] = 'X';
        }
    }

    const updateBoard = (function() {
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
    })();

})();

function createPlayer (name, marker) {
    const mark = function () {
        
    }
    return { name, marker, mark };
}

