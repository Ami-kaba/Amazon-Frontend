import React,{useContext, useEffect, useState} from 'react'
import LayOut from '../../Components/Layout/LayOut'
import {db} from '../../Utility/firebase'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import classes from './Orders.module.css'
import ProductCard from '../../Components/Product/ProductCard'
import { collection, getDoc, getDocs } from 'firebase/firestore'

function Orders() {
const [state, user, dispatch] = useContext(DataContext)
const [orders, setOrders] = useState([]);

useEffect(() => {
  if(state?.user) {
    // const colRef = collection(db, 'users')
    // getDocs(colRef)
    //   .then((snapshot) => {
    //     console.log(snapshot);
    //   })
    db
      .collection("users")
      .doc(state?.user?.uid)
      .collection("orders")
      .orderBy("created", "desc")
      .onSnapshot((snapshot) => {
        // console.log(state?.user?.uid);
        // console.log(snapshot);
        setOrders(
          snapshot?.docs?.map((doc)=>({
            id: doc.id,
            data: doc.data(),
          }))
        )
        
        
      });
  }else{
    setOrders([])
  }
}, [])
  return (
    <LayOut>
    <section className={classes.container}>
      <div className={classes.orders__container}>
        <h2>Your Orders</h2>
        {
          orders?.length == 0 && <div style={{padding: "20px"}}>
            you don't have orders yet.
          </div>
        }
        {/* Orders items */}
        <div>
       
          {orders?.map((eachOrder, i) => {
              return (                
                <div key={i}>
                  <hr />
                  <h2>Your Orders</h2>
                  <p>Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                      return (
                      <ProductCard flex={true} product={order} key={order.id}
                      />
                    )
                    })}
                </div>
              );
            })}
        </div>
      </div>
    </section>
  </LayOut>
  )
}

export default Orders