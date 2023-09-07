import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {userContext} from '../../App'

const Logout = () => {

    const { state, dispatch } = useContext(userContext);
    const Navigate = useNavigate();

    useEffect(() => {
        fetch('/logout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include"
        }).then(() => {
            dispatch({type: "USER", payload: false})
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
                        <h1>Logout Succesfully...</h1>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Logout