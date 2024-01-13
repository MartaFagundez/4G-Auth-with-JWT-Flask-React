import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../contexts/userContext";
import { login, fetchUser} from "../../client-API/backendAPI";

export default function Login() {
    const {actions} = useUserContext();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const token = await login(email, password);
        actions.setToken(token);
        localStorage.setItem('token', token);

        const user = await fetchUser(token);
		actions.setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        navigate("/");
    }

    return (
        <div className="container">
            <div className="d-flex flex-column align-items-center">
                <h1 className="text-center my-5">Login</h1>
                <form className="w-100" style={{maxWidth: "500px"}} onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pass" className="form-label">Password</label>
                        <input type="password" className="form-control" id="pass" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
}