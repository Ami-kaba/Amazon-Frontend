import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import {img} from '../../Components/Carousel/carouselData'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from '../../Components/Carousel/carousel.module.css'
function CarouselEffect() {
  return (
    <div>
        <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        >
            {
                img.map((imageItemLink, index)=>{
                 
                    return <img src={imageItemLink} key={index}/>
                })
            }
        </Carousel>
        <div className={classes.hero__img}></div>
    </div>
  )
}

export default CarouselEffect