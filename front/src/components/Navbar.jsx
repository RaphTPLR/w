import { Link, Route, Routes } from 'react-router-dom'
import Home from '../components/Home.jsx'

export default function NavBar() {
    return (
        <div className="content">
            <div className="navbar">
                <Link to='/'>Home</Link>
            </div>
            <Routes>
                <Route path='/' element={ <Home /> }></Route>
            </Routes>
            <p>Hello World !</p>
        </div>
    )
}