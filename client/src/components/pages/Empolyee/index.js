import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css'
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import 'reactjs-popup/dist/index.css';
import { Link } from 'react-router-dom';
import { confirmAlert } from "react-confirm-alert";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const Navigate = useNavigate();

  const fetchAllEmpData = async () => {
    try {
      const res = await fetch('/employee', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      });
      const data = await res.json();
      setEmployees(data);

      if (!res.status === 200) {
        const err = new Error(res.err);
        throw err;
      }
    }
    catch (e) {
      console.log(e.message);
      Navigate('/login');
    }
  }

  const addNew = () => {
    Navigate('/employee/addnew')
  }

  // Delete Emp Row by _ID ----start
  const delEmpData = (id, name) => {
    confirmAlert({
      message: `Are you sure to Delete Employee: -  ${name}`,
      buttons: [
        { label: 'Yes', onClick: () => deleteEmpData(id, name) },
        { label: 'No', onClick: () => toast.error('Cancle', { theme: "colored" }) }
      ]
    });
  }

  const deleteEmpData = async (id, name) => {
    try {
      const response = await fetch(`/employee/delete/${id}`, {
        method: "DELETE",
      });

      toast.success("Delete Employee Successfull...", { theme: "colored", });
      fetchAllEmpData();

    } catch (err) {
      console.log(err);
    }
  }
  // Delete Emp Row by _ID ----End

  useEffect(() => {
    fetchAllEmpData();
  }, []);

  return (
    <>
      <section className='main_section main_section_signup d-flex text-center align-items-center justify-content-center'>
        <div className='container'>
          <div className='row box_shadow p-3'>
            <div className='col-md-12 col-lg-12 col-12 m-auto'>
              <div className='card border-0 text-start'>
                <div className='row'>
                  <div className='col-md-6 col-lg-6 col-12'>
                    <h2>All Employees</h2>
                  </div>
                  <div className='col-md-6 col-lg-6 col-12'>
                    <p className='text-end'>
                      <button className="btn btn-success form-submit form-submit" type="button" onClick={addNew}>Add New</button>
                    </p>
                  </div>
                </div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Employee</th>
                      <th scope="col">Mail</th>
                      <th scope="col">Position</th>
                      <th scope="col">Technology</th>
                      <th scope="col">Update</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((props) => {
                      const { _id, emp_id, name, position, technology, email } = props;
                      return <>
                        <tr key={_id}>
                          <th scope="row">{emp_id}</th>
                          <td>{name}</td>
                          <td><Link to={`mailto:${email}`} className='text-lowercase'>{email}</Link></td>
                          <td className='text-capitalize'>{position}</td>
                          <td className='text-capitalize'>{technology}</td>
                          <td>
                          {/* <button className="btn btn-primary form-submit form-submit" name='btnAddMore' value="Edit Profile"
                            onClick={() => updateEmpData(_id)}
                          ><FaEdit /></button> */}
                          <Link to={`/employee/update/${_id}`}> <FaEdit /></Link>
                          </td>
                          <td><button className="btn btn-danger form-submit form-submit" type="button"
                            onClick={() => delEmpData(_id, name)}
                          ><FaTrashCan /></button></td>
                        </tr>
                      </>
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  )
}

export default Employee
