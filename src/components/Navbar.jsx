import { Link } from 'react-router-dom'
import "../App.css"
import Nav from 'react-bootstrap/Nav';

export default function Navbar({ currentUser, handleLogout }) {
	//  const loggedIn = (
	// 	<>
	// 		{/* if the user is logged in... */}
	// 		<Link to="/">
	// 			<span onClick={handleLogout}>logout</span>
	// 		</Link>

	// 		<Link to="/profile">
	// 			profile
	// 		</Link>
	// 	</>
	//  )

	//  const loggedOut = (
	// 	<>
	// 		{/* if the user is not logged in... */}
	// 		<Link to="/register">
	// 			register
	// 		</Link>

	// 		<Link to="/login">
	// 			login
	// 		</Link>
	// 	</>
	//  )

	return (
		<nav>
			{/* user always sees this section */}
			<div className='Navbar'>
			<Nav variant="pills" className="justify-content-center" defaultActiveKey="/home" style={{ gap: '30px' }}>
				<Nav.Item>
					<Nav.Link href="/inventory" style={{ border: '3px outset gray', backgroundColor: '#2F4050' }}>Inventory</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link href='/search' style={{ border: '3px outset gray', backgroundColor: '#2F4050' }}>Search</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link href='/create' style={{ border: '3px outset gray', backgroundColor: '#2F4050' }}>Create</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link href='/' onClick={handleLogout} style={{ border: '3px outset gray', backgroundColor: '#2F4050' }}>Logout</Nav.Link>
				</Nav.Item>
			</Nav>

			</div>



			{/* {currentUser ? loggedIn : loggedOut} */}
		</nav>
	)
}