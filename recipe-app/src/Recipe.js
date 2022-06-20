import React from "react";

function Recipe(props){
    console.log('Rendering Recipe component...')
    return(
        <div>
            <h1>{props.name}</h1>
            <p>{Math.round(props.calories * 100 / 100)}</p>
            <ul>
                {props.ingredients.map(ingredient => {
                    <li>{ingredient}</li>
                })}
            </ul>
            <img src={props.imageSrc} alt={props.name}/>
        </div>
    )
}

export default Recipe;