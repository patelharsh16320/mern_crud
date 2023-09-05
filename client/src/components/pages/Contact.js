import React,{useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'

const Contact = () => {

  const [userData, setUserData] = useState({}); 
  
  const callAboutPage = async () => {
      try {
          const res = await fetch('/getdata', {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
              credentials: "include"
          });
          const data = await res.json();
          console.log(data);
          setUserData(data);

          if (!res.status === 200) {
              const err = new Error(res.err);
              throw err;
          }
      }
      catch (e) {
          console.log(e.message);
      }
  }
  useEffect(() => {
      callAboutPage();
  });

  return (
    <>
      <div className='main_section_contact'>
        <div className='contact_info mt-3'>
          <div className='container contact_details'>
            <div className='row'>
              <div className='col-lg-12 col-md-12 contact_inner_details d-flex justify-content-between align-items-center'>

                {/* Phone Details  */}
                <div className='contact_box d-flex box_shadow'>
                  <img src="/images/phone.gif" alt="phone" className='img_icon' />
                  <div className='contact_info_content'>
                    <div className='contact_info_title'>Phone</div>
                    {/* <NavLink to="tel:1234567890" className="contact_info_text" >+91 987 654 3210 </NavLink> */}
                    <NavLink to="tel:1234567890" className="contact_info_text" >{setUserData.phone}</NavLink>
                  </div>
                </div>

                {/* Email Details  */}
                <div className='contact_box d-flex box_shadow'>
                  <img src="/images/email.gif" alt="Email" className='img_icon' />
                  <div className='contact_info_content'>
                    <div className='contact_info_title'>Email</div>
                    <NavLink to="mailto:harsh@gmail.com" className="contact_info_text" >harsh@gmail.com</NavLink>
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
            <div class="contact_form">
              <div class="container">
                <div class="row">
                  <div class="col-md-8 col-12 m-auto">
                    <div class="contact_form_container p-3 box_shadow">
                      <div class="contact_form_details">Get In Touch</div>
                      <form id="contact_form">
                        <div class="contact_form_name d-flex justify-content-between align-items-center">
                          <input type="text" id="contact_form_name" class="contat_form_name input_feild" placeholder="Your name" required />
                          <input type="email" id="contact_form_email" class="contat_form_email input_feild" placeholder="Your email" required />
                          <input type="number" id="contact_form_number" class="contat_form_number input_feild" placeholder="Your number" required />
                        </div>
                        <textarea class="contact_form_number_message" placeholder="Message" rows="5" />
                        <button type="submit" className="btn btn-primary contact_submit_button" name="signup" id="signup">Send Message</button>
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