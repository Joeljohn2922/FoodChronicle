import React, { useState } from 'react';

const FavoriteRecipes = () => {
    // Sample data; in a real application, this could come from props or an API.
    const initialRecipes = [
        { id: 1, name: 'Apple & Blackberry Crumble' },
        { id: 2, name: 'Apam Balik' },
        { id: 3, name: 'Beef Wellington' }, 
        { id: 4, name: 'Beef Stroganoff' }, 
        { id: 5, name: 'Cabbage Soup' }, 
        { id: 6, name: 'Dundee Cake' }, 
        { id: 7, name: 'Eggs Benedict' }, 
        { id: 8, name: 'Falafel' }, 
        { id: 9, name: 'Garlic Shrimp' }, 
        { id: 10, name: 'Honey Cake' },
        { id: 11, name: 'Irish Stew' }, 
        { id: 12, name: 'Jamician Beef Patties' }, 
        { id: 13, name: 'Korean BBQ' }, 
        { id: 14, name: 'Lamb Koftas' }, 
        { id: 15, name: 'Mango Sorbet' }, 
        { id: 16, name: 'Nasi Goreng' },
        { id: 17, name: 'Omelette' },
        { id: 16, name: 'Pancakes' }, 
        { id: 17, name: 'Quesadillas' }, 
        { id: 18, name: 'Risotto' }, 
        { id: 19, name: 'Samosas' },
        { id: 20, name: 'Tacos' }, 
        { id: 21, name: 'Vegan Lasagna' }, 
        { id: 22, name: 'Waffles' },
        { id: 23, name: 'Yaki Udon' }, 
        { id: 24, name: 'Zucchini Fritters' }



    ];

    const [recipes, setRecipes] = useState(initialRecipes);
    const [favorites, setFavorites] = useState([]);

    const handleFavorite = (recipeId) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.includes(recipeId)) {
                // If already favorited, remove it
                return prevFavorites.filter(id => id !== recipeId);
            } else {
                // Otherwise, add it
                return [...prevFavorites, recipeId];
            }
        });
    };

    const isFavorite = (recipeId) => favorites.includes(recipeId);

    return (
        <div className="container">
            <h1>Favorite Recipes</h1>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <span>{recipe.name}</span>
                        <button onClick={() => handleFavorite(recipe.id)}>
                            {isFavorite(recipe.id) ? 'Unfavorite' : 'Favorite'}
                        </button>
                    </li>
                ))}
            </ul>

            <h2>My Favorite Recipes</h2>
            <ul>
                {recipes.filter(recipe => isFavorite(recipe.id)).map(recipe => (
                    <li key={recipe.id}>
                        <span>{recipe.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoriteRecipes;