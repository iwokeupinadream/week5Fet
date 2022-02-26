let cells = document.querySelectorAll('.cell')
cells = Array.from(cells)

let mainReset = document.getElementById('mainReset')


let currentPlayer = 'X'

let h1 = document.getElementById('h1')
h1.innerText = 'Player ' + currentPlayer + ' please start the game'

let winnerAlert = document.getElementById('winnerAlert')
winnerAlert.style.display = "none"

//winning conditions in the form of an array
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]

let winner = ''
//used to count rounds/turns
let totalValue = 0
//status for game being active or not
gameStillActive = true

//checks the current array of the board compared to the winConditions array
//if there is a win or a draw it will change a css atribute to display a bootstrap styled alert
function winnerCheck() {
    winConditions.forEach(function(condition){
        let check = condition.every(idx => cells[idx].innerText.trim() == currentPlayer)
        if(check) {
            winner = currentPlayer
            winnerAlert.style.display = "block"
            winnerAlert.innerText = ('Player ' + currentPlayer + ' Wins the game')
            gameStillActive = false
        }
        if(!check && totalValue == 9) {
            winnerAlert.style.display = "block"
            winnerAlert.innerText = ('Draw!')
            gameStillActive = false
        }
    })
}

//for each cell it adds an event listener
cells.forEach(function(cell) {
    cell.addEventListener('click', function() {
        console.log(h1.innertext)
        //these 2 statments are to ensure that you cant click on a spot that is already occupied
        //as well as changing the board values/ modifying the board after the game is over if there
        //are still blank spaces
        if(cell.innerText != "") return
        if(gameStillActive != true) return

        cell.innerText = currentPlayer
        totalValue = totalValue + 1
        
        winnerCheck()

        //checks to see whos turn it is and updates the h1 depending on the "total value" which can be thought of as rounds played
        if(totalValue %2 == 0) {
            h1.innerText = "Player X's Turn"
        }
        if(totalValue %2 == 1) {
            h1.innerText = "Player O's Turn"
        }
        //checks to see if game is still active for displaying the h1 for the turns
        if(gameStillActive == false) {
            h1.innerText = ''
        }
        //if and else if for changing players after each turn
        if(currentPlayer === 'X') {
            currentPlayer = 'O'
        } 
        
        else if(currentPlayer === 'O') {
            currentPlayer = 'X'
        }
    })
})

//reset button for the game. basically just resets all values
mainReset.addEventListener('click', function() {
        gameStillActive = true
        winnerAlert.style.display = "none"
        totalValue = 0
        currentPlayer = 'X'
        h1.innerText = 'Player ' + currentPlayer + ' please start the game'
        console.log('reset')
        console.log(cells)
        for(i = 0; i < 9; i++) {
            console.log(cells[i].innerText)
            cells[i].innerHTML = ''
            
        }
})