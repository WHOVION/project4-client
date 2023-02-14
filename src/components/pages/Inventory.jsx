import { useNavigate, Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';


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

	// === !! CARDS !! === //
	const fitComponents = fit?.map((fit, idx) => {
        return(
            <div key={`fit-${idx}`}>
				<Card style={{ width: '18rem' }}>
					<Card.Body>
						<Card.Title>{fit.nickname}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">{fit.type}</Card.Subtitle>
						<Card.Text>
						In storage: {fit.status} <br/>
						Had Since: {fit.createdAt}
						</Card.Text>
						<Card.Link href="#">
							<button>Edit</button>
						</Card.Link>
						<Card.Link href="#">
							<button >Delete</button>
						</Card.Link>
					</Card.Body>
				</Card>
                {/* <h2>{fit.nickname}</h2> */}
            </div>
        )
    })

	// const handleDeleteClick = async () => {
	// 	try {
	// 		// requrest the server delete
	// 		await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/inventory/${idx}}`)
	// 		// if the update succeeds, get depete to update in 
	// 	} catch(err) {
	// 		console.log(err)
	// 	}
	// }
	
    return(
        <div>
			
            <h1>Inventory</h1>
            {fitComponents}
        </div>
    )
}