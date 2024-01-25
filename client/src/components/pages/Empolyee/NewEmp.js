import React, { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const NewEmp = () => {
    const Navigate = useNavigate();

    const [user, setUser] = useState({
        emp_id: "", name: "", email: "", position: "", technology: ""
    })

    let name, value;
    const handleClick = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value })
    }
    const PostData = async (e) => {
        e.preventDefault();

        const { emp_id, name, email, position, technology } = user;

        const res = await fetch("/employee/addnew", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emp_id, name, email, position, technology
            })
        }
        );
        const data = await res.json();
        if (res.status === 422 || !data) {
            return toast.error("Invalid Details...!", { theme: "colored", });
        } else {
            toast.success("Registration Successfull...", { theme: "colored", });
            setTimeout(() => {
                Navigate('/employee')
            }, 1500)
        }

    }
    return (
        <>
            <section className="main_section main_section_signin d-flex text-center align-items-center justify-content-center">
                <div className="container">
                    <div className="row box_shadow p-3">
                        <div className="col-md-6 col-lg-6 col-12 m-auto">
                            <div className="card border-0">
                                <h2>Add New User</h2>
                                <form method="POST">
                                    <div className="form-group mb-3">
                                        <input type="number" className="form-control" name="emp_id" id="emp_id" placeholder="Enter ID"
                                            value={user.emp_id}
                                            onChange={handleClick}
                                            // readonly
                                            required />
                                    </div>

                                    <div className="form-group mb-3">
                                        <input type="text" className="form-control" name="name" id="name" placeholder="Enter Name"
                                            value={user.name}
                                            onChange={handleClick}
                                            required />
                                    </div>

                                    <div className="form-group mb-3">
                                        <input type="email" className="form-control" name="email" id="email" placeholder="Enter Mail"
                                            value={user.email}
                                            onChange={handleClick}
                                            // readOnly
                                            required />
                                    </div>

                                    <div className="form-group mb-3">
                                        <input type="text" className="form-control" name="position" id="position" placeholder="Enter Position"
                                            value={user.position}
                                            onChange={handleClick}
                                            required />
                                    </div>

                                    <div className="form-group mb-3">
                                        <input type="text" className="form-control" name="technology" id="technology" placeholder="Enter Technology"
                                            value={user.technology}
                                            onChange={handleClick}
                                            required />
                                    </div>

                                    <button type="submit" className="btn btn-primary form-submit" name="signup" id="signup"
                                        onClick={PostData}
                                    >Add New</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-12 d-grid text-center m-auto align-center">
                            <img src="/images/registration.jpg" alt="sprial" className="sprial_img m-auto text-center" width={"80%"} />
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    )
}

export default NewEmp
