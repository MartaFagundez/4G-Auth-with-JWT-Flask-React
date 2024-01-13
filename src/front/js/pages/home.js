import React, { useContext, useEffect } from "react";
import "../../styles/home.css";

import { useUserContext } from "../contexts/userContext";
import { fetchUser } from "../../client-API/backendAPI";

export const Home = () => {
	const {store} = useUserContext();
	const isLogged = Object.keys(store.user).length > 0;

	return (
		<div className="d-flex flex-column align-items-center">
			<h1 className="text-center my-5">Home</h1>
			<h2 className="text-center display-1">Welcome
				<br/>
				<span className={isLogged ? "fw-bold" : ""}>
					{isLogged ? store.user.username : "Guest"}
				</span>!
			</h2>
		</div>
	);
};
