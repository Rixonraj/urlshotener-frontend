import axios from 'axios';
import React from 'react'
import { useEffect } from 'react'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'

function Emailverify() {
    const navigate = useNavigate()
    const params = useParams()
    const [searchParams] = useSearchParams();
    // searchParams.get("emailToken")
    useEffect(() => {
        try {
            const values = { emailToken: searchParams.get("emailToken") }
            console.log("values:",values,"params",params.id)
            axios.put(`${process.env.REACT_APP_BACKENDURL}/emailVerification/${params.id}?${createSearchParams(values)}`).then((transaction) => {
                if (transaction.data.message === 'Email Verified!') {
                    alert("Email Verified!" )
                    navigate(`/`)

                } else {
                    navigate(`/register`)
                }
            }
            );
        } catch (error) {
            alert(error)
        }


    }, [])
    return (
        <div>Emailverify</div>
    )
}

export default Emailverify