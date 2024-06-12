import React,{useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider'

const ProtectedRoute = ({children, msg, redirect}) => {
    const navigate = useNavigate()
    const [state, user, dispatch] = useContext(DataContext)


    useEffect(()=>{
        if(!state?.user){
            navigate("/auth", {state:{msg, redirect}})
        }
    },[user])
    
  return children;
}

export default ProtectedRoute