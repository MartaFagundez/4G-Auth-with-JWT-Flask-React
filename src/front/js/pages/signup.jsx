import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { signup } from '../../client-API/backendAPI';

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  // Referencia para sólo invocar una actualización de estado si el componente aún está montado
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  async function onSubmit(data) {
    console.log("Form submited: ", data);
    setLoading(true);// Activar el spinner
    setSignupError("");

    try {
      const isRegistered = await signup(data);
      if (isRegistered) {
        reset();
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error en registro de usuario: ", error);
      setSignupError(error.message);
    }
    finally {
      if (isMounted.current) {
        setLoading(false); // Desactivar el spinner
      }
    }
  }


  return (
    <div className='container'>
      <div className="d-flex flex-column align-items-center">
        <h1 className="text-center my-5">Signup</h1>
        
        {/* FORM */}
        <form className="w-100" style={{maxWidth: "500px"}} onSubmit={handleSubmit(onSubmit)} noValidate>

          {/* Username */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
             {/* Registrar el input en useForm mediante la función "register" */}
             {/* Incluir validaciones mediante el options object */}
            <input type="text" className="form-control" id="username" {...register("username", {
              // Options object
              required: {
                value: true,
                message: "Username is required"
              },
              minLength: {
                value: 3,
                message: "Minimum length is 3 characters"
              },
              maxLength: {
                value: 20,
                message: "Maximum length is 20 characters"
              }
            })} />
            <p className='fs-6 text-danger'>{errors.username?.message}</p>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" {...register("email", {
              required: {
                value: true,
                message: "Email is required"
              },
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format"
              },
            })} />
            <p className='fs-6 text-danger'>{errors.email?.message}</p>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" {...register("password", {
              required: {
                value: true,
                message: "Password is required"
              },
              minLength: {
                value: 6,
                message: "Minimum length is 6 characters"
              },
              maxLength: {
                value: 30,
                message: "Maximum length is 30 characters"
              }
            })} />
            <p className='fs-6 text-danger'>{errors.password?.message}</p>
          </div>
          
          {/* Submit Button and Errors alerts */}
          { // Errores generados por validaciones del frontend
            Object.keys(errors).length > 0 && 
            (
              <div className="alert alert-danger mt-3" role="alert">
                  There is invalid data. Please correct the errors and try again.
              </div>
            )
          }

          { // Errores generados por validaciones del backend
            signupError !== "" && 
            (
              <div className="alert alert-danger mt-3" role="alert">
                  {signupError}
              </div>
            )
          }

          {/* Submit Button */}
          <div className="d-flex align-items-center">
            <button className="btn btn-primary me-3" disabled={loading} >Signup</button>
            {loading && (
                          <div className="spinner-border text-primary" role="status">
                              <span className="visually-hidden">Loading...</span>
                          </div>
            )}
          </div>
        </form>
      </div>

      {/* Modal */}
      <div className="modal" tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Successful registration</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>Your registration has been successful! Now you can log in.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => navigate("/login")}>Go to Login</button>
            </div>
          </div>
        </div>
      </div>

      <DevTool control={control} /> {/* set up the dev tool */}
    </div>
  )
}
