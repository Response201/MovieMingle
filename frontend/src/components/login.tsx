import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useGlobalContext } from "../contexts/GlobalContext";
import { FetchRegUser } from "../services/FetchRegUser";
import { useNavigate } from "react-router-dom";

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

export const Login = () => {
  const { userSignedIn, setUserSignedIn } = useGlobalContext();
const navigate = useNavigate()
  useEffect(() => {
    function handleCallbackResponse(response: GoogleResponse) {
      const userObject: DecodedJWT = jwtDecode(response.credential);
      Cookies.set("jwtToken", response.credential, { expires: 1 / 24 });
      const current = Date.now() / 1000;

      if (userObject.exp && userObject.exp > current) {
        setUserSignedIn(response.credential);
        if (userObject.email) {
          FetchRegUser(userObject.email, null, "google");
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
  }, [setUserSignedIn]);

  useEffect(() => {
    const signInDiv = document.getElementById("signInDiv");
    const signOutDiv = document.getElementById("signOutDiv");

    if (signInDiv && signOutDiv) {
      if (userSignedIn !== "") {
        signInDiv.hidden = true;
        signOutDiv.hidden = false;
      } else {
        signInDiv.hidden = false;
        signOutDiv.hidden = true;
      }
    }
  }, [userSignedIn]);

  const handleSignOut = () => {
    Cookies.remove("jwtToken");
    setUserSignedIn("");
  };

  const handleSignIn = () => {
   navigate("/LoginPage")
  };



  return (
    <section className="loginOut">
    {/*   <div id="signInGoogle"></div> */}
      <button onClick={() => handleSignIn()} id="signInDiv"> Sign In </button>
      <button onClick={() => handleSignOut()} id="signOutDiv">
     
        Logout
      </button>
    </section>
  );
};
export default Login;
