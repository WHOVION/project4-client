import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

const Search = () => {
    const [ search, setSearch ] = useState('')
    
    const handleChange = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
        // console.log('Search button')
    }

    const [state, setState] = useState({
        query: '',
        list: []
    })

    //localStorage = web storage object that allows JS sites and apps to keep key-value pairs in web browser with no expiration date; enables developers to store and retrieve data in the browser - not good practice since data will be lost if the user clears cache
        //in this case, we are storing the jwt 

        const token = localStorage.getItem('jwt')
        if(!token) {
            return <Navigate to="/login" />
        }
        const decoded = jwtDecode(token)
        console.log(decoded.id)

    return ( 
        <div className="search-container">

            <div className='search-title'>
                <p>Search Closet</p>
            </div>
            <form>
                <div className='search-bar'>
                    <div className='dropdown'>
                        <label htmlFor='type'>Filter</label>
                        <select className='dropdown-content'>
                            <option 
                            value='shirts'
                            >
                                Shirts
                            </option>
                            <option 
                            value='pants'
                            >
                                Pants
                            </option>
                            <option 
                            value='shoes'
                            >
                                Shoes
                            </option>
                        </select>
                    </div>
                    <input type="text" placeholder=""/><button onClick={handleChange}>Search</button>
                </div>
            </form>
            
            
        </div>
        
     );
}
 
export default Search;