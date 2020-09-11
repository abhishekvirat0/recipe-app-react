import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card'
import { config } from './config.js';

const App = () => {
  const APP_ID = config.APP_ID;
  const APP_KEY = config.APP_KEY;

  const [recipes, setReceipes] = useState([]);

  const [search, setSearch] = useState('');  

  const [query, setquery] = useState('chicken');

  useEffect(() => {
    const getReceipes = async() => {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
      const data = await response.json();
      // console.log(data)
      setReceipes(data.hits)
    }
    getReceipes();
    // console.log('Effect has been run');
  }, [query]); // runs only once at the starting, if no data is passed.




  const updateSearch = e => {
    setSearch(e.target.value)
    console.log(search);
  }

  const getSearch = e => {
    e.preventDefault();
    setquery(search);
    setSearch('');
  }

  return (
    <div className="App">

      <form onSubmit={getSearch} className="search__form">
                                        {/* onchange means every time input changes */}
             <input
                    className="fadeInUp"
                    type="text"
                    value={search}
                    onChange={updateSearch}
                    placeholder="Search Food..."
                    autoFocus
                />

      </form>


      <div className="recipe">
      
        {recipes.map((recipe) => (
          <Card
                    key={recipe.recipe.label}
                    title={recipe.recipe.label}
                    calories={recipe.recipe.calories} 
                    image={recipe.recipe.image}
                    ingredients = {recipe.recipe.ingredients}
          />
        ))}

      </div>

    </div>
  )
}

export default App
