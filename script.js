// Create gameBoard module
const gameBoard = (function() {
    let array = ['X', 'O', 'O', 'O'];
    return array;
})()

const container = document.querySelector('.container')
container.textContent += gameBoard;