import React, { useState } from 'react';

import { Link } from 'react-router-dom';
export const LoginPage = () => {
   
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
      
        const handleLogin = (e: React.FormEvent) => {
          e.preventDefault();
          
          console.log('Email:', email);
          console.log('Password:', password);
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
      </div>
            
          </div>
          
    );
    };
    export default LoginPage;