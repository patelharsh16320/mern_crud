import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { NavLink } from 'react-router-dom'

import { userContext } from '../App';

const Navbar = () => {
    const { state, dispatch } = useContext(userContext);
    const RenderMenu = () => {
        if (!state) {
            return (
                <>
                    <li className="nav-item active"> <NavLink className="nav-link" to="/">Home</NavLink> </li>
                    <li className="nav-item"> <NavLink className="nav-link" to="/about">AboutMe</NavLink> </li>
                    <li className="nav-item"> <NavLink className="nav-link" to="/contact">Contact</NavLink> </li>
                    <li className="nav-item"> <NavLink className="nav-link" to="/Login">Login</NavLink> </li>
                    <li className="nav-item"> <NavLink className="nav-link" to="/signin">Registration</NavLink> </li>
                </>
            )
        }
        else {
            return (
                <>
                    <li className="nav-item active"> <NavLink className="nav-link" to="/">Home</NavLink> </li>
                    <li className="nav-item"> <NavLink className="nav-link" to="/about">AboutMe</NavLink> </li>
                    <li className="nav-item"> <NavLink className="nav-link" to="/contact">Contact</NavLink> </li>
                    <li className="nav-item"> <NavLink className="nav-link" to="/logout">Logout</NavLink> </li>
                </>
            )
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-2"> {/* bg-wave fixed-top */}
                <NavLink to='/'><img src='/images/logo.png' alt='Logo' width={'100'} /></NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav custom-link ml-auto">
                        <RenderMenu />
                    </ul>
                </div>
            </nav>
        </>
    )
}


export default Navbar