
import './App.css'
import { useDispatch, useSelector } from 'react-redux'

import { Outlet, useNavigate } from 'react-router-dom'
import { Toaster } from 'sonner';
import useAuth from './customHooks/useAuth'


function App() {
  const navigate = useNavigate();
  const user = useSelector(state=>state.user)
  const dispatch = useDispatch()

  
 useAuth();
// useEffect(()=>useAuth(),[])
  return(
    <>
      {/*adding the main area here */}
    <Outlet/>
    <Toaster
    position="top-center"
        closeButton
        toastOptions={{
          style: {
            background: '#2d3748', // bg-gray-700
            color: '#f7fafc', // text-white
          },
          className: 'custom-toast-class',
        }}
      />
    </>
  )
  }
export default App;


