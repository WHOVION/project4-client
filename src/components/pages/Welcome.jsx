// import userEvent from "@testing-library/user-event"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';

export default function Welcome({currentUser}) {

	const navigate = useNavigate()

	// this where logged in users are redirected
	if (currentUser) {
		navigate("/inventory")
	}

	return (
		<div id='welcome-container'>
			
			{/* image */}
			<div id='welcome-image'style={{ backgroundImage: 'url(https://www.closetsbydesign.com/wp-content/uploads/2019/02/ClosetWI_8_W_CBD-1200x640.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '80vh', opacity: .7 }}>
			</div>
			<div id='messagebtn-container'>
				<div id='welcome-message'>
					<h3>Welcome to StudioFits</h3>
				</div>

				<div id='welcomebtn-container'>
				<button id='welcome-login' href="/login">Log In</button>
				<button id='welcome-signup' href="/register">Sign Up</button>
				</div>
			</div>
				
		</div>
	)
}