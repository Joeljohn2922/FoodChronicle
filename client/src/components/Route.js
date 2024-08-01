import App from './App'; 
import Login from './Login';
import Meal from "./Meal"; 
import MealItem from "./MealItem"; 
import RecipeInfo from './RecipeInfo'; 
import SignUp from './SignUp'; 
import NewRecipeForm from './NewRecipeForm'; 
import FavoriteRecipes from './FavoriteRecipes'; 
import Home from './Home'; 
  

const routes = [ 
    { 
        path: "/", 
        element: <App />, 
        children:[ { 
            path: "/meal", 
            element: <Meal />
        },
        { 
            path: "/meal/:id",
            element: <MealItem />
        }, 
    
        { 
            path: "/:MealId", 
            element: <RecipeInfo />
        }, 
        { 
            path: "/signup", 
            element: <SignUp/>, 
        }, 
        { 
            path: "/login", 
            element: <Login/>, 
        }, 
        { 
            path: "/NewRecipeForm", 
            element: <NewRecipeForm/>, 
        }, 
        { 
            path: "/FavoriteRecipes", 
            element: <FavoriteRecipes/>,
        }, 
        { 
            path: "/", 
            element: <Home />,
        } 
    ]
       
    }, 
    
   

] 

export default routes;