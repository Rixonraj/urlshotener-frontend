import React, { useState } from 'react'
import './LoginStyle.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import appLogo from '../assets/appLogo.jpeg'
import { useFormik } from "formik"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
function Forgotpassword() {
    const navigate = useNavigate()
    const [displayLoader, setdisplayLoader] = useState(false)
    const registerForm = useFormik({
        initialValues: {
            username: ""
        },
        validate: (values) => {
            let error = {};
            if (values.username === "") {
                error.username = "please enter a username"
            }
            return error;
        },
        onSubmit: async (values) => {
            setdisplayLoader(true)
            try {

                const user = await axios.put(`${process.env.REACT_APP_BACKENDURL}/forgotpassword`, values)
                if (user.status == 200) {
                    alert("Email Sent Please Check")
                    setdisplayLoader(false)
                    navigate("/")
                } else {
                    alert(user.data.message)
                    setdisplayLoader(false)
                }
            } catch (error) {
                alert(error.message)
                setdisplayLoader(false)
            }
        }
    })
    return (

        <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-12">
                                    <div className="card-body p-md-5 mx-md-4">

                                        <div className="text-center">
                                            <img src={appLogo}
                                                style={{ width: "185px" }} alt="logo" />
                                            <h4 className="mt-1 mb-5 pb-1">URL Shortner</h4>
                                        </div>

                                        <form onSubmit={registerForm.handleSubmit}>
                                            <p>Forgot Password ?</p>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Username</label>
                                                <input type="email"
                                                    name="username"
                                                    onChange={registerForm.handleChange}
                                                    value={registerForm.values.username}
                                                    id="form2Example11"
                                                    className={`form-control ${registerForm.touched.username && registerForm.errors.username ? "error-box" : ""} ${registerForm.touched.username && !registerForm.errors.username ? "success-box" : ""}`}
                                                    placeholder="Phone number or email address" />
                                                {
                                                    registerForm.touched.username && registerForm.errors.username ? <span style={{ color: 'red' }}>{registerForm.errors.username}</span> : null
                                                }
                                            </div>

                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-2" disabled={displayLoader} type={"submit"}>Reset Password</button>
                                                <div className={"spinner-border center " + (displayLoader === true ? "d-block" : "d-none")} role="status" >
                                                    <span class="sr-only"></span>
                                                </div>
                                                <br />
                                                <p className='mb-2'>OR</p>
                                                <br />
                                                <Link to={`/`} className="btn  btn-outline-danger">Sign in</Link>

                                            </div>


                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Forgotpassword