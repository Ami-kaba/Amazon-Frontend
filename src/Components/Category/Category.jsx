import React from 'react'
import CategoryCard from './CategoryCard'
import {CatagoryData} from '../Category/categoryinfo'
import classes from './Category.module.css'
function Category() {
  return (
    <section className={classes.category__container}>
      {
        CatagoryData.map((infos)=>{
          return <CategoryCard data = {infos} key={infos.title}/>
        })
      }
    </section>
  )
}

export default Category