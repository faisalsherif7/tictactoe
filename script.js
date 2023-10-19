// Create gameBoard module
const gameBoard = (function() {
    let array = ['X', 'O', 'O', 'O', 'O', 'X', 'O', 'X', 'O'];
    return array;
})()

const container = document.querySelector('.container')
container.textContent += gameBoard;