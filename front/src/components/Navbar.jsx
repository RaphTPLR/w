import { Link, Route, Routes } from 'react-router-dom'
import Home from '../components/Home.jsx'
import "../style/Navbar.scss"

export default function NavBar() {
    return (
        <div className="content">
            <div className="navbar">
                <Link to='/'>
                    <div className="logo">W</div>
                </Link>
            </div>
            <Routes>
                <Route path='/' element={ <Home /> }></Route>
            </Routes>
        </div>
    )
}