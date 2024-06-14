import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Movie } from "../model/movie";
import { useGlobalContext } from "../contexts/GlobalContext";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_TEST_VAR);

interface IMovieProps {
  movie: Movie;
}

export const MoviePresentation = (props: IMovieProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userSignedIn } = useGlobalContext();
  const [showPayment, setShowPayment] = useState(false);

  return (
    <div
      onClick={() => {
        navigate("/movie/" + props.movie.id);
        if (location.pathname === "/") {
          navigate("/movie/" + props.movie.id);
        }
      }}
      className="movie"
    >
      {location.pathname === "/movie/" + props.movie.id ? (
        <>
          <img
            className="movie__image-selected"
            src={props.movie.image}
            alt={props.movie.title}
          />
          <div className="movie__info-wrapper">
            <h3 className="movie__title-selected">{props.movie.title}</h3>
            <p className="movie__genre-selected">
              {props.movie.genre} | {props.movie.length} min
            </p>
            <p className="movie__description">{props.movie.description}</p>
            {userSignedIn ? (
              <>
                <button
                  className="movie__button-rent"
                  onClick={() => setShowPayment(true)}
                >
                  Rent: {props.movie.price} kr
                </button>
                {showPayment && (
                  <section className="payment">
                    <Elements stripe={stripePromise}>
                      <CheckoutForm
                        price={props.movie.price}
                        setShowPayment={setShowPayment}
                      />
                    </Elements>
                  </section>
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        <>
          <img
            className="movie__image"
            src={props.movie.image}
            alt={props.movie.title}
          />
          <h3 className="movie__title">{props.movie.title}</h3>
        </>
      )}
    </div>
  );
};

export default MoviePresentation;
