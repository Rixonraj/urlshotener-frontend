import React, { useState } from 'react'
import './LoginStyle.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import appLogo from '../assets/appLogo.jpeg'
import { useFormik } from "formik"
import axios from 'axios'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'

function Newpassword() {
    const navigate = useNavigate()
    const params = useParams()
    const [searchParams] = useSearchParams();
    const [displayLoader, setdisplayLoader] = useState(false)
    const setPasswordForm = useFormik({
        initialValues: {
            username: searchParams.get("name"),
            password: ""
        },
        onSubmit: async (values) => {
            setdisplayLoader(true)
            values['emailToken'] = searchParams.get("emailToken")
            try {
                const user = await axios.put(`${process.env.REACT_APP_BACKENDURL}/updatePassword`, values)
                if (user.data.message === "Success ceated") {
                    setdisplayLoader(false)
                    navigate("/")
                } else {
                    setdisplayLoader(false)
                    alert(user.data.message)
                    
                }
            } catch (error) {
                alert("ERROR! Email Link Expired")
                navigate("/reset")
                console.log(error.message)
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

                                        <form onSubmit={setPasswordForm.handleSubmit}>
                                            <p>Forgot Password ?</p>

                                            <div className="form-outline mb-4">
                                                <input type="email"
                                                    name="username"
                                                    onChange={setPasswordForm.handleChange}
                                                    value={setPasswordForm.values.username}
                                                    id="form2Example11" className="form-control"
                                                    placeholder="Phone number or email address" />
                                                <label className="form-label" htmlFor="form2Example11">Username</label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password"
                                                    name="password"
                                                    onChange={setPasswordForm.handleChange}
                                                    value={setPasswordForm.values.password}
                                                    className="form-control"
                                                    placeholder="Phone number or email address" />
                                                <label className="form-label" htmlFor="form2Example11">Password</label>
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

export default Newpassword