import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = new useNavigate();
  const [user, setUser] = useState({
    email: "", password: ""
  });

  const [eyeShow, setEyeShow] = useState(true);
  const [passShow, setPassShow] = useState(false);

  const togglePass = () => {
    setPassShow(!passShow);
    setEyeShow(!eyeShow);
  }
  let name, value;
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value })
  }
  const postData = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    });
    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert('Invalid Credentails!...');
    } else {
      window.alert('Successful Login');
      navigate(`/`);
    }
  }
  return (
    <>
      <section className='main_section main_section_signup d-flex text-center align-items-center justify-content-center'>
        <div className='container'>
          <div className='row box_shadow p-3'>
            <div className='col-md-6 col-lg-6 col-12 d-grid text-center m-auto align-center '>
              <img src="/images/sprial.svg" alt="sprial" className='sprial_img m-auto text-center ' width={'50%'} />
              <NavLink to='/signin' className="signup-image-link">Create An Account</NavLink>
            </div>
            <div className='col-md-6 col-lg-6 col-12 m-auto'>
              <div className='card border-0 text-start'>
                <h2>Login</h2>
                <form method='POST'>

                  <div className="input-group mb-2">
                    <input type="email" className="form-control" name="email" id="email" placeholder="Your Email"
                      value={user.email}
                      onChange={handleInput} />
                  </div>
                  <div className="input-group mb-2">
                    <input type={passShow ? "text" : "password"} className="form-control" name="password" id="password" placeholder="Password"
                      value={user.password}
                      onChange={handleInput} />
                    <div className="input-group-prepend">
                      <div className="input-group-text" id="showPass"> <i className={eyeShow ? "fa-solid fa-eye-slash" : "fa fa-eye pointer_cursor"} aria-hidden="true" onClick={togglePass} ></i></div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary form-submit" name="signup" id="signup" onClick={postData}>Log In</button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default Login