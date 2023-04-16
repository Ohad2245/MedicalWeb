import Link from "next/link";
import React from "react";
import { CgPill } from "react-icons/cg";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      {router.pathname === "/SignIn" ||
        (router.pathname !== "/" && (
          <>
            <p className="logo">
              <Link href="/Home">
                <img
                  src={"/logo.png"}
                  width={100}
                  style={{ cursor: "pointer" }}
                />
              </Link>
            </p>
            <button
              type="button"
              className="cart-icon"
              onClick={() => {
                setShowCart(true);
              }}
            >
              <CgPill />
              <span className="cart-item-qty">{totalQuantities}</span>
            </button>
          </>
        ))}

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
