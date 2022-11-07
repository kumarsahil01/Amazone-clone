import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./Stateprovider";
import { auth } from "./firebase";
function Header() {
  const [{basket,user},dispatch]=useStateValue();
  const handleAuthentication =()=>{
        if(user){
          auth.signOut();
        }
  }
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://p.kindpng.com/picc/s/1-11932_amazon-logo-png-amazon-a-logo-transparent-png.png"
          alt="amazone-logo"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchinput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to ={!user && '/Login'}>
        <div onClick={handleAuthentication} className="header__option">
          <span className="header__optionlineone">Hello {!user ?'Guest':user.email  }</span>
          <span className="header__optionlinetwo">{user? 'sign out' :'sign in'}</span>
        </div>
        </Link>


        <Link to={'/Orders'}>
        <div className="header__option">
          <span className="header__optionlineone">Return</span>
          <span className="header__optionlinetwo">&orders</span>
        </div>
        </Link>

        <div className="header__option">
          <span className="header__optionlineone">Your</span>
          <span className="header__optionlinetwo">Prime</span>
        </div>
       
         <Link to='/checkout'>
         <div className="header__optionBasket">
          <ShoppingBasketIcon className="" />
          <span className="header__optionlinetwo header__basketcount">{basket.length}</span>
        </div>
        </Link>
        

      </div>
    </div>
  );
}

export default Header;
