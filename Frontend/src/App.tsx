
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ViewData } from "./components/pages/firestore/firestore";
import { Login } from "./components/pages/Login/login";
import { Sidebars } from "./components/pages/sidebars/sidebars";


function Inicio() {
  return (
    <div>
    
      <Sidebars />
      <ViewData/>
    
    
    </div>
  )
}

function App() {
 

  return (
    <div >

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/home" element={<Inicio />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
