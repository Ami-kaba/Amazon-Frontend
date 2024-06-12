import React, {useContext, useState} from 'react'
import LayOut from '../../Components/Layout/LayOut'
import classes from '../Payment/Payment.module.css'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard'
import {useStripe, useElements,CardElement} from '@stripe/react-stripe-js';
import { colors } from '@mui/material'
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
import { axiosInstance } from '../../Api/axios'
import {ClipLoader} from 'react-spinners'
import {db} from '../../Utility/firebase'
import { useNavigate } from 'react-router-dom'
// import { type } from '@testing-library/user-event/dist/type'
import { Type } from '../../Utility/action.type'
function Payment() {

  const [state, dispatch] =  useContext(DataContext);
  const [processing, setProcessing] = useState(false )
  // total item
  const totalItem = state?.basket?.reduce((amount, item)=>{
    return item.amount + amount
},0)
// total price
const total = state?.basket?.reduce((amount, item) => {
  return item.price * item.amount + amount;
}, 0);

const stripe = useStripe();
const elements = useElements();
const navigate = useNavigate()

const [cardError, setCardError] = useState(null)

const handleChange =(e)=>{
  e?.error?.message? setCardError(e?.error?.message) : setCardError("")
}

const handelPayment = async (e)=>{
  e.preventDefault()  
  try {
    setProcessing(true); 
    // 1. backend || functions-----> contact to the client secret
    const response = await axiosInstance({
      method: "POST",
      url: `/payment/create?total=${total * 100}`,
    })

    // console.log(response.data);
    const clientSecrete = response.data?.clientSecret;
    // console.log(clientSecrete);
    
    // 2. client side (react side conformation)
    const {paymentIntent} = await stripe.confirmCardPayment(
      clientSecrete, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });    
       // 3. after the confirmation---> order firestore database save, clear basket  
    // console.log(paymentIntent);
    await db
      .collection("users")
      .doc(state?.user?.uid)
      .collection("orders")
      .doc(paymentIntent.id)
      .set({
        basket: state?.basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });
// empty the basket
    dispatch({type:Type.EMPTY_BASKET})
    setProcessing(false);
    navigate("/orders", {state:{msg:"you have placed new Orders"}})
  } catch (error) {
    console.log(error);
    setProcessing(false)
  }
};
// console.log(state?.user?.uid);
  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment__header}>Check ({totalItem}) item </div>
      {/* payment method */}
    <section className={classes.payment}>
      {/* address */}
      <div className={classes.flex}>
        <h3>Delivery Address</h3>
          <div>
            <div>{state?.user?.email}</div>
            <div>Addis Ababa</div>
            <div>Ethiopia</div>
          </div>
        </div>
      <hr />
      {/* product */}
      <div className={classes.flex}>
        <h3>Review items and delivery</h3>
          <div>
            {
              state?.basket?.map((item, itemtype)=><ProductCard product={item} flex={true} key={itemtype}/>)
            }
          </div>
      </div>
      {/* card form */ }
      <div className={classes.flex}>
        <h3>Payment Method</h3>
        <div className={classes.payment__card__container}>
          <div className={classes.payment__details}>
            <form onSubmit={handelPayment}>
              {/* error */}
              {cardError && (
              <small style={{color:"red"}}>{cardError}</small>) }
              {/* Card Element*/}
            <CardElement onChange={handleChange}/>
            {/* Price */}
            <div className={classes.payment__price}>
              <div>
                <span style={{display:"flex", gap:"10px"}}>
                  <p>Total Order |</p><CurrencyFormat amount={total}/>
                </span>
              </div>
              <button type="submit">
                {processing ? (
                    <div className={classes.loading}>
                        <ClipLoader color='gray' size={12}></ClipLoader>
                        <p>Please wait ...</p>
                    </div>
                  ) : (
                    " Pay Now" 
                )}
               </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </LayOut>
  )
}

export default Payment 