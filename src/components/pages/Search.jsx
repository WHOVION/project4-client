import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import ListSearch from './ListSearch'
import InputSearch from './InputSearch'

const Search = () => {
    const [fit, setFit] = useState([]) 
    const [originalFit, setOriginalFit] = useState([])

    // const [ fitsToDisplay, setFitsToDisplay ] = useState([])
    // const [ filterValue, setFilterValue  ] = useState('')
 
    // make a reset button, resets filter value to empty string, call fetch data again
    const navigate = useNavigate()
    //localStorage = web storage object that allows JS sites and apps to keep key-value pairs in web browser with no expiration date; enables developers to store and retrieve data in the browser - not good practice since data will be lost if the user clears cache
        //in this case, we are storing the jwt 
    const token = localStorage.getItem('jwt')
    // if(!token) {
    //     return <Navigate to="/login" />
    // }
    // const decoded = jwtDecode(token)
    // console.log(decoded.id)

    // --search button 
    const handleChange = (e) => {
        e.preventDefault()
        
        // console.log('Search button')
    }


    useEffect(() => {
		const fetchData = async () => {
            try {
                // get the token from local storage
                // const token = localStorage.getItem('jwt')
                // hit the auth locked endpoint
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/inventory`, {headers: {'Authorization': token}})
                setFit(response.data)
                setOriginalFit(response.data)
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

    // const handleFilterChange = async (e) => {
    //     try {
    //     e.preventDefault()
    //     const filteredClothes = fitsToDisplay.filter(piece => {
    //         return piece.nickname.toLowerCase().includes(e.target.value.toLowerCase())
    //     })
    //     // this controls state from input
    //     setFilterValue(e.target.value)
    //     setFitsToDisplay(filteredClothes)
    //     } catch (error) {
    //         console.warn(error)
    //     }
    // }
    

    // const filteredList = (e) => {
    //     const query = e.target.value 
    //     // console.log(`query ${query}`)
    //     const updatedList = fit?.filter((fit) => {
    //         // console.log(`fit.type${fit.type}`)
    //         return fit.type === query 
    //     })
    //     setFit(updatedList)
    // }

    const filteredList = (e) => {
        const query = e.target.value 
        if (query === 'All') {
          setFit(originalFit)
        } else {
          const updatedList = originalFit?.filter((fit) => {
            return fit.type === query 
          })
          setFit(updatedList)
        }
    }

    const fitComponents = fit?.map((fit, idx) => {
        return(
            <div key={`fit-${idx}`}>
                <h2>{fit.nickname}</h2>
                <p>{fit.type}</p>
            </div>
        )
    })

    if(!token) {
        return <Navigate to="/login" />
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
                        onChange={ filteredList }
                        >
                            <option>All</option> 
                            <option>Shirts</option>
                            <option>Pants</option>
                            <option>Shoes</option>
                        </select>
                    </div>
                    <input type="text" placeholder=""/><button onClick={handleChange}>Search</button>
                </div>
            </form>

            {fitComponents}

            {/* <InputSearch
                value={filterValue}
                handleFilterChange={handleFilterChange}
            />
            <h1>Your filtered</h1>
            <ListSearch
                pieces={fitsToDisplay}
            /> */}
        </div>
        
     );
}
 
export default Search;
