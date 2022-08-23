const board = document.querySelector('.board')
const resetBtn = document.querySelector('button.reset')
const winnerTitle = document.querySelector('.winner')
const turnArr =  document.querySelectorAll('.turn > h3')
const dialog = document.querySelector('dialog')
//Table sizes
const ROWS = 3
const COLS = 3
//create the table
const table = []
for(let  row = 0 ; row < ROWS ; row++){
    const rowTable = []
    for(let col = 0 ; col < COLS ; col++){
        rowTable.push('')
        const cell = document.createElement('span')
        cell.classList.add(`${row}-${col}`)
        cell.textContent = ''
        board.appendChild(cell)
    }
    table.push(rowTable)
}
//get the winner
let winner = null
//counter for check the turn 
let counter = 0
// check  game over or not
let isFinish = false
//check the game over or not on every turn
const winSitutation = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


//reset işlemi sonra yapılacak şimdiklik reload atılıyor uygulamaya!!
// const resetTheTable = (table) => {
//     //reset the logic table
//     for(let row of table){
//         for(let col of table){
//             col = ''
//         }
//     }
//     //reset the dom
//     const cells = document.querySelectorAll('.board > span');
//     [...cells].forEach((cell,idx) => {
//         cell.classList.add('empty')
//         cell.textContent = ''
//     })
//     //Reset the isFinish
//     isFinish = false
//     //Reset the winner
//     winner = null
//     //Reset the dom Title
//     winnerTitle.textContent  = ''
// }


const checkTheGame = (flattedTable) => {
    for(let [a,b,c] of winSitutation){
        let A = flattedTable[a]
        let B = flattedTable[b]
        let C = flattedTable[c]
        if(A == B && B == C && A && B && C) {
            isFinish = true
            if( counter % 2 == 0) winner = 'O'
            else winner = 'X'
        }
        else if(flattedTable.every(el => el != '')){
            isFinish = true
            winner = 'deuce'
        }
    }
}


const cells = document.querySelectorAll('.board > span');
//always X begin the game!!
[...turnArr][0].classList.add('active');
[...cells].forEach((cell,idx) => {
    cell.classList.add('empty')
    cell.addEventListener('click',e => {
        //prevent the next turn and finish the game!!
        if(isFinish) return
        else if(e.target.classList.contains('empty')){
            [...turnArr][0].classList.toggle('active',counter % 2 != 0);
            [...turnArr][1].classList.toggle('active',counter % 2 == 0)
            const [row,col] = e.target.className.split('empty')[0].trim().split('-')
            if(counter % 2 == 0){
                table[+row][+col] = 'X'
                e.target.textContent = 'X'
                e.target.style.color = '#fff' 
            }
            else{
                table[+row][+col] = 'O'
                e.target.textContent = 'O'
                e.target.style.color = '#fff'
            }
            e.target.classList.remove('empty')
            counter++
            //update the flat table and finish!!
            checkTheGame(table.flat(),counter)
            if(isFinish) {
                winnerTitle.textContent = winner
            }
        }
        else return
    })
})

resetBtn.addEventListener('click', e => {
    window.location.reload()
})




