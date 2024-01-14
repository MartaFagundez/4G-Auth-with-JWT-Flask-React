import React from 'react';

export default function Signup() {
  return (
    <div className='container'>
      <div className="d-flex flex-column align-items-center">
        <h1 className="text-center my-5">Signup</h1>
        
        {/* FORM */}
        <form className="w-100" style={{maxWidth: "500px"}}>

          {/* Username */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" name='username' />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="pass" className="form-label">Password</label>
            <input type="password" className="form-control" id="pass" name='pass' />
          </div>

          <button type="submit" className="btn btn-primary">Signup</button>
        </form>

      </div>
    </div>
  )
}
