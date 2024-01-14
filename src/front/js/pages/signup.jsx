import React from 'react';
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export default function Signup() {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { register, control, handleSubmit, formState } = form;

  const { errors } = formState;

  function onSubmit(data) {
    console.log("Form submited: ", data);
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
            <p className='fs-6 text-danger'>{errors.pass?.message}</p>
          </div>
          
          {/* Submit Button and Errors alert */}
          {Object.keys(errors).length > 0 && (
            <div className="alert alert-danger mt-3" role="alert">
                There is invalid data. Please correct the errors and try again.
            </div>
          )}
          <button className="btn btn-primary">Signup</button>
        </form>
      </div>

      <DevTool control={control} /> {/* set up the dev tool */}
    </div>
  )
}
