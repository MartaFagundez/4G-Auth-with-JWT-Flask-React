import React from "react";
import { Link } from "react-router-dom";
import NavButton from "../component/navButton.jsx";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">FullStack Auth with JWT</span>
				</Link>
				<div className="ml-auto">
					<NavButton route="/signup" text="Signup"/>
					<NavButton route="/login" text="Login"/>
				</div>
			</div>
		</nav>
	);
};
