import React from "react";

export default function Login() {

    return (
        <div className="container">
            <div className="d-flex flex-column align-items-center">
                <h1 className="text-center mt-5 mb-3">Login</h1>
                <form className="w-100" style={{maxWidth: "500px"}}>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email"/>
                    </div>
                    <div class="mb-3">
                        <label for="pass" class="form-label">Password</label>
                        <input type="password" class="form-control" id="pass" />
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
}