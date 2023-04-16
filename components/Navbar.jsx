import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";
import { useRouter } from "next/router";


const Navbar = () => {
  
 const router = useRouter();
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
     
      {router.pathname === '/SignIn' || router.pathname !== '/' && (
        <><p className="logo">
          <Link href="/Home">Medical Web</Link>
        </p><button
          type="button"
          className="cart-icon"
          onClick={() => {
            setShowCart(true);
          } }
        >
            <AiOutlineShopping />
            <span className="cart-item-qty">{totalQuantities}</span>

          </button></>
      )}
      
      {showCart && <Cart />}
    </div>
   
  );
};

export default Navbar;
