import "../index.css"
import { Link, Outlet } from "react-router-dom"

export default function App() {
    return (
        <>
            <nav>
                <div><Link to="/">Home</Link></div>
                <div><Link to="/About">About</Link></div>
                <div><Link to="/Pokedex">Pokedex</Link></div>
            </nav>
            <Outlet />
        </>
    )
}