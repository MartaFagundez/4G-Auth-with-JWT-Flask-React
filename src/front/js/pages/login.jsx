import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../contexts/userContext";
import { login, fetchUser} from "../../client-API/backendAPI";

export default function Login() {
    const {actions} = useUserContext();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [loginError, setLoginError] = useState("");

    const isFormValid = email.includes("@") && password.length >= 6;

    // Variable de referencia para rastrear el estado de montaje del componente
    const mountRef = useRef(true);

    useEffect(() => {

        return () => {
          // Establecer la variable de referencia en false al desmontar el componente
          mountRef.current = false;
        };
    }, []);

    function handleEmailChange(e) {
        setEmail(e.target.value);
        if (e.target.value.length === 0) {
            setEmailError("Email is required.");
        }
        else if (!e.target.value.includes("@")) {
            setEmailError("Enter a valid email.")
        }
        else {
            setEmailError("");
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true); // Activar el spinner durante la carga
        setLoginError("");

        try {
            const token = await login(email, password);
            if (mountRef.current) {
                // Verificar si el componente está montado antes de realizar actualizaciones de estado
                actions.setToken(token);
                localStorage.setItem("token", token);
        
                const user = await fetchUser(token);
                // Verificar si el componente está montado antes de realizar actualizaciones de estado
                if (mountRef.current) {
                  actions.setUser(user);
                  localStorage.setItem("user", JSON.stringify(user));
                  navigate("/");
                }
            }
        } catch (error) {
            console.error("Error durante el inicio de sesión:", error);
            if (error.message === "Invalid credentials") {
                setLoginError("Wrong email or password.");
            }
        } finally {
            if (mountRef.current) {
                setLoading(false); // Desactivar el spinner después de la carga
            }
        }
    }

    return (
        <div className="container">
            <div className="d-flex flex-column align-items-center">
                <h1 className="text-center my-5">Log In</h1>
                {
                    !loading &&
                    <form className="w-100" style={{maxWidth: "500px"}} onSubmit={(e) => handleSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" value={email} onChange={(e) => handleEmailChange(e)} />
                            {emailError && 
                                <p className="fs-6 text-danger">{emailError}</p>
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pass" className="form-label">Password</label>
                            <input type="password" className="form-control" id="pass" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        {loginError && (
                            <div className="alert alert-danger mt-3" role="alert">
                                {loginError}
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary" disabled={!isFormValid}>Log in</button>
                    </form>
                }

                {loading && (
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                )}
            </div>
        </div>
    );
}