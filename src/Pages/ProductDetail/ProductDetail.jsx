import React, {useEffect, useState } from 'react'
import LayOut from '../../Components/Layout/LayOut'
import { useParams } from 'react-router-dom'
import { productUrl } from '../../Api/endPoints'
import axios from 'axios'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader'

function ProductDetail() {  
  const {productId} = useParams()
  const [product, setProduct] = useState({})
  const [isLoading, setisLoading] = useState(false)
  // console.log(productId);
  useEffect(() => {
    setisLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
    .then((res)=>{
      setProduct(res.data)
      setisLoading(false)
    }).catch((err)=>{
      console.log(err);
      setisLoading(false)
    })
  }, []);
  return (
    <LayOut >
      {isLoading? (<Loader />) : (<ProductCard 
      product={product}
      flex = {true}
      renderDesc = {true}
      renderAdd={true}
    />)}
    
    </LayOut>
  )
}

export default ProductDetail