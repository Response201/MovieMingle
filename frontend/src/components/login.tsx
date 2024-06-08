import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useGlobalContext } from "../contexts/GlobalContext";

interface GoogleResponse {
    credential: string;
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



	console.log(import.meta.env.VITE_CLIENTID)
    function handleCallbackResponse(response: GoogleResponse) {
		const userObject = jwtDecode(response.credential);
        Cookies.set("jwtToken", response.credential, { expires: 1 / 24 });
        const current = Date.now() / 1000;
        if (userObject.exp && userObject.exp > current) {
            setUserSignedIn(response.credential);
        } else {
            Cookies.set("jwtToken", "");
        }
    }

    useEffect(() => {
        loadScript("https://accounts.google.com/gsi/client", () => {
            // Initialize Google Accounts ID
            google.accounts.id.initialize({
                client_id: import.meta.env.VITE_CLIENTID,
                callback: handleCallbackResponse,
            });

            const signInDiv = document.getElementById("signInDiv");
            if (signInDiv) {
                google.accounts.id.renderButton(signInDiv, {
                    type: "standard",
                    theme: "outline",
                    size: "large",
                });
            } else {
                console.error('Element with id "signInDiv" not found.');
            }
        });
    }, []);

    useEffect(() => {
        const signInDiv = document.getElementById("signInDiv");
        const signOutDiv = document.getElementById("signOutDiv");

        const div = document.querySelector<HTMLElement>(".loginOut")!;
        if (signInDiv && signOutDiv) {
            if (userSignedIn !== "") {
                signInDiv.hidden = true;
                signOutDiv.hidden = false;
                div.style.right = "6rem";
            } else {
                signInDiv.hidden = false;
                signOutDiv.hidden = true;
                div.style.right = "1rem";
            }
        }
    }, [userSignedIn]);

    const handleSignOut = () => {
        Cookies.remove("jwtToken");
        setUserSignedIn("");
    };

    return (
        <section className="loginOut">
            <div id="signInDiv"></div>
            <button onClick={() => handleSignOut()} id="signOutDiv">
                logga ut
            </button>
        </section>
    );
};
