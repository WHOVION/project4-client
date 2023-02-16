import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
// import jwtDecode from 'jwt-decode'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import Cards from './Cards'
import 'bootstrap/dist/css/bootstrap.min.css';
const options = ['All', 'Shirts', 'Pants', 'Shoes']

const Search = () => {
  const [fitsToDisplay, setFitsToDisplay] = useState([])
  const [filter, setFilter] = useState({ nickname: '', type: 'All' })
//   const [query, setQuery] = useState(options[0])

  const navigate = useNavigate()
  const token = localStorage.getItem('jwt')

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/inventory`,{ headers: { Authorization: token } })
      setFitsToDisplay(response.data)
    } catch (err) {
      console.warn(err)
      if (err.response) {
        if (err.response.status === 401) {
          navigate('/login')
        }
      }
    }
  }
  useEffect(() => {fetchData()
}, [])

// handleDelete button function
const handleDeleteClick = async (idx) => {
  try {
    // request the server delete
    const url = `${process.env.REACT_APP_SERVER_URL}/api-v1/inventory/${idx}`
    console.log(url)
    await axios.delete(url, {headers: {'Authorization': token}}) 
    // if the update succeeds, get delete to update in 
    // axios.get on inventory setFit
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/inventory`, {headers: {'Authorization': token}});
    // update page
    setFitsToDisplay(response.data)
    // set state on inventory
  } catch(err) {
    console.log(err)
  }
}

  const handleReset = () => {
    setFilter({ nickname: '', type: 'All' })
  }

  if (!token) {
    return <Navigate to="/login" />
  }
  const filteredFits = fitsToDisplay.filter((fit) => {
    return (
      fit.nickname.toLowerCase().includes(filter.nickname.toLowerCase()) && (filter.type === 'All' || fit.type === filter.type))
  })

  const fitComponents = filteredFits.map((fit, id) => {
    return (
      // <div key={`fit-${id}`}>
      //   <h1>{fit.nickname}</h1>
      //   <p>{fit.type}</p>
      // </div>
      <Cards 
      key={`fit-${id}`}
				idx={id}
				fit={fit}
				setFit={setFitsToDisplay}
        handleDeleteClick={handleDeleteClick}
      />
    )
  })

  return (
    <div className="search-container">
      <div className="search-title">
        <h1>Search Closet</h1>
      </div>

      <input
        type="text"
        onChange={(e) => {
          setFilter({ ...filter, nickname: e.target.value })
        }}
        value={filter.nickname}
      />
      <select
        onChange={(e) => {
          setFilter({ ...filter, type: e.target.value })
        }}
        value={filter.type}
      >
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          )
        })}
      </select>
      <button onClick={handleReset}>Reset</button>

      <div>
        {fitComponents}
      </div>
    </div>
  )
}

export default Search