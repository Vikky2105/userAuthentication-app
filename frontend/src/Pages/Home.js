import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
function Home() {

  const [loggedUser,setLoggeduser] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
      setLoggeduser(localStorage.getItem('loggedItem'))
  },[])

  let handleLogout=(e)=>{
      localStorage.removeItem('token')
      localStorage.removeItem('loggedItem')
      handleSuccess('User Logged Out')
      setTimeout(()=>{
          navigate('/login')
      },1000)
  }

  return (
    <div>
      <h1>Logged User</h1>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer/>
    </div>
  )
}

export default Home