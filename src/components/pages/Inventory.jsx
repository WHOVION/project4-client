import { useParams, useNavigate, Navigate, Form } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import Cards from './Cards'
import 'bootstrap/dist/css/bootstrap.min.css';
import EditForm from './EditForm'

export default function Inventory(){
    const [fit, setFit] = useState()


    const navigate = useNavigate()

	// let { id } = useParams()

    useEffect(() => {
		const fetchData = async () => {
				try {
					// get the token from local storage
					const token = localStorage.getItem('jwt')
					// hit the auth locked endpoint
					const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/inventory`, {headers: {'Authorization': token}})
                    setFit(response.data)
                    // this console logs all dbs clothes
                    // console.log(response.data, 'ehy')
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


	const handleDeleteClick = async (idx) => {
		console.log(idx, 'sdlfhjlasghsj')
		try {
			// obtaining authorization
			const token = localStorage.getItem('jwt')

			// request the server delete
			const url = `${process.env.REACT_APP_SERVER_URL}/api-v1/inventory/${idx}`
			console.log(url)
			await axios.delete(url, {headers: {'Authorization': token}})
			
			// if the update succeeds, get delete to update in 
			// axios.get on inventory setFit
			const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/inventory`, {headers: {'Authorization': token}});
			// update page
			setFit(response.data)
			// set state on inventory
		} catch(err) {
			console.log(err)
		}
	}


	// better to make cards in new component, copy div and send as prop
	// === !! CARDS !! === //
	const fitComponents = fit?.map((fitElement, idx) => {
		// console.log(idx)
        return(
			<Cards 
				key={`fit-${idx}`}
				idx={idx}
				fitElement={fitElement}
				fit={fit}
				setFit={setFit}
				handleDeleteClick={handleDeleteClick}
			/>
        )
    })

	// <EditForm fit={fit} />
	// make a new state for EditFit, default will be null
	// inside of map, if fit._id is equal to my EditFit State, render EditForm and pass fit as prop
	// when click on edit button, set EditFit state to that fits id
	
	
    return(
        <div>
            <h1><center>Inventory</center></h1>

		<div>
			{fitComponents}
		</div>
        </div>
    )
}