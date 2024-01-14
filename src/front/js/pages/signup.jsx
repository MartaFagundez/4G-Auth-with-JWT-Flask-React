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


  return (
    <div className='container'>
      <div className="d-flex flex-column align-items-center">
        <h1 className="text-center my-5">Signup</h1>
        
        {/* FORM */}
        <form className="w-100" style={{maxWidth: "500px"}}>

          {/* Username */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
             {/* Registrar el input en useForm mediante la función "register" */}
            <input type="text" className="form-control" id="username" {...register("username")} />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" {...register("email")} />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="pass" className="form-label">Password</label>
            <input type="password" className="form-control" id="pass" {...register("pass")} />
          </div>

          <button type="submit" className="btn btn-primary">Signup</button>
        </form>
      </div>

      <DevTool control={control} /> {/* set up the dev tool */}
    </div>
  )
}
