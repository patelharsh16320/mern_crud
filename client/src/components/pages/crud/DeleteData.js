import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DeleteData = () => {

    const Navigate = useNavigate();

    useEffect(() => {
        fetch('/delete', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include"
        }).then(() => {
            Navigate('/login');
        }).catch((err) => {
            console.log(err);    
        });
    });


    return (
        <>
            <section className='main_section main_section_home d-flex text-center align-items-center justify-content-center'>
                <div class="container">
                    <div class="row home_contain">
                        <h1>Delete User Succesfully...</h1>
                    </div>
                </div>
            </section>
        </>
    )
}

export default DeleteData