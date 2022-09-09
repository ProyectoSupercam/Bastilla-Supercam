import { bd } from "./firebase-config"
import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { Sidebars } from "./pages/sidebars"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login";



function Inicio() {
  return (
    <div><Sidebars /></div>
  )
}

function App() {

  useEffect(() => {
    const obtenerData = async () => {
      const datos = await getDocs(collection(bd, "Usuarios"));
      console.log(datos)
    }
    obtenerData()

  }, [])

  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/home" element={<Inicio/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
