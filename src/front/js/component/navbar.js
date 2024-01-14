import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUserContext } from "../contexts/userContext";
import NavButton from "../component/navButton.jsx";

export const Navbar = () => {
	const {store, actions} = useUserContext();
	const navigate = useNavigate();

	const isLogged = Object.keys(store.user).length > 0;

	function handleLogout() {
		actions.setToken("");
    	localStorage.removeItem("token");
		actions.setUser({});
		localStorage.removeItem("user");
		navigate("/login");
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					<NavButton 
						route={isLogged ? "/profile" : "/signup"} 
						text={isLogged ? "Profile" : "Sign up"}
					/>
					{ !isLogged && <NavButton route="/login" text="Log in"/> }
					{ isLogged && <button className="btn btn-danger" onClick={handleLogout}>Logout</button> }
				</div>
			</div>
		</nav>
	);
};
