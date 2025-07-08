import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
function Login() {

  let [logininfo,setLogininfo] = useState({
    email:'',
    password:''
  })

  const navigate = useNavigate();
  let handleChange=(e)=>{
      const {name ,value} = e.target;
      console.log(name,value)
      let copyLogininfo = {...logininfo}
      copyLogininfo[name] = value;
      setLogininfo(copyLogininfo)

  }

  let handleLogin= async (e)=>{
        e.preventDefault();
        const {email , password} = logininfo;
        if(!email || !password){
          return handleError("Email and Password are required")
        }
        try{
            const url = "http://localhost:8080/auth/login"
            const response = await fetch(url,{
              method:"POST",
              headers:{
                'content-Type':'application/json'
              },
              body:JSON.stringify(logininfo)
            })
            const result =await response.json();
            const {success,message,jwtToken ,name ,error} = result;
            if(success){
              handleSuccess(message);
              localStorage.setItem('token',jwtToken)
              localStorage.setItem('loggedItem',name)
              setTimeout(()=>{
                  navigate('/home')
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
        <form onSubmit={handleLogin}>
            <div>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email'  placeholder='Enter your Email' onChange={handleChange} value={logininfo.email }/>
            </div>
            <div>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' placeholder='Enter your Password' onChange={handleChange} value={logininfo.password}/>
            </div>
            <button>Login</button>
            <span>Don't  have an account ? 
                <Link to={"/signup"}>Signup</Link>
            </span>
            <ToastContainer />
        </form>
    </div>
  )
}

export default Login