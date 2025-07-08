import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
function Signup() {

  let [signupinfo,setSignupinfo] = useState({
    name:'',
    email:'',
    password:''
  })

  const navigate = useNavigate();
  let handleChange=(e)=>{
      const {name ,value} = e.target;
      console.log(name,value)
      let copySignupinfo = {...signupinfo}
      copySignupinfo[name] = value;
      setSignupinfo(copySignupinfo)

  }

  let handleSignup= async (e)=>{
        e.preventDefault();
        const {name , email , password} = signupinfo;
        if(!name || !email || !password){
          return handleError("Name , Email and Password are required")
        }
        try{
            const url = "http://localhost:8080/auth/signup"
            const response = await fetch(url,{
              method:"POST",
              headers:{
                'content-Type':'application/json'
              },
              body:JSON.stringify(signupinfo)
            })
            const result =await response.json();
            const {success,message,error} = result;
            if(success){
              handleSuccess(message);
              setTimeout(()=>{
                  navigate('/login')
              },1000)
            }else if(error){
              const details = error?.details[0].message;
              handleError(details)
            }else if(!success){
              handleError(message);
            }
            console.log(result)
        }catch(err){
            handleError(err)
        }
  }
  return (

    
    <div className='container'>
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
            <div>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' autoFocus placeholder='Enter your Name' onChange={handleChange} value={signupinfo.name}/>
            </div>
            <div>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email'  placeholder='Enter your Email' onChange={handleChange} value={signupinfo.email}/>
            </div>
            <div>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' placeholder='Enter your Password' onChange={handleChange} value={signupinfo.password}/>
            </div>
            <button>Signup</button>
            <span>Alredy have an account ? 
                <Link to={"/login"}>Login</Link>
            </span>
            <ToastContainer />
        </form>
    </div>
  )
}

export default Signup