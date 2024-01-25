import React, { useState, useEffect } from 'react'

const Home = () => {

    const [userData, setUserData] = useState({});
    const [show, setShow] = useState(false);

    const callHomePage = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            const data = await res.json();
            setUserData(data);
            setShow(true);
        }
        catch (e) {
            console.log(e.message);
        }
    }
    useEffect(() => {
        callHomePage();
    });

    return (
        <>
            <section className='main_section main_section_home d-flex text-center align-items-center justify-content-center' style={{'height': '94vh'}}>
                <div class="container">
                    <div class="row home_contain">
                        <h5>Welcome</h5>
                        <h1 className='text-capitalize'>{show?'Hello, ':''}{userData.name}</h1>
                        <h2 className='text-capitalize'>{show ? 'Happy, to see you again' : 'We Are The MERN Developer'}</h2>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Home