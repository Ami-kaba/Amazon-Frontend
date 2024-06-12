import React, { useContext } from 'react'
import LayOut from '../../Components/Layout/LayOut'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard'
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
import { Link } from 'react-router-dom'
import classes from '../../Pages/Cart/Cart.module.css'
import { Type } from '../../Utility/action.type'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Cart() {
  const [state, dispatch] = useContext(DataContext)
  const [user] =useContext(DataContext)

  const total = state?.basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  // console.log(state?.basket);
  const increment = (item)=>{
    dispatch({
      type:Type.ADD_TO_BASKET,
      item
    })
  }
const decrement = (id)=>{
  dispatch({
    type:Type.REMOVE_FROM_BASKET,
    id
  })
}

  return (
  <LayOut>
    <section className={classes.container}>
      <div className={classes.cart__container}>
        <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {
            state?.basket?.length===0?(<p>Opps ! No item in your cart</p>):(
              state?.basket?.map((item, itemIndex)=>{
                return <section className={classes.cart__product} key={itemIndex}>
                  <ProductCard 
                product={item}
                renderDesc={true}
                renderAdd ={false}
                flex={true}
                key={item.id}
                />
                <div className={classes.bnt__container}>
                  <button className={classes.btn} onClick={()=>increment(item)}>
                  <IoIosArrowUp size={20}/>
                  </button>
                  <span>{item.amount}</span>
                  <button className={classes.btn} onClick={()=>decrement(item.id)}>
                  <IoIosArrowDown size={20}/>
                  </button>
                </div>
                
                </section>
                
              })
            )
          }
      </div>
      {state?.basket?.length !==0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({state?.basket?.length} item)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type='checkbox' />
              <small>This order contains a gift</small>
            </span>
            <Link to = '/payments'>Continue to checkout</Link>
          </div>
      )}
    
    </section>
  </LayOut>
  )
}

export default Cart