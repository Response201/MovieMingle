import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FetchRegUser } from '../services/FetchRegUser';



export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('')

  const handleRegister = async(e: React.FormEvent) => {
    e.preventDefault();
   
  const response = await FetchRegUser(email.toLocaleLowerCase(), password, "default")

 setMessage(response)
 setTimeout(() => {
  setMessage('')
 }, 8000);
 
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <form className="register-form" onSubmit={handleRegister}>
        <div className="register-form__group">
          <label htmlFor="name" className="register-form__label">Name</label>
          <input
            type="text"
            id="name"
            className="register-form__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="register-form__group">
          <label htmlFor="email" className="register-form__label">Email</label>
          <input
          required
            type="email"
            id="email"
            className="register-form__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="register-form__group">
          <label htmlFor="password" className="register-form__label">Password</label>
          <input
          required
            type="password"
            id="password"
            className="register-form__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="register-form__button">Register</button>
      </form>
     
      <div className="login-form__link-container">
        <Link className="login-form__link" to="/loginpage">Already have an account? Login here</Link>
        <p>{message}</p>
      </div>




    </div>
  );
};

export default Register;
