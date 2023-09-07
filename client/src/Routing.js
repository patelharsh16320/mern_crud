import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './components/pages/Home'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import Login from './components/pages/Login'
import Signin from './components/pages/Signin'
import Logout from './components/pages/Logout'
import Error from './components/pages/Error';

const Routing = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/Logout" element={<Logout />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </>
    )
}

export default Routing