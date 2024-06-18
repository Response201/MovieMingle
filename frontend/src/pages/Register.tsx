import React, { useState } from 'react';
import { Link } from 'react-router-dom';



export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
  
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
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
      </div>
    </div>
  );
};

export default Register;
