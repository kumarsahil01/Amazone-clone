import React, { useEffect, useState } from "react";
import "./Payment.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./Stateprovider";
import { Link,useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import {getBasketTotal} from './reducer';
import axios from "./axios";
import {db} from './firebase';
import { collection, addDoc } from "firebase/firestore"; 

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate =useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded,setSucceeded]=useState(false);
  const [processing,setProcessing]=useState('');
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientsecret,setclientsecret]=useState('True');
  


  useEffect(()=>{
    //generate the special stripe secret which allow us to charge a customer
      const getclientsecret=async()=>{
         const response =await axios(
          {
            method:'post',
            //stripe expects the total in a currencies subunits
            url: `/payments/create?total=${getBasketTotal(basket) * 100}`
          }
         );
         setclientsecret(response.data.clientsecret)
      }   
    getclientsecret();
  },[basket])

 console.log('THE SECRET IS >>>',clientsecret)

  const handlesubmit = async(event) => {
    //some fancy stuff will be here
    event.preventDefault();
    setProcessing(true);
    const  payload=await stripe
    .confirmCardPayment(clientsecret, {
      payment_method:{
        card:elements.getElement(CardElement)
      }
    }).then(({paymentIntent})=>{
      //payment intent =payment confirmation
      
    try {
      const docRef =  addDoc(collection(db, "users"), {
        Basket: basket,
        amount: paymentIntent.amount,
        Created: paymentIntent.created
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
      setSucceeded(true);
      setError(null);
      setProcessing(false)

      dispatch({
        type:'EMPTY_BASKET'
      })
      navigate('/Orders',{replace:true});
    });
  };
  const handlechange = (event) => {
    //listen for changes inthe cardelemnt
    //and display any error as the customer types card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout(
          <Link to="/Checkout">{basket.length}items</Link>)
        </h1>
        {/* delivery addreess */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Deliver Address</h3>
          </div>

          <div className="payment_address">
            <p>{user ? user.email : "no user exist"}</p>
            <p>123 react lane</p>
            <p>new delhi</p>
          </div>
        </div>

        {/* review item */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* payment method */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            {/* stripe magic will go */}
            <form onSubmit={handlesubmit}>
              <CardElement onChange={handlechange} />
              <div className="payment_priceContain">
                {/* <CurrencyFormat
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  decimalScale={2}
                  renderText={(value) => (
                    <>
                      <p>
                        Subtotal ({basket.length} items):
                        <strong> {value}</strong>
                      </p>
                      <small className="subtotal__gift">
                        
                      </small>
                    </>
                  )}
                /> */}

                <button disabled={processing||disabled||succeeded}>
                <span>{processing? <p>processing</p>:"Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
