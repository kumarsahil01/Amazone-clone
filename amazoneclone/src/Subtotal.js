import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./Stateprovider";
import {getBasketTotal} from "./reducer";
import {Link, useNavigate} from "react-router-dom";

function Subtotal() {
 let navigate=useNavigate();
  const [{ basket }, dispatch] = useStateValue();

  
 
  return (
    <div className="subtotal">
      <CurrencyFormat
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        decimalScale={2}
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items):<strong> {value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox"></input>
              <h5> This contain a gift inside</h5>
            </small>
          </>
        )}
      />
    <Link to ='/payment'>
      <button className="checkoutbutton"  >Proceed to Checkout</button>
      </Link>
    </div>
  );
}

export default Subtotal;
