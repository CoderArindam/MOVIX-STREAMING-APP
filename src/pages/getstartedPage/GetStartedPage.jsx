import React, { useRef, useState } from "react";
import { auth } from "../../../firebase";
import "./GetStartedPage.scss";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { formatFirebaseError } from "../../utils/firebaseErrorHandler";
import Laptop from "../../assets/laptop.png";

const GetStartedPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  const register = async (e) => {
    e.preventDefault();
    if (
      !nameRef.current.value ||
      !emailRef.current.value ||
      !passwordRef.current.value
    ) {
      toast.warning("Please fill in all fields");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value,
      );
      const user = userCredential.user;
      await sendEmailVerification(user);
      toast.success(
        "User Creation Successful! Check your email for verification.",
      );
      setIsSignUp(false);
      if (nameRef.current) nameRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
      if (passwordRef.current) passwordRef.current.value = "";
    } catch (error) {
      toast.error(formatFirebaseError(error));
    }
  };

  const signIn = async (e) => {
    e.preventDefault();
    if (!emailRef.current.value || !passwordRef.current.value) {
      toast.warning("Please enter both email and password");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value,
      );
      if (userCredential.user) {
        toast.success("Login Successful!");
        if (emailRef.current) emailRef.current.value = "";
        if (passwordRef.current) passwordRef.current.value = "";
      }
    } catch (error) {
      toast.error(formatFirebaseError(error));
    }
  };

  const toggleFromSignUp = () => {
    setIsSignUp(false);
    if (nameRef.current) nameRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";
  };

  const toggleToSignUp = () => {
    setIsSignUp(true);
    if (emailRef.current) emailRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";
  };

  return (
    <div className="get-started-container">
      <div className="background-image">
        <img src={Laptop} alt="" />
      </div>
      <div className="login-container">
        <form>
          <div className="login-form">
            {!isSignUp ? (
              <>
                <h2>Login</h2>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    ref={emailRef}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    ref={passwordRef}
                  />
                </div>
                <button className="login-button" onClick={signIn}>
                  Login
                </button>
                <h4>NEW TO MOVIX?</h4>
                <button className="login-button" onClick={toggleToSignUp}>
                  Sign Up Now
                </button>
              </>
            ) : (
              <>
                <h2>Sign Up</h2>
                <div className="form-group">
                  <label htmlFor="name">Full Name:</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your full name"
                    ref={nameRef}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="signup-email">Email:</label>
                  <input
                    type="email"
                    id="signup-email"
                    placeholder="Enter your email"
                    ref={emailRef}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="signup-password">Password:</label>
                  <input
                    type="password"
                    id="signup-password"
                    placeholder="Enter your password"
                    ref={passwordRef}
                  />
                </div>
                <button className="login-button" onClick={register}>
                  Create Account
                </button>
                <h4>ALREADY HAVE AN ACCOUNT?</h4>
                <button className="login-button" onClick={toggleFromSignUp}>
                  Back to Login
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetStartedPage;
