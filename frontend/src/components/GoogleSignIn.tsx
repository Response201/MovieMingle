import  { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import { FetchRegUser } from '../services/FetchRegUser';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../contexts/GlobalContext';



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


interface GoogleSignInProps {
  label: string;
  setMessage: (message: string) => void;
  clientId: string;
}


const GoogleSignIn = ({ label, setMessage, clientId }: GoogleSignInProps) => {
  const { setUserSignedIn } = useGlobalContext();
  const navigate = useNavigate()
  useEffect(() => {
    async function handleCallbackResponse(response: GoogleResponse) {
      try {
        const userObject: DecodedJWT = jwtDecode(response.credential);
        const current = Date.now() / 1000;
        if (userObject.exp && userObject.exp > current && userObject.email) {
          const responseReg = await FetchRegUser(userObject.email, null, "google", label);
          if (responseReg !== "Registration successful!" || responseReg !== "wrong page" && label !== "signup_with" ) {
            setUserSignedIn(userObject.email);
            Cookies.set("jwtToken", userObject.email, { expires: 1 / 24 });
              navigate("/")
        
          } else if( responseReg === "Registration successful!" && label !== "signin" ) {
            setMessage("Registration successful!");
            setTimeout(() => {
              navigate("/login")
            }, 5000);
          }else {
            setMessage("Something went wrong");
          }
        } else {
          setMessage("Something went wrong");
        }
      } catch (error) {
        setMessage("Something went wrong");
      }
    }

    loadScript("https://accounts.google.com/gsi/client", () => {
      google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCallbackResponse,
      });
      const signInGoogle = document.getElementById("signInGoogle");
      if (signInGoogle) {
        google.accounts.id.renderButton(signInGoogle, {
          type: "standard",
          theme: "outline",
          size: "medium",
          text: label as "signin_with" | "signup_with" | "continue_with" | "signin",
          shape: "pill",
        });
      } else {
        console.error('Element with id "signInGoogle" not found.');
      }
    });
  }, [clientId,navigate,setMessage,label,setUserSignedIn]);

  return <div id="signInGoogle"></div>;
};

export default GoogleSignIn;