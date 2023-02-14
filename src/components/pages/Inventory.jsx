import { useNavigate, Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Inventory(){
    const [fit, setFit] = useState()
    const navigate = useNavigate()

    useEffect(() => {
		const fetchData = async () => {
				try {
					// get the token from local storage
					const token = localStorage.getItem('jwt')
					// hit the auth locked endpoint
					const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/inventory`, {headers: {'Authorization': token}})
                    setFit(response.data)
                    // this console logs all dbs clothes
                    console.log(response.data)
				} catch (err) {
					// if the error is a 401 -- that means that auth failed
					console.warn(err)
					if (err.response) {
						if (err.response.status === 401) {
							// send the user to the login screen
							navigate('/login')
						}
					}
				}
			}
			fetchData()
	}, [])

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