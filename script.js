// Create gameBoard module
const gameBoard = (function() {
    let array = ['X', 'O', 'X', 'O', 'O', 'X', 'O', 'X', 'O'];
    return array;
})()

const board = document.querySelector('.board')
for (let i = 0; i < 9; i++) {
    board.innerHTML += `
    <div class="box">
    <p>${gameBoard[i]}</p>
    </div>
    `;
}