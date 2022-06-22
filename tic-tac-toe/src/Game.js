import { useState } from "react"
import Board from "./Board"

function Game(){
    const [history, setHistory] = useState([{squares: Array(9).fill(null)}])
    const [isXNext, setIsXNext] = useState(true)
    const [stepNumber, setStepNumber] = useState(0)

    let status
    const current = history[stepNumber]
    const winner = calcWinner(current.squares)

    if(winner){
        status = 'Winner: '+ winner
    }
    else{
        status = 'Next Player: ' + (isXNext ? 'X' : 'O')
    }
    
    function calcWinner(squares){
        const winnings = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [2,4,6], [0,4,8]
        ]

        for(let i = 0; i < winnings.length; i++){
            const [a,b,c] = winnings[i]
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a]
        }
        return null
    }

    const handleClick = (n) => {
        const hist = history.slice(0, stepNumber+1)
        const current = hist[hist.length -1]
        const sqrs = current.squares.slice()
        if(sqrs[n] || calcWinner(sqrs)) return 
        sqrs[n] = isXNext ? 'X' : 'O'
        setHistory(history.concat([{squares: sqrs}]))
        setStepNumber(history.length)
        setIsXNext(!isXNext)
    }

    const jumpTo = (step) => {
        setStepNumber(step)
        setIsXNext(step % 2 === 0)
    }

    function Move(){
        return(<ol>{
            history.forEach((step, move) => {
            const desc = move ? 'Go to move #' + move :
            'Go to game start'
            console.log(step)
            return(<li key={move}>
                <button onClick={()=>jumpTo(move)}>{desc}</button>
            </li>
            )
        })}</ol>)
    }
    

    return(
        <div className='game'>
            <div className='game-board'>
                <Board squares={current.squares} onClick={(i)=>handleClick(i)}/>
            </div>
            <div className='game-info'>
                <div>{status}</div>
                <div>
                    <Move/>
                </div>
            </div>
        </div>
    )
}

export default Game