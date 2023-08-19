import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function GoTo() {
  const param = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    //redirect to actual url in id
    axios.put(`${process.env.REACT_APP_BACKENDURL}/goto/${param.id}`).then((docs) => {
      if (docs.data.message == "Success redirect") {
        window.open(docs.data.urldoc.actualurl)
        window.close() //FOR AUTO CLOSE
      } else {
        window.alert(docs.data.urldoc.message)
      }
    }).catch((err) => {
      // window.alert(err)
      window.alert(err.message)
      
      navigate('/')
      // window.alert(docs.urldoc.message)
    })

  }, [])

  return (
    <div>if dosent redirect PLEASE ALLOW POPUP

      <div class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div>
    </div>

  )
}

export default GoTo