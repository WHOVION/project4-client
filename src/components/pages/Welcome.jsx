// import userEvent from "@testing-library/user-event"
import { useNavigate } from "react-router-dom"
export default function Welcome({currentUser}) {

	const navigate = useNavigate()

	// this where logged in users are redirected
	if (currentUser) {
		navigate("/inventory")
	}

	return (
		<div>
			hello from welcome
			<p>this is what everybody can see when they come to the webiste</p>
			<p>this is will be the Home page if the user is not logged in and will display app details, similar to Hbomax's homepage if you don't an account</p>
		</div>
	)
}