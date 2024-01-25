import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './components/pages/Home'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import Login from './components/pages/Login'
import Signin from './components/pages/Signin'
import Logout from './components/pages/Logout'
import Error from './components/pages/Error';
import Empolyee from './components/pages/Empolyee/index'
import UpdateData from './components/pages/crud/UpdateData';
import DeleteData from './components/pages/crud/DeleteData';
import AddEmp from './components/pages/Empolyee/NewEmp';
import UpdateEmp from './components/pages/Empolyee/UpdateEmp';

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
                <Route path="/update" element={<UpdateData />} />
                <Route path="/delete" element={<DeleteData />} />
                <Route path="/employee" element={<Empolyee />} />
                <Route path="/employee/addnew" element={<AddEmp />} />
                <Route path="/employee/update/:id" element={<UpdateEmp />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </>
    )
}

export default Routing