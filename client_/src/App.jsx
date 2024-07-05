import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import{setUser} from './redux/reducer/userReducer';
import { Mainarea } from './components/MainArea/mainarea'
import { useNavigate } from 'react-router-dom'


function App() {
  const navigate = useNavigate();
  const user = useSelector(state=>state.user)
  const dispatch = useDispatch()

  useEffect(()=>{
    checkUser();
  },[user])
  const checkUser = async ()=>{
    console.log('checkUser initiated' )
    try {
      if(localStorage.getItem('authtoken')===null) return navigate('/login');
      const response = await fetch(import.meta.env.VITE_SERVER_API+'/auth/protected',{
        method:'POST',
        headers:{
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${localStorage.getItem('authtoken')}`
        }
      })
      if(response.ok){
        const data = await response.json();
        
        if(!data.valid) {
          alert('Please login again')
          return navigate('/login');
        }
        else if(data.valid){
          dispatch(setUser(data.userObject));
        }
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  return(
    <>
      {/*adding the main area here */}
    <Mainarea/>
    </>
  )
  }
export default App;


