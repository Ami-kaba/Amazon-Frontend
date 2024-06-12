import React, { useState, useContext } from 'react'
import classes from '../Auth/SignUp.module.css'
import amazonlogo from '../Auth/img/Amazon_Auth.png'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {auth} from '../../Utility/firebase'
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'
import {DataContext} from '../../Components/DataProvider/DataProvider'
import { Type } from '../../Utility/action.type'
import {ClipLoader} from 'react-spinners'

function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState({
    signIn:false,
    signUp:false
  })
// console.log(password, email);

const [user, dispatch] = useContext(DataContext)
const navigate =useNavigate()
const navStateData = useLocation()
// console.log(navStateData);
// console.log(user);

const authHandler = async (e)=>{
  e.preventDefault()
  // console.log( name='signin');
  if(e.target.name == 'signin'){
    //firebase auth
    setLoading({...loading, signIn:true})
    signInWithEmailAndPassword(auth, email, password)
    .then((userInfo)=>{
      // console.log(userInfo);
      dispatch({
        type:Type.SET_USER,
        user:userInfo.user
      }); 
      setLoading({...loading, signIn:false})
      navigate(navStateData?.state?.redirect || "/")
    })
    .catch((err)=>{
      setError(err.message);
      setLoading({...loading, signUp:false})
    })
  }else{ 
    setLoading({...loading, signUp: true});
    createUserWithEmailAndPassword(auth, email, password)
    .then((userInfo)=>{
      // console.log(userInfo);
      dispatch({
        type:Type.SET_USER,
        user:userInfo.user
      }); 
      setLoading({...loading, signUp:false})
      navigate(navStateData?.state?.redirect || "/")
    })
    .catch((err)=>{
      setError(err.message);    })
      setLoading({...loading, signUp:false})
  }
}


  return (
  <section className={classes.login}>

      {/* Logo */}
      <Link to = "/">
      <img src={amazonlogo} alt="Amazon logo" />
      </Link>

      {/* form */}
      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {
          navStateData?.state?.msg && (
            <small style={{
              padding:"5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}>
              {navStateData?.state?.msg}
            </small>
          )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id='email'/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id='password'/>
          </div>
          <button 
            name='signin'
            type='submit' 
            onClick={authHandler} 
            className={classes.login__signInButton}>
              {loading.signIn ? (
                <ClipLoader color='#000' size={15}></ClipLoader>
              ) : (
                "Sign In"
              )}
          </button>
        </form>
        {/* Agreement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditionsof use & Sale. Please see our privacy Notice, our Cookies Notice and our Internet-Based Ads Notice
        </p>
        {/* create account btn */}
        <button 
          name='signup'
          type='submit' 
          onClick={authHandler} 
          className={classes.login__registerbutton}>
            {loading.signUp ? (
                <ClipLoader color='#000' size={15}></ClipLoader>
              ) : (
                " Create your Amazon Account"
              )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red"}}>{error}</small>
        )}
      </div>
  </section>    
  )
}

export default Auth