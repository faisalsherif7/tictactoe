const Gameboard = (function() {
    let array = ['X', 'O', 'X', 'O', 'O', 'X', 'O', 'X', 'O'];
    
    const board = document.querySelector('.board')

    let counter = 0
    for (let i = 0; i < 3; i++) {
        board.textContent += array[counter]
        board.textContent += array[counter + 1]
        board.textContent += array[counter + 2]
        board.textContent += '\r\n'
        counter = counter + 3
    }
})()
