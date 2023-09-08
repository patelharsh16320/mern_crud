import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.css"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateData = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", phone: "", work: "", password: "", cpassword: "" });

  let name, value;
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  }

  const callUpdatePage = async () => {
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
      setUser({ ...data, name: data.name, email: data.email, phone: data.phone });

      if (!res.status === 200) {
        const err = new Error(res.err);
        throw err;
      }
    }
    catch (e) { console.log(e.message); }
  }

  useEffect(() => {
    callUpdatePage();
  }, []);

  const updateDataBase = async (e) => {
    e.preventDefault();

    const { name, phone, work } = user;

    const res = await fetch("/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, phone, work
      })
    });

    const data = await res.json();

    if (data.status === 422 || !data ) {
      toast.alert("Not Update",{ theme: "colored", });
    } else {
      toast.success("Data Updated Successfull",{ theme: "colored", });
      setTimeout (()=>{ navigate(`/about`)}, 1500)
    }
  }

  return (
    <>
      <section className="main_section main_section_signin d-flex text-center align-items-center justify-content-center">
        <div className="container">
          <div className="row box_shadow p-3">
            <div className="col-md-6 col-lg-6 col-12 m-auto">
              <div className="card border-0">
                <h2>Update Data</h2>
                <form method="POST">
                  <div className="form-group mb-3">
                    <input type="text" className="form-control" name="name" id="name" placeholder="Your Name"
                      value={user.name}
                      onChange={handleInput}
                      required />
                  </div>
                  <div className="form-group mb-3">
                    <input type="email" className="form-control email_group" name="email" id="email" placeholder="Your Email"
                      value={user.email}
                      readonly required />
                  </div>
                  <div className="form-group mb-3">
                    <input type="number" className="form-control" name="phone" id="phone" placeholder="Your Phone"
                      value={user.phone}
                      onChange={handleInput}
                      required />
                  </div>
                  <div className="form-group mb-3">
                    <input type="text" className="form-control" name="work" id="work" placeholder="Your Work"
                      value={user.work}
                      onChange={handleInput}
                      required />
                  </div>
                  <button type="submit" className="btn btn-primary form-submit" name="signup" id="signup" onClick={updateDataBase}>Update</button>
                </form>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-12 d-grid text-center m-auto align-center">
              <img src="/images/registration.jpg" alt="sprial" className="sprial_img m-auto text-center" width={"80%"} />
              {/* <NavLink to="/login" className="signup-image-link">Update The Data</NavLink> */}
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  )
}

export default UpdateData