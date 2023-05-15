import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

import LoginPage from "./components/loginpage";
import Workouts from "./components/workoutpage";
 
const App = () => {
 return (
   <div>
     <Routes>
       <Route exact path="/" element={<LoginPage />} />
       <Route path="workouts/:username" element={<Workouts />} />
     </Routes>
   </div>
 );
};
 
export default App;