import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from './redux/reducer/serverReducer'
import { Mainarea } from './components/MainArea/mainarea'


function App() {
  return(
    <>
      {/*adding the main area here */}
    <Mainarea/>
    </>
  )
  }
export default App


