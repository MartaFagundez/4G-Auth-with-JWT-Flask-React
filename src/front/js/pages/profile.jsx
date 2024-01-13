import React from 'react';

export default function Profile() {
  return (
    <div className="container">
            <div className="d-flex flex-column align-items-center">
                <h1 className="text-center my-5">Profile</h1>
                <div className="w-100" style={{maxWidth: "500px"}}>
                    <div className="mb-3">
                      <p className='fs-4'><span className='fw-bold'>Username: </span>fulanito</p>
                    </div>
                    <div className="mb-3">
                      <p className='fs-4'><span className='fw-bold'>Email: </span>email</p>
                    </div>
                </div>
            </div>
        </div>
  )
}
