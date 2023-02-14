import * as React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

const Create = () => {
    // state that holds the value the user has typed in
    const [form, setForm] = useState ({
        //intialize all values as empty strings because a new outfit is being created
        nickname: '',
        type: '',
    })

    //invoke useNavigate hook to use a navigate function
    const navigate = useNavigate()

    //localStorage = web storage object that allows JS sites and apps to keep key-value pairs in web browser with no expiration date; enables developers to store and retrieve data in the browser - not good practice since data will be lost if the user clears cache
        //in this case, we are storing the jwt 

    const token = localStorage.getItem('jwt')
    if(!token) {
        return <Navigate to="/login" />
    }
    const decoded = jwtDecode(token)
    console.log(decoded.id)

    //submit handler function that posts the form data from state to the backend
    const handleSubmit = (e) => {
        e.preventDefault()
        const formCopy = { ...form, user: decoded.id }
        // take form data from the state, post it to the backend with axios
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/create`, formCopy) 
            .then(response => {
                console.log(response.data)
                //once backend gets back to us, navigate to the inventory 
                navigate('/inventory')
            })
            .catch(console.warn) 
    }


    return ( 
        <div>
            <form onSubmit={handleSubmit}>

                <div>
                    
                    <label htmlFor='nickname'>Nickname:</label>
                    <input 
                        type='text'
                        id='nickname'
                        placeholder='Set Nickname'
                        name={form.nickname}
                        onChange={ e => setForm({ ...form, nickname: e.target.value}) }
                    />
                    {/* pants shoes shirt */}

                    <div className='dropdown'>
                        <label htmlFor='type'>Type of Clothing</label>
                        <select className='dropdown-content'>
                            <option 
                            onClick={e => setForm({ ...form, nickname: e.target.value})}
                            value={form.type}
                            >
                                Shirts
                                </option>
                            <option 
                            onClick={e => setForm({ ...form, nickname: e.target.value})}
                            value={form.type}
                            >
                                Pants
                            </option>
                            <option 
                            onClick={e => setForm({ ...form, nickname: e.target.value})}
                            value={form.type}
                            >
                                Shoes
                                </option>
                        </select>
                    </div>

                    
                    <button type='submit'>Create Outfit</button>               
                </div>
            </form>
        </div>
     );
}
 
export default Create;