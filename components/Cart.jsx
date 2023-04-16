import React, { useRef,useEffect,useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
} from "react-icons/ai";
import {CgPill} from "react-icons/cg";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import Link from "next/link";
import { urlFor } from "../lib/client";
import getStripe from '../lib/getStripe';
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import Date from './Date';
import Map from "./Map";

const Cart = ({email}) => {
  const router = useRouter();
  const userSignOut = () =>{
    signOut(auth).then(()=>{
      console.log('sign out');
      router.push('/SignIn')
    }).catch(error => console.log(error));
  }
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async() => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(cartItems),
    });
    if(response.statusCose === 500) return;
    const data = await response.json();
    toast.loading('Redirecting...');
    stripe.redirectToCheckout({sessionId:data.id});
  }

  return (
      <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
      <h5 style={{textAlign: 'center'}}>Welcome {auth.currentUser.email}</h5>
    <br></br>
      <button className="signOut" onClick={userSignOut}>SignOut</button>
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your medicine basket</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>
        <Date/>
        <span className="heading">Navigate to the distance home nearest you</span>
        <Map/>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <CgPill size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/Home">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>{item.price}$</h4>
                  </div>

                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num" onClick="">
                          {item.quantity}
                        </span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>{totalPrice}$</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
