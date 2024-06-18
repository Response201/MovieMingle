import React, {  useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../contexts/GlobalContext';
import { FetchLogin } from '../services/FetchLogin';
import Cookies from 'js-cookie';










export const LoginPage = () => {
  const {setUserSignedIn} = useGlobalContext();
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [message, setMessage] = useState('')
      const navigate = useNavigate()



        const handleLogin = async (e: React.FormEvent) => {
          e.preventDefault();
     
          const response:string = await FetchLogin(email, password);

          if(response !== 'Something went wrong' ){
            setUserSignedIn(email)
            Cookies.set("jwtToken", email, { expires: 1 / 24 });
            navigate('/')
          } else {
            setMessage(response)
            setTimeout(() => {
              setMessage('')
            }, 5000);

          }
       
        };
      
        return (
          <div className="login-container">
            <h1 className="login-title">Log In</h1>
            <form className="login-form" onSubmit={handleLogin}>
              <div className="login-form__group">
                <label htmlFor="email" className="login-form__label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="login-form__input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="login-form__group">
                <label htmlFor="password" className="login-form__label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="login-form__input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="login-form__button">Log In</button>
            </form>
           
            <div className="login-form__link-container">
        <Link className="login-form__link" to="/register">Don't have an account? Register here</Link>
        <p>{message}</p>
      </div>
      <div id="signInGoogle"></div>
          </div>
          
    );
    };
    export default LoginPage;