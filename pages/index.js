import React, { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { BiUser } from "react-icons/bi";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { toast } from "react-hot-toast";
import GoogleButton from "react-google-button";

const SignUp = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        router.push("/SignIn");
        toast.success("User sign Up:");
      })
      .catch((error) => {
        console.log(error);
        toast.error("User sign Up Failed:");
      });
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () =>{
      signInWithPopup(auth,googleProvider).then(res=>{
        toast.success("User sign Up:");
        router.push("/Home");
      }) .catch((error) => {
        console.log(error);
        toast.error("User sign Up Failed:");
      });
  }
  return (
    <div className="container">
      <div className="form signup">
        <h1 style={{ color: "white" }}>Create Account</h1>
        <div className="inputBox">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <i>
            <AiOutlineMail />
          </i>
          <span>Email</span>
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
          <span>Username</span>
        </div>
        <p>OR</p>
        <GoogleButton style={{width:'70%',outline:'none'}} onClick={signInWithGoogle}/>

        <button className="btn" onClick={signUp}>
          Sign Up
        </button>
        
        <p>
          Already a member ? <a href="SignIn">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
