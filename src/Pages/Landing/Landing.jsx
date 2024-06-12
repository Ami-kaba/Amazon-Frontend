import React from 'react'
import Carousel from '../../Components/Carousel/Carousel'
import Category from '../../Components/Category/Category'
import Product from '../../Components/Product/Product'
import LayOut from '../../Components/Layout/LayOut'

function Landing() {
  return (
    <LayOut>
       <Carousel />
       <Category />
       <Product />
    </LayOut>
  )
}

export default Landing