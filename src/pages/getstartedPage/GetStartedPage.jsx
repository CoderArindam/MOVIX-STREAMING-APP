import React, { useRef } from "react";
import { auth } from "../../../firebase";
import "./GetStartedPage.scss";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import Laptop from '../../assets/laptop.png';

const GetStartedPage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      const user = userCredential.user;
      await sendEmailVerification(user); // Wait for email verification to be sent
      alert('User Creation Successful!');
    } catch (error) {
      alert(error.message);
    }
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      const user = userCredential.user;
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="get-started-container">
      <div className="background-image">
        <img src={Laptop} alt="" />
      </div>
      <div className="login-container">
        <form>
          <div className="login-form">
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
            <button className="login-button" onClick={signIn}>Login</button>
            <h4>NEW TO MOVIX?</h4>
            <button className="login-button" onClick={register}>Sign Up Now</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetStartedPage;
