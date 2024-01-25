import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.css"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
  const Navigate = useNavigate();

  const [passShow, setPassShow] = useState(false);

  const [user, setUser] = useState({
    name: "", email: "", phone: "", work: "", password: "", cpassword: ""
  });

  let name, value;
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value })
  }
  const togglePassword = () => {
    setPassShow(!passShow);
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;

    if (password === cpassword) {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, email, phone, work, password, cpassword
        })
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        return toast.error("Invalid Details...!", { theme: "colored", });
      } else {
        toast.success("Registration Successfull...", { theme: "colored", });
        setTimeout(() => {
          Navigate('/login')
        }, 1500)
      }

    } else {
      toast.error('Password And Confirm pasword are nor same...')
    }


  }
  return (
    <>
      <section className="main_section main_section_signin d-flex text-center align-items-center justify-content-center">
        <div className="container">
          <div className="row box_shadow p-3">
            <div className="col-md-6 col-lg-6 col-12">
              <div className="card border-0">
                <h2>Sign Up</h2>
                <form method="POST">
                  <div className="form-group mb-3">
                    <input type="text" className="form-control" name="name" id="name" placeholder="Your Name" required
                      value={user.name}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input type="number" className="form-control" name="phone" id="phone" placeholder="Mobile Number" required
                      value={user.phone}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input type="text" className="form-control" name="work" id="work" placeholder="Your Profession" required
                      value={user.work}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input type={passShow ? "text" : "password"} className="form-control" name="password" id="password" placeholder="Password" required autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input type={passShow ? "text" : "password"} className="form-control" name="cpassword" id="cpassword" placeholder="Confirm Password" required autoComplete="off"
                      value={user.cpassword}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="text-start">
                    <input type="checkbox" onClick={togglePassword} /> Show Password
                  </div>
                  <button type="submit" className="btn btn-primary form-submit shadow button_effect" name="signup" id="signup" onClick={PostData}>Register</button>
                </form>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-12 d-grid text-center m-auto align-center">
              <img src="/images/registration.jpg" alt="sprial" className="sprial_img m-auto text-center" width={"80%"} />
              <NavLink to="/login" className="signup-image-link shadow button_effect ">I am  Already Register</NavLink>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  )
}

export default Signin