import {BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { RouterProvider, createHashRouter } from "react-router-dom"
import React from "react"
import ReactDOM from "react-dom/client"
import Pokedex from "./routes/Pokedex";
import About from "./routes/About";
import Root from "./routes/Root";


function App(){


  const router = createHashRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/About",
                element: <About />,
            },
            {
                path: "/Pokedex",
                element: <Pokedex /> ,
            },
        ],
    },
])

  const root = ReactDOM.createRoot(document.getElementById("root"))
  return(
    
    root.render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    )
  );
}


export default App;
