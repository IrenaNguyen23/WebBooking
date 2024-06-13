import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { Col, Container, Row } from 'react-bootstrap';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const [disabled, setDisabled] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    display: false,
    message: '',
    type: '',
  });


  // Shows alert message for form submission feedback
  const toggleAlert = (message, type) => {
    setAlertInfo({ display: true, message, type });

    // Hide alert after 5 seconds
    setTimeout(() => {
      setAlertInfo({ display: false, message: '', type: '' });
    }, 5000);
  };

  // Function called on submit that uses emailjs to send email of valid contact form
  const onSubmit = async (data) => {
    // Destrcture data object
    const { from_name, email, message } = data;
    try {
      // Disable form while processing submission
      setDisabled(true);

      const templateParams = {
        from_name,
        email,
        message
      };

      const SERVICE_ID = 'service_x4k1bfg';
      const TEMPLATE_ID = 'template_hf3d4he';
      const USER_ID = '3D9ePZ-7i8bmP-ZnY';

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);

      // Display success alert
      toggleAlert('Form submission was successful!', 'success');
    } catch (e) {
      console.error(e);
      // Display error alert
      toggleAlert('Uh oh. Something went wrong.', 'danger');
    } finally {
      // Re-enable form submission
      setDisabled(false);
      // Reset contact form fields after submission
      reset();
    }
  };

  return (
    <>
      <div>
        <div className="my-5">
          <Container>
            <Row>
              {/* Địa chỉ */}
              <Col lg={4}>
                <div className="d-flex align-items-center rounded py-4" style={{background:"#f2eeee"}}>
                  <LocationOnOutlinedIcon sx={{ fontSize: 45 }} color="primary" className='mx-3'/>
                  <div>
                    <h5>Our Location</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.</p>
                    <a href="#" className="text-warning-emphasis">USA 27TH Brooklyn NY</a>
                  </div>
                </div>
              </Col>

              {/* Số điện thoại */}
              <Col lg={4}>
                <div className="d-flex align-items-center rounded py-4" style={{background:"#f2eeee"}}>
                  <LocalPhoneOutlinedIcon sx={{ fontSize: 45 }} color="primary" className='mx-3'/>
                  <div>
                    <h5 >Our Phone</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.</p>
                    <a href="#" className='text-warning-emphasis'>+489756412322</a>
                    <a href="#" className='text-warning-emphasis'>+123456789222</a>
                  </div>
                </div>
              </Col>

              {/* Email */}
              <Col lg={4}>
                <div className="d-flex align-items-center rounded py-4" style={{background:"#f2eeee"}}>
                  <MailOutlinedIcon sx={{ fontSize: 45 }} color="primary" className='mx-3'/>
                  <div>
                    <h5>Our Mail</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.</p>
                    <a href="#" className='text-warning-emphasis'>irena@gmail.com</a>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className='row bg-light bg-gradient'>
          <div className="col-lg-6">
            <div className="container">
              <div className="text-block">
                <div className="h3 my-5">Get In Touch</div>
                <div className="tbc-separator"></div>
                <div className="contactform-wrap">
                  <form className="comment-form" onSubmit={handleSubmit(onSubmit)} id="contactform">
                    <fieldset>
                      <div id="message"></div>
                      <div className="row my-3">
                        <div className="col-sm-6 mb-3">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            placeholder="Your Name *"
                            {...register('name', {
                              required: { value: true, message: 'Please enter your name' },
                              maxLength: { value: 30, message: 'Please use 30 characters or less' }
                            })}
                          />
                          {errors.name && <span className="errorMessage">{errors.name.message}</span>}
                        </div>
                        <div className="col-sm-6 mb-3">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            placeholder="Email Address *"
                            {...register('email', {
                              required: { value: true, message: 'Please enter a valid email address' },
                              pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                            })}
                          />
                          {errors.email && <span className="errorMessage">Please enter a valid email address</span>}
                        </div>
                      </div>
                      <div className="mb-3">
                        <textarea
                          name="message"
                          id="comments"
                          className="form-control"
                          cols="40"
                          rows="3"
                          placeholder="Your Message:"
                          spellCheck="false"
                          {...register('message', {
                            required: { value: true, message: 'Please enter your message' },
                          })}
                        ></textarea>
                        {errors.message && <span className="errorMessage">{errors.message.message}</span>}
                      </div>
                      <button className="btn btn-dark my-5" id="submit_cnt" type="submit" disabled={disabled}>
                        Send Message
                      </button>
                    </fieldset>
                  </form>
                  {alertInfo.display && (
                    <div className={`alert alert-${alertInfo.type} alert-dismissible mt-5`} role='alert'>
                      {alertInfo.message}
                      <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='alert'
                        aria-label='Close'
                        onClick={() => setAlertInfo({ display: false, message: '', type: '' })}
                      ></button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className="container">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.746776096385!2d106.77242407609585!3d10.830680489321397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317526ffdc466379%3A0x89b09531e82960d!2zMjAgVMSDbmcgTmjGoW4gUGjDuiwgUGjGsOG7m2MgTG9uZyBCLCBRdeG6rW4gOSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oIDcwMDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1718203546528!5m2!1svi!2s" width="900" height="450" style={{ border: "0px" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;