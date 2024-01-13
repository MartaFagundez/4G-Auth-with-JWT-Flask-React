import React from 'react';

import { useUserContext } from '../contexts/userContext';

export default function Profile() {
  const {store, actions} = useUserContext();

  return (
    <div className="container">
            <div className="d-flex flex-column align-items-center">
                <h1 className="text-center my-5">Profile</h1>
                <div className="w-100" style={{maxWidth: "500px"}}>
                    <div className="mb-3">
                      <p className='fs-4'><span className='fw-bold'>Username: </span>{store.user.username}</p>
                    </div>
                    <div className="mb-3">
                      <p className='fs-4'><span className='fw-bold'>Email: </span>{store.user.email}</p>
                    </div>
                </div>
            </div>
        </div>
  )
}
