import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card'

const App = () => {
  const APP_ID = '721fce3a';
  const APP_KEY = 'ff277ef9f2d100b2622fd9a108495b2c';

  const [recipes, setReceipes] = useState([])

  const [search, setSearch] = useState('')  

  const [query, setquery] = useState('chicken')

  useEffect(() => {
    getReceipes();
    // console.log('Effect has been run');
  }, [query]); // runs only once at the starting, if no data is passed.


  const getReceipes = async() => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    console.log(data)
    setReceipes(data.hits)
  }

  // async function getReceipes(){
  //   return fetch(`https://api.{edamam}.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`, {
  //     method: 'POST',
  //     headers:{  // headers are important to post any data
  //       'Content-Type':'application/json'
  //   }
  // })
  //   .then((res) => {
  //     if(res.ok){
  //         console.log("success")
  //     } else {
  //         console.log('Not SuccessFull')
  //     }
  //     return res.json()
  //     })
  //   .then(data=> 
  //       // console.log(data.hits),
  //       setReceipes(data.hits)
  //     )
  //   }

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
    <div
     className="App">

      


      <form onSubmit={getSearch} className="search__form">
                                        {/* onchange means every time input changes */}
             <input
                    className="fadeInUp"
                    type="text"
                    value={search}
                    onChange={updateSearch}
                    placeholder="Type and hit enter..."
                />

            {/* <button className="search__button" type="submit">
              Search
            </button> */}

      </form>


      <div className="recipe">
      
      {/* {recipes.map((recipe) => (
        <RecipeReviewCard
                  key={recipe.recipe.label}
                  title={recipe.recipe.label}
                  calories={recipe.recipe.calories} 
                  image={recipe.recipe.image}
                  ingredients = {recipe.recipe.ingredients}
        />
      ))}

      </div> */}

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



      {/* {recipes.map((recipe) => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image}
          ingredients = {recipe.recipe.ingredients}
        />
      ))} */}

    </div>
  )
}

export default App
