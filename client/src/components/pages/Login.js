import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { userContext } from '../../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const { state, dispatch } = useContext(userContext);
  const Navigate = new useNavigate();

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
    // console.log(e);
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
      toast.error("Invalid Credentails!...",{ theme: "colored", });
    } else {
      dispatch({ type: "USER", payload: true });
      toast.success("Successful Login!...", { theme: "colored", }); 
      setTimeout(() => {
        Navigate('/')
      }, 1500)
    }
  }
  return (
    <>
      <section className='main_section main_section_signup d-flex text-center align-items-center justify-content-center'>
        <div className='container'>
          <div className='row box_shadow p-3'>
            <div className='col-md-6 col-lg-6 col-12 d-grid text-center m-auto align-center '>
              <img src="/images/login.jpeg" alt="login" className='sprial_img m-auto text-center ' width={'80%'} />
              <NavLink to='/signin' className="signup-image-link shadow button_effect">Create An Account</NavLink>
            </div>
            <div className='col-md-6 col-lg-6 col-12 m-auto'>
              <div className='card border-0 text-start'>
                <h2>Sign in</h2>
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

                  <button type="submit" className="btn btn-primary form-submit shadow button_effect" name="signup" id="signup" onClick={postData}>Log In</button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  )
}

export default Login