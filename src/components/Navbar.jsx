import { Link } from 'react-router-dom'
import "../App.css"

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
				<Link to="/inventory" className='navlink'>
					<p>Inventory</p>
				</Link>

				<Link to="/search" className='navlink'>
					<p>Search</p>
				</Link>
				<Link to="/create" className='navlink'>
					<p>Create</p>
				</Link>
				<Link to="/" onClick={handleLogout} className='navlink'>
					<p>Logout</p>
				</Link>
			</div>



			{/* {currentUser ? loggedIn : loggedOut} */}
		</nav>
	)
}