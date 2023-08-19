import React, { useEffect, useRef, useState } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import appLogo from '../assets/appLogo.jpeg'
import { useFormik } from "formik"
import axios from 'axios'
import { Link, createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import { useContext } from 'react'

function Home() {
  const userId = useContext(UserContext)
  const [shortenedUrl, setshortenedUrl] = useState("")
  const params = useParams()
  const navigate = useNavigate()
  let param = new URLSearchParams(document.location.search);
  const [tableData, setTableData] = useState([{ createdAt: "", clicks: "", _id: "", actualurl: "" }])
  const [pageNumberCount, setpageNumberCount] = useState([])

  const tablefetchdata = async () => {
    // gateher table data
    let page = { page: param.get("page") };
    await axios.get(`${process.env.REACT_APP_BACKENDURL}/tableData/${params.userid}?${createSearchParams(page)}`,
      {
        headers: {
          "Authorization": localStorage.getItem("session")
        }
      }
    ).then((docs) => {
      if (docs.data.message === "Success") {
        setTableData(docs.data.tabledocs)
      }
    })
      .catch((error) => { alert(error.message); console.log("ERROR:", error) })

  }
  const fetchTableDataCount = async () => {
    await axios.get(`${process.env.REACT_APP_BACKENDURL}/totalTableData/${params.userid}`,
      {
        headers: {
          "Authorization": localStorage.getItem("session")
        }
      }
    ).then((docs) => {
      if (docs.data.message === "Success") {
        const counttemp = Math.ceil(docs.data.totalDocs / 10)
        // const counttemp = 10
        const pageArray = []
        for (let index = 0; index < counttemp; index++) {
          pageArray.push(index + 1)

        }
        setpageNumberCount(pageArray)
      }
    })
      .catch((error) => { alert(error.message); console.log("ERROR:", error) })
  }
  useEffect(() => {
    tablefetchdata()
    fetchTableDataCount()
  }, [])


  // setTableData([tableData])
  const urlForm = useFormik({
    initialValues: {
      url: ""
    },
    validate: (values) => {
      let error = {};
      if (values.url === "") {
        error.url = "please enter a URL"
      }
      return error;
    },
    onSubmit: async (values) => {
      try {
        const urlGenerate = await axios.post(`${process.env.REACT_APP_BACKENDURL}/generate_url/${params.userid}`,
          { values },
          {
            headers: {
              "Authorization": localStorage.getItem("session")
            }
          }
        );
        alert(urlGenerate.data.message)
        if (urlGenerate.data.message === "Success ceated") {
          setshortenedUrl(`${process.env.REACT_APP_FRONTENDURL}/goto/${urlGenerate.data.urlId}`)
          values.url = ""
        } else {
          alert(urlGenerate.data.message)
        }
      } catch (error) {
        console.log("ERROR:", error)
        alert(error.message)
      }
      console.log("values", values)
      tablefetchdata();
    }
  })

  const handleRedirect = (e) => {
    e.preventDefault();
    window.open(shortenedUrl);
  }
  const handleRedirecturl = (data) => {
    // e.preventDefault();
    // console.log(e.target)
    window.open(data);
  }

  const handlePage = async (pageNum) => {
    // gateher table data
    let paged = { page: pageNum - 1 };
    navigate(`/home/${params.userid}?${createSearchParams(paged)}`)
    await axios.get(`${process.env.REACT_APP_BACKENDURL}/tableData/${params.userid}?${createSearchParams(paged)}`,
      {
        headers: {
          "Authorization": localStorage.getItem("session")
        }
      }
    ).then((docs) => {
      console.log(docs)
      if (docs.data.message === "Success") {
        setTableData(docs.data.tabledocs)
      }
    })
      .catch((error) => { alert(error.message); console.log("ERROR:", error) })

  }

  const handleLogout = () => {
    localStorage.removeItem("session")
    navigate("/")
  }


  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="navbar-brand d-flex" style={{ paddingLeft: "100px" }}>
          <img src={appLogo} width="60px" height="60px" className="d-inline-block align-top" alt="" />
          <div style={{ paddingTop: "5px", fontSize: "30px" }}>
            Url Shortner
          </div>
        </div>
        <button className='btn btn-danger' style={{ marginRight: "50px" }} onClick={() => handleLogout()} type="submit">Log Out</button>
      </nav>
      <div className='container'>
        <div className='row mt-5'>
          <div className='card row '>

            <div className='card-body'>
              <h5 className='card-title'>Short the URL</h5>
              <p className='card-text'> input boxes form</p>
              <form onSubmit={urlForm.handleSubmit}>
                <div className="input-group input-group-lg">
                  <input type="text"
                    name="url"
                    onChange={urlForm.handleChange}
                    value={urlForm.values.url}
                    className={`form-control ${urlForm.touched.url && urlForm.errors.url ? "error-box" : ""} ${urlForm.touched.url && !urlForm.errors.url ? "success-box" : ""}`}
                    aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                  <button className='btn btn-primary' type={"submit"}>Submit</button>
                </div>
                {
                  urlForm.touched.url && urlForm.errors.url ? <span style={{ color: 'red' }}>{urlForm.errors.url}</span> : null
                }
              </form>
              <p className='card-text mt-2'> Shortened URL : {shortenedUrl === "" ? <span>------</span> : <span style={{ color: "red", cursor: "pointer" }} onClick={handleRedirect}>{shortenedUrl}</span>}</p>
            </div>
          </div>
          <div className='card row mt-5'>

            <div className='card-body'>
              <h5 className='card-title'>My Urls</h5>
              <table className='table'>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Date</th>
                    <th>Actual URL</th>
                    <th>Short URL</th>
                    <th>No of times Clicked</th>
                  </tr>
                </thead>
                <tbody>

                  {tableData.map((rowdata, index) => {
                    return <tr>
                      <td>{index + 1}</td>
                      <td>{new Date(rowdata.createdAt).toLocaleDateString()}</td>
                      <td style={{ color: "blue", cursor: "pointer" }} onClick={() => handleRedirecturl(rowdata.actualurl)} value={rowdata.actualurl} >{rowdata.actualurl}</td>
                      <td style={{ color: "red", cursor: "pointer" }} onClick={() => handleRedirecturl(`${process.env.REACT_APP_FRONTENDURL}/goto/${rowdata._id}`)} value={`${process.env.REACT_APP_FRONTENDURL}/goto/rowdata._id`}>{`${process.env.REACT_APP_FRONTENDURL}/goto/${rowdata._id}`}</td>
                      <td>{rowdata.clicks}</td>
                    </tr>
                  })}


                </tbody>

                <tfoot>


                  <tr>
                    <th>s.no</th>
                    <th>Date</th>
                    <th>Actual URL</th>
                    <th>Short URL</th>
                    <th>No of times Clicked</th>
                  </tr>
                </tfoot>
              </table>
              <div className='pagebox'>
                <ul class="pagination">
                  {
                    pageNumberCount.map((pageNum, index) => {
                      return <li class="page-item"><div class="page-link" onClick={() => handlePage(pageNum)}>{pageNum}</div></li>
                    })
                  }
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}

export default Home