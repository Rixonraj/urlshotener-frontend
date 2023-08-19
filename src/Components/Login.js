import React, { useState } from 'react'
import './LoginStyle.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import appLogo from '../assets/appLogo.jpeg'
import { useFormik } from "formik"
import axios from 'axios'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import { useContext } from 'react'
function Login() {
    const userId = useContext(UserContext)
    const navigate = useNavigate()
    const [displayLoader, setdisplayLoader] = useState(false)

    const loginForm = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validate: (values) => {
            let error = {};
            if (values.username === "") {
                error.username = "please enter a User Name"
            }
            if (values.password === "") {
                error.password = "please enter Password"
            }
            return error;
        },
        onSubmit: async (values) => {
            try {
                setdisplayLoader(true)
                const user = await axios.post(`${process.env.REACT_APP_BACKENDURL}/user/login`, values)
                if (user.data.message === "Success Auth") {
                    localStorage.setItem("session", user.data.token)
                    userId.setcounter(user.data.user_id)
                    const searchValues = {
                        page: 0
                    }
                    navigate(`/home/${user.data.user_id}?${createSearchParams(searchValues)}`)
                    // const context = useContext(UserContext)
                    // navigate({ pathname: `/home/${user.data.user_id}`, search: `?${createSearchParams(userId.transactionDate)}` });
                } else {
                    alert(user.data.message)
                }
                setdisplayLoader(false)
            } catch (error) {
                console.log("ERROR:", error)
                setdisplayLoader(false)
                alert(error.message)
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

                                        <form onSubmit={loginForm.handleSubmit}>
                                            <p>Please login to your account</p>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Username</label>
                                                <input type="email"
                                                    name="username"
                                                    onChange={loginForm.handleChange}
                                                    value={loginForm.values.username}
                                                    id="form2Example11" 
                                                    className={`form-control ${loginForm.touched.username && loginForm.errors.username ? "error-box" : ""} ${loginForm.touched.username && !loginForm.errors.username ? "success-box" : ""}`}
                                                    placeholder="Phone number or email address" />
                                                {
                                                    loginForm.touched.username && loginForm.errors.username ? <span style={{ color: 'red' }}>{loginForm.errors.username}</span> : null
                                                }
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example22">Password</label>
                                                <input type="password"
                                                    name="password"
                                                    onChange={loginForm.handleChange}
                                                    value={loginForm.values.password}
                                                    id="form2Example22" 
                                                    className={`form-control ${loginForm.touched.password && loginForm.errors.password ? "error-box" : ""} ${loginForm.touched.password && !loginForm.errors.password ? "success-box" : ""}`} />
                                                {
                                                    loginForm.touched.password && loginForm.errors.password ? <span style={{ color: 'red' }}>{loginForm.errors.password}</span> : null
                                                }
                                            </div>

                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" disabled={displayLoader} type={"submit"}>Log
                                                    in</button>
                                                <div className={"spinner-border center " + (displayLoader === true ? "d-block" : "d-none")} role="status" >
                                                    <span class="sr-only"></span>
                                                </div>
                                                <br />
                                                <Link to={`/reset`} className="text-muted">Forgot password?</Link>
                                            </div>

                                            <div className="d-flex align-items-center justify-content-center pb-4">
                                                <p className="mb-0 me-2">Don't have an account?</p>
                                                <Link to={`/register`} className="btn btn-outline-danger">Create new</Link>
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

export default Login