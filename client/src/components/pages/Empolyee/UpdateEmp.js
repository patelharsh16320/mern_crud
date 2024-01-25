import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.css"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
// import { Navigate, useParams } from 'react-router-dom';


const UpdateData = () => {

  const [data, setData] = useState({
    emp_id: "", name: "", position: "", technology: "", email: ""
  })
  // const Navigate = Navigate();
  const Navigate = useNavigate();
  //! show user details 
  const { id } = useParams();
  const getSingleUserData = async () => {
    try {
      const response = await fetch(`/employee/update/${id}`, {
        method: "POST",
      });
      const userData = await response.json();
      setData(userData);

    } catch (err) {
      console.log(err);
    }
  }

  //! update database 
  let name, value;
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setData({ ...data, [name]: value });
  }

  const updateDataBase = async (e) => {
    e.preventDefault();

    const { emp_id, name, position, technology, email } = data;

    try {
      const res = await fetch(`/employee/update/${id}`, {
        method: "POST",
        headers: {          
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emp_id, name, position, technology, email
        })
      });

      const dataRes = await res.json();
      // setData(data);
      setData({ ...dataRes, emp_id: dataRes.emp_id, name: dataRes.name, position: dataRes.position, technology: dataRes.technology, email: dataRes.email });

      // toast.success("Data Updated ....", { theme: "colored", });

      if (dataRes.status === 422 || !dataRes) {
        toast.alert("Not Update", { theme: "colored", });
      } else {
        toast.success("Data Updated Successfully", { theme: "colored", });
        Navigate(`/employee`);
        // setTimeout (()=>{ Navigate(`/employee`)}, 1500);
      }
    } catch (e) { console.log(e.message); }
  }

  useEffect(() => {
    getSingleUserData();
  }, [])


  return (
    <>
      <section className="main_section main_section_signin d-flex text-center align-items-center justify-content-center">
        <div className="container">
          <div className="row box_shadow p-3">
            <div className="col-md-6 col-lg-6 col-12 m-auto">
              <div className="card border-0">
                <h2>Update User</h2>
                <form key={data._id}>
                  <div className="form-group mb-3">
                    <input type="number" className="form-control" name="emp_id" id_="emp_id" placeholder="Enter ID"
                      value={data.emp_id}
                      onChange={handleInput}
                      readOnly
                      required />
                  </div>

                  <div className="form-group mb-3">
                    <input type="text" className="form-control " name="name" id_="name" placeholder="Enter Name"
                      value={data.name}
                      onChange={handleInput}
                      required />
                  </div>

                  <div className="form-group mb-3">
                    <input type="email" className="form-control " name="email" id="email" placeholder="Enter Mail"
                      value={data.email}
                      onChange={handleInput}
                      readOnly
                      required />
                  </div>

                  <div className="form-group mb-3">
                    <input type="text" className="form-control" name="position" id="position" placeholder="Enter Position"
                      value={data.position}
                      onChange={handleInput}
                      required />
                  </div>

                  <div className="form-group mb-3">
                    <input type="text" className="form-control" name="technology" id="technology" placeholder="Enter Technology"
                      value={data.technology}
                      onChange={handleInput}
                      required />
                  </div>
                  <button type="submit" className="btn btn-primary form-submit" name="signup" id="signup"
                    onClick={updateDataBase}
                  >Update</button>

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

export default UpdateData