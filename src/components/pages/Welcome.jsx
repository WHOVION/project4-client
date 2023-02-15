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
		<div>
			
			{/* image */}
			<div style={{ backgroundImage: 'url(https://www.closetsbydesign.com/wp-content/uploads/2019/02/ClosetWI_8_W_CBD-1200x640.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '80vh', opacity: .7 }}>

				
			</div>


			hello from welcome
			<p>this is what everybody can see when they come to the webiste</p>
			<p>this is will be the Home page if the user is not logged in and will display app details, similar to Hbomax's homepage if you don't an account</p>

			<div>
			<Button variant="primary" href="/login">Log In</Button>{' '}
			<Button variant="primary" href="/register">Sign Up</Button>{' '}
			</div>
		</div>
	)
}