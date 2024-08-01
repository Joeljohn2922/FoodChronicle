import React, {useState} from "react";
import { Outlet } from "react-router-dom"; 
// import Meal from "./Meal"; 
import './style.css'; 
import NavBar from "./Navbar"; 




// import { Switch, Route } from "react-router-dom"; 
// import {Routes,Route} from "react";

function App() { 
  const[userId, setUserId] = useState(null) 
  const[isLoggedIn, setIsLoggedIn] = useState(null)   

  
  return ( 
    <>  
     
      {/* <Meal/>  */}
      <NavBar/>  
      <Outlet context={{setUserId: setUserId, setIsLoggedIn:setIsLoggedIn}}/>
     
      
      
      
    </>
  )
}

export default App;
