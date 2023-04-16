import React, { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { BiUser } from "react-icons/bi";
import { AiFillLock } from "react-icons/ai";
import { toast } from "react-hot-toast";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User signed in:", userCredential.user);
        router.push("/Home");
        toast.success("User sign in:",userCredential.user);
      })
      .catch((error) => {
        console.log("Error signing in:", error);
        toast.error("User sign in failed:");

        
      });
  };
  return (
    <div className="container">
      <form className="form">
        <h1 style={{color:'white'}}>Sign In</h1>
        <div className="inputBox">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <i>
            <BiUser />
          </i>
          <span>Username</span>
        </div>
        <div className="inputBox">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i>
            <AiFillLock />
          </i>
          <span>Password</span>
        </div>
        <button className="btn" onClick={signIn}>Sign In</button>
      <p>
        Not Registered ? <a href="/">Create a new account</a>
      </p>
      </form>
     
    </div>
  );
};

export default SignIn;
