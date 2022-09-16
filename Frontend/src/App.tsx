
import React from "react";
import { Sidebars } from "./pages/sidebars"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login/Login";
import { ViewData } from "./components/firestore/firestore";


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
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Inicio />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
