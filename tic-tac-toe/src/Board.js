import Square from "./Square"

function Board(props){
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8]

    return(
        <div>
            <div className='board-row'>
            {nums.slice(0,3).map((n) =>
                <Square key={n} value={props.squares[n]} onClick={()=>props.onClick(n)}/>
            )}
            </div>
            <div className='board-row'>
            {nums.slice(3,6).map((n) =>
                <Square key={n} value={props.squares[n]} onClick={()=>props.onClick(n)}/>
            )}
            </div>
            <div className='board-row'>
            {nums.slice(6).map((n) =>
                <Square key={n} value={props.squares[n]} onClick={()=>props.onClick(n)}/>
            )}
            </div>
            </div>
        
    )
}

export default Board