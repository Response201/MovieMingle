import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { FetchLogin } from "../services/FetchLogin";
import Cookies from "js-cookie";
import { FetchRegUser } from "../services/FetchRegUser";

interface GoogleResponse {
  credential: string;
}

interface DecodedJWT {
  email: string;
  exp: number;
}

const loadScript = (src: string, onLoad: () => void) => {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.onload = onLoad;
  document.body.appendChild(script);
};

export const LoginPage = () => {
  const { setUserSignedIn } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response: string = await FetchLogin(email, password);

    if (response === "Log in successful!") {
      setUserSignedIn(email);
      Cookies.set("jwtToken", email, { expires: 1 / 24 });
      navigate("/");
    } else {
      setMessage(response);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  useEffect(() => {
    function handleCallbackResponse(response: GoogleResponse) {
      const userObject: DecodedJWT = jwtDecode(response.credential);
      Cookies.set("jwtToken", response.credential, { expires: 1 / 24 });
      const current = Date.now() / 1000;

      if (userObject.exp && userObject.exp > current) {
        setUserSignedIn(response.credential);
        if (userObject.email) {
          FetchRegUser(userObject.email, null, "google");
          navigate("/");
        }
      } else {
        Cookies.set("jwtToken", "");
      }
    }

    loadScript("https://accounts.google.com/gsi/client", () => {
      // Initialize Google Accounts ID
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_CLIENTID,
        callback: handleCallbackResponse,
      });

      const signInGoogle = document.getElementById("signInGoogle");
      if (signInGoogle) {
        google.accounts.id.renderButton(signInGoogle, {
          type: "standard",
          theme: "outline",
          size: "medium",
          text: "signin",
          shape: "pill",
        });
      } else {
        console.error('Element with id "signInGoogle" not found.');
      }
    });
  }, [setUserSignedIn, navigate]);

  return (
    <div className="login-container">
      <h1 className="login-title">Log In</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-form__group">
          <label htmlFor="email" className="login-form__label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="login-form__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-form__group">
          <label htmlFor="password" className="login-form__label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="login-form__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-form__button">
          Log In
        </button>
      </form>

      <div className="login-form__link-container">
        <Link className="login-form__link" to="/register">
          Don't have an account? Register here
        </Link>
        <p>{message}</p>
      </div>
      <div id="signInGoogle"></div>
    </div>
  );
};
export default LoginPage;
