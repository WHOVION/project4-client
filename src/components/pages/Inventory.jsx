import { useNavigate, Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

export default function Inventory(){

    //localStorage = web storage object that allows JS sites and apps to keep key-value pairs in web browser with no expiration date; enables developers to store and retrieve data in the browser - not good practice since data will be lost if the user clears cache
        //in this case, we are storing the jwt 

    const token = localStorage.getItem('jwt')
    if(!token) {
        return <Navigate to="/login" />
    }
    const decoded = jwtDecode(token)
    console.log(decoded.id)

    return(
        <>
            <p>This is our inventory</p>
            <p>carosel of specific thaaangs; only seen if logged in</p>
        </>
    )
}