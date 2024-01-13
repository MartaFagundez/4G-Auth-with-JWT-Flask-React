import React, { useContext, useEffect } from "react";
import "../../styles/home.css";

import { useUserContext } from "../contexts/userContext";
import { fetchUser } from "../../client-API/backendAPI";

export const Home = () => {
	const {store} = useUserContext();
	const isLogged = Object.keys(store.user).length > 0;

	return (
		<div className="text-center mt-5">
			<h1>Home</h1>
			<h2>Welcome {isLogged ? store.user.username : "Guest"}!</h2>
		</div>
	);
};
