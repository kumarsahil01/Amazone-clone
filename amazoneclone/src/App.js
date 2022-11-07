import "./App.css";
import Header from "./Header";
import Checkout from './Checkout'
import Payment  from "./payment";
import Home from "./Home";
import Orders from "./Orders"
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./Stateprovider";
import {loadStripe} from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js";
const promise=loadStripe('pk_test_51LSyBISE4mRRDhf2D3AYFHnT0LEYP0ckb41dTIRnIaOOplckuJhCkQ7G0FeE58wddTeXK62Impok3D3Fl6Uu09jy00AuzBgKgo');

function App() {
const [{},dispatch]=useStateValue();
  useEffect(()=>{
    //will run only once when the app component loads..

    auth.onAuthStateChanged(authuser=>{
      console.log('the user is >>>', authuser);
      if(authuser){
        // the user was logged in /the user was logged in
        dispatch({
          type:'SET_USER',
          user:authuser
        })
      }
      else{
        //the user is logged out
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    })
  },[])
  return (
    
    <Router>
      <div className="app">
        <Routes>

          <Route path="/Login" element={<><Login/></>}/>

          <Route path="/" element={<><Header/><Home/></>}/>

          <Route path="/checkout" element={<><Header/><Checkout/></>}/>

          {/* payment route */}
          <Route path="/payment" element={promise&&
            <><Header/> <Elements stripe={promise}><Payment/></Elements></>
          }/>

         <Route path="/Orders" element={<><Header/><Orders/></>}/>

        </Routes> 
      </div>
    </Router>
  );
}

export default App;
