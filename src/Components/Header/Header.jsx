import React, { useContext } from 'react'
import { MdLocationPin } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { BiCart } from "react-icons/bi";
import classes from '../Header/Header.module.css'
import LowerHeader from '../Header/LowerHeader'
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import {auth} from '../../Utility/firebase'

function Header() {
    
    const [state, user, dispatch] = useContext(DataContext);
    // console.log(state.basket.length);
    const totalItem = state?.basket?.reduce((amount, item)=>{
        return item.amount + amount
    },0)

  return (
    <section className={classes.fixed}>
        <section>            
            <div className={classes.header__container}>
                {/* {logo} */}
                <div className={classes.logo__container}>
                    <Link to ="/">
                        <img src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png" alt="amazon logo" />
                    </Link>
                    <div className={classes.delivery}>
                        <span>
                             {/* {icon} */}
                            <MdLocationPin />
                        </span>
                        <div >
                            <p>Deliver to</p>
                            <span>Ethiopia</span>
                        </div>
                    </div>  
                </div>
                <div className={classes.search}>
                       {/* {search} */}
                       <select name="" id="">
                            <option value="">All</option>
                        </select>
                        <input type="text" placeholder='search product'/>
                        {/* {icon} */}
                        <FaSearch />
                </div>
              
                <div className={classes.order__container}>
                    <Link to="" className={classes.lanuage}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Flag_of_the_United_States_%28Pantone%29.svg/301px-Flag_of_the_United_States_%28Pantone%29.svg.png" alt="United States" />
                        <section>
                            <option value="">EN</option>
                        </section>
                    </Link>
                       
                   
                    {/* {three components} */}
                    <Link to={!state?.user && "/auth"}>
                        <div>
                            {
                                state?.user?(

                                    <>
                                    <p>Hello {state?.user?.email?.split("@")[0]}</p>
                                    <span onClick={()=>auth.signOut()}>Sign Out</span>
                                    </>
                                    
                                ) : (
                                    <>
                                        <p>Hello, sign In</p>
                                        <span>Account & Lists</span>
                                    </>                                    
                                )
                            }                        
                        </div>
                    </Link>
                    {/* {order} */}
                    <Link to ="/orders">
                        <p>returns</p>
                        <span>& Orders</span>
                    </Link>
                    {/* cart */}
                    <Link to="/cart" className={classes.cart}>
                        {/* {icon} */}
                        <BiCart size={35}/>
                        <span>{totalItem}</span>
                    </Link>
                </div>
            </div>
        </section>
        <LowerHeader />
    </section>
  )
}

export default Header