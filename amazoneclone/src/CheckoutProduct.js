import React, { useState } from 'react'
import "./CheckoutProduct.css"
import { useStateValue } from './Stateprovider'

function CheckoutProduct({image,title ,price,rating,id}) {
    const [{basket},dispatch]=useStateValue();
    const removeFromBasket=()=>{

        //remove the item from the basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id:id,
        })

    }
  return (
    <div  className='checkoutProduct'>
        <img className='checkoutProduct__image' src={image} alt='productimage'/>
       <div className='checkoutProduct__info'>
        <p className='checkoutProduct__title'>{title}</p>
        <p className='checkout__price'>
            <small>$</small>
            <strong>{price}</strong>
        </p>
        <div className='checkoutProduct__rating'>
         {Array(rating)
         .fill()
         .map((_, i)=>(
            <p>⭐</p>
         ))}
        </div>
        <button onClick={removeFromBasket}>Remmove from basket</button>
       </div>
    </div>
  )
}

export default CheckoutProduct
