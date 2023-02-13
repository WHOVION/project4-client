import { useNavigate, Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Inventory(){
    const [fit, setFit] = useState()

    const fetchFits = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/inventory`)
            setFit(response.data)
        } catch(err) {
            console.warn(err)
        }
    }

    useEffect (() => {
		fetchFits()
	}, [])

    //localStorage = web storage object that allows JS sites and apps to keep key-value pairs in web browser with no expiration date; enables developers to store and retrieve data in the browser - not good practice since data will be lost if the user clears cache
        //in this case, we are storing the jwt 

    const token = localStorage.getItem('jwt')
    if(!token) {
        return <Navigate to="/login" />
    }
    const decoded = jwtDecode(token)
    console.log(decoded.id)

    const fitComponents = fit?.map((fit, idx) => {
        return(
            <div key={`fit-${idx}`}>
                <h2>{fit.nickname}</h2>
            </div>
        )
    })

    return(
        <div>
            <h1>Inventory</h1>
            {fitComponents}
        </div>
    )
}