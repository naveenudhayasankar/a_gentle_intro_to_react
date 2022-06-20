import './App.css';
import React, {useState, useEffect} from 'react';
//import Recipe from './Recipe';

function App() {

  const APP_ID = ''
  const APP_KEY = ''
  const placeholder = 'Enter search text'

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
 
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

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json()
    setRecipes(data.hits)
    console.log(recipes)
  }

  useEffect(() => {
    console.log('Fetching recipes...')
    getRecipes()
  }, [query])

  const updateSearch = (event) => {
//    console.log(event.target.value)
    setSearch(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
//    console.log('Search query changed...')
//    console.log('Logging search ' + search)
    setQuery(search)
    console.log('Logging query ' + query)
    setSearch('')
  }

  return (
    <div className="App">
      <p>{search}</p>
      <form className='search-form' onSubmit={(event) => handleSubmit(event)}>
        <input className='search-bar' type='text' placeholder={placeholder} 
               onChange={(event) => updateSearch(event)}/>
        <button className='search-button' type='submit'>Search</button>
      </form>
      {
        recipes.map(recipe => {
          (<Recipe name={recipe.recipe.label} calories={recipe.recipe.calories} 
            ingredients={recipe.recipe.ingredientLines} imageSrc={recipe.recipe.image}/>)
        })
      }
    </div>
  );
}

export default App
