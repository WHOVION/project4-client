import { useNavigate, Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = () => {
    const [ search, setSearch ] = useState('')
    const [fit, setFit] = useState()
    const [filteredFits, setFilteredFits] = useState(fit)
    
    const handleChange = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
        // console.log('Search button')
    }

    const [state, setState] = useState({
        query: '',
        list: []
    })
    
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
							Navigate('/login')
						}
					}
				}
			}
			fetchData()
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
                <p>{fit.type}</p>
            </div>
        )
    })

    const filteredList = (e) => {
        const query = e.target.value 
        const updatedList = [...filteredFits]
        updatedList = fitComponents.filter((fit) => {
            return fit.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
        setFilteredFits(updatedList)
    }

    return ( 
        
        <div className="search-container">

            <div className='search-title'>
                <p>Search Closet</p>
            </div>
            <form>
                <div className='search-bar'>
                    <div className='dropdown'>
                        <label htmlFor='type'>Filter</label>
                        <select 
                        className='dropdown-content'
                        onChange={e => setSearch({ ...search, type: e.target.value, filteredList })}
                        defaultValue='clothing'
                        >
                            <option value='clothing' disabled>Select</option>
                            <option>Shirts</option>
                            <option>Pants</option>
                            <option>Shoes</option>
                        </select>
                    </div>
                    <input type="text" placeholder=""/><button onClick={handleChange}>Search</button>
                </div>
            </form>
            {fitComponents}
            <ol>
                {filteredFits?.map((fit, idx) => {
                    <li key={`fit-${idx}`}>{fit}</li>
                })}
            </ol>
            
        </div>
        
     );
}
 
export default Search;