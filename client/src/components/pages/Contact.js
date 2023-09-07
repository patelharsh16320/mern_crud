import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

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
      alert('Message Not Send');
    } else {
      alert('Message Send Successfully...');
      setUserData({ ...userData, message: "" });
    }

  }
  useEffect(() => {
    callContactPage();
  },[]);

  return (
    <>
      <div className='main_section_contact'>
        <div className='contact_info mt-3'>
          <div className='container contact_details'>
            <div className='row'>
              <div className='contact_inner_details d-lg-flex d-md-flex justify-content-between align-items-center '>

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
          <div className='contact-form mt-5'>
            <div className="contact_form">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 col-12 m-auto">
                    <div className="contact_form_container p-3 box_shadow">
                      <div className="contact_form_details">Get In Touch</div>

                      <form method="POST" id="contact_form">
                        <div className="contact_form_name d-lg-flex d-md-flex justify-content-between align-items-center">
                          <input type="text" id="contact_form_name" className="contat_form_name input_feild"
                            name='name'
                            onChange={handleInput}
                            value={userData.name}
                            placeholder="Your Name" required />
                          <input type="email" id="contact_form_email" className="contat_form_email input_feild"
                            name='email'
                            onChange={handleInput}
                            value={userData.email}
                            placeholder="Your Email" required />
                          <input type="number" id="contact_form_number" className="contat_form_number input_feild"
                            name='phone'
                            onChange={handleInput}
                            value={userData.phone}
                            placeholder="Your Phone" required />
                        </div>
                        <textarea type="text" className="contact_form_number_message"
                          name='message'
                          onChange={handleInput}
                          value={userData.message}
                          placeholder="Message" rows="5" required />
                        <button type="submit" className="btn btn-primary contact_submit_button" name="signup" id="signup"
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
    </>
  )
}

export default Contact