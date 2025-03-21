import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {

  const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });

  const callContactPage = async () => {
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
      setUserData({ ...data, name: data.name, email: data.email, phone: data.phone });

      if (!res.status === 200) {
        const err = new Error(res.err);
        throw err;
      }
    }
    catch (e) {
      console.log(e.message);
    }
  }

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUserData({ ...userData, [name]: value });
  }
  // Send data to backend 
  const contactForm = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;

    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, message
      })
    })

    const data = await res.json();

    if (!data) {
      toast.error('Message Not Send',{theme:"colored"});
    } else {
      toast.success('Message Send Successfully...',{theme:"colored"});
      setUserData({ ...userData, message: "" });
    }

  }
  useEffect(() => {
    callContactPage();
  },[]);

  return (
    <>
      <div className='main_section_contact'>
        <div className='contact_info pt-5'>
          <div className='container contact_details'>
            <div className='row'>
              <div className='contact_inner_details d-lg-flex d-md-flex justify-content-between align-items-center p-3 shadow'>

                {/* Phone Details  */}
                <div className='contact_box d-flex box_shadow'>
                  <img src="/images/phone.gif" alt="phone" className='img_icon' />
                  <div className='contact_info_content'>
                    <div className='contact_info_title'>Phone</div>
                    <NavLink to='#'>+91786 143 143</NavLink>
                  </div>
                </div>

                {/* Email Details  */}
                <div className='contact_box d-flex box_shadow'>
                  <img src="/images/email.gif" alt="Email" className='img_icon' />
                  <div className='contact_info_content'>
                    <div className='contact_info_title'>Email</div>
                    <NavLink to="mailto:harsh@gmail.com" className="contact_info_text" >contact@harsh.com</NavLink>
                  </div>
                </div>

                {/* Map Details  */}
                <div className='contact_box d-flex box_shadow'>
                  <img src="/images/map.gif" alt="Map" className='img_icon' />
                  <div className='contact_info_content'>
                    <div className='contact_info_title'>Address</div>
                    <NavLink to="/" className="contact_info_text" >Adalag, Gandhinagar, India </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* contact us form  */}
          <div className='contact-form pt-5'>
            <div className="contact_form">
              <div className="container">
                <div className="row shadow">
                  <div className="col-md-8 col-12 m-auto p-5">
                    <div className="contact_form_container p-3 box_shadow">
                      <div className="contact_form_details">Get In Touch</div>

                      <form method="POST" id="contact_form">
                        <div className="contact_form_name d-lg-flex d-md-flex justify-content-between align-items-center">
                          <input type="text" id="contact_form_name" className=" form-control contat_form_name input_feild email_group"
                            name='name'
                            // onChange={handleInput}
                            value={userData.name}
                            placeholder="Your Name" required />
                          <input type="email" id="contact_form_email" className=" form-control contat_form_email input_feild email_group"
                            name='email'
                            // onChange={handleInput}
                            value={userData.email}
                            placeholder="Your Email" required />
                          <input type="number" id="contact_form_number" className=" form-control contat_form_number input_feild email_group"
                            name='phone'
                            minLength={10}
                            maxLength={13}
                            // onChange={handleInput}
                            value={userData.phone}
                            placeholder="Your Phone" required />
                        </div>
                        <textarea type="text" className=" form-control contact_form_number_message"
                          name='message'
                          onChange={handleInput}
                          value={userData.message}
                          placeholder="Message" rows="5" required />
                        <button type="submit" className="btn contact_submit_button primary_btn shadow" name="signup" id="signup"
                          onClick={contactForm} >Send Message</button>
                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Contact