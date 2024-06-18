
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";



export const Login = () => {
  const { userSignedIn, setUserSignedIn } = useGlobalContext();
  const navigate = useNavigate()


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

      <button onClick={() => handleSignIn()} id="signInDiv"> Sign In </button>
      <button onClick={() => handleSignOut()} id="signOutDiv">
     
        Logout
      </button>
    </section>
  );
};
export default Login;
