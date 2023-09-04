import React from 'react'
import { NavLink } from 'react-router-dom'


const Error = () => {
    return (
        <>
            <section className='main_section main_section_home d-flex text-center align-items-center justify-content-center'>
                <div class="container">
                    <div class="row home_contain error_page">
                        <h1 className='text-uppercase'>We are sorry, Page not found</h1>
                        <div className='col-md-4 col-12 m-auto'>
                        <button className='btn btn-primary'> <NavLink to='/' className="text-white" >Back to HomePage</NavLink></button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Error