import React, { useState } from "react";
import "./CSS/LoginSignup.css";
const LoginSignup = () => {
  const [state, setState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const ChangeHandler=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const login = async () => {
    console.log("logim");
    let responseData;
    await fetch("http://localhost:4000/login",{
      method: "POST",
      headers:{
        Accept:'application/form-data',
        'content-Type':'application/json'
      },
      body: JSON.stringify(formData)
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/")
    }
    else{
      alert(responseData.errors);
    }
  };
  const signup = async () => {
    console.log("Sign up");
    let responseData;
    await fetch("http://localhost:4000/signup",{
      method: "POST",
      headers:{
        Accept:'application/form-data',
        'content-Type':'application/json'
      },
      body: JSON.stringify(formData)
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/")
    }
    else{
      alert(responseData.errors);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-cointainer">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input type="text" name="username" value={formData.username} onChange={ChangeHandler} placeholder="Your Name" />
          ) : (
            <></>
          )}
          <input type="email" name="email" value={formData.email} onChange={ChangeHandler} placeholder="Email Address" />
          <input type="password" name="password" value={formData.password} onChange={ChangeHandler} placeholder="Password" />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login Here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click Here
            </span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to terms of use & privacy and policy</p>
        </div>
      </div>
    </div>
  );
};
export default LoginSignup;
