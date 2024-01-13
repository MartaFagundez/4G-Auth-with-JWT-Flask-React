import React, { useContext, useEffect } from "react";
import "../../styles/home.css";

import { useUserContext } from "../contexts/userContext";
import { fetchUser } from "../../client-API/backendAPI";

export const Home = () => {
	const {store, actions} = useUserContext();
	console.log(store.user);

	useEffect(function() {
		async function getUser() {
			const user = await fetchUser(store.token);
			actions.setUser(user);
		}
		if (store.token !== "" && Object.keys(store.user).length === 0) {
			getUser();
		}

	}, []);

	return (
		<div className="text-center mt-5">
			<h1>Home</h1>
			<h2>Welcome {Object.keys(store.user).length > 0 ? store.user.username : "Guest"}!</h2>
		</div>
	);
};
