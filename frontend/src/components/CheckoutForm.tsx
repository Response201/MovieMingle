import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

interface CheckoutFormProps {
  price: number;
  setShowPayment: (show: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  price,
  setShowPayment,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe.js has not loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card Element not found.");
      return;
    }

    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

    if (paymentMethodError || !paymentMethod) {
      setError("Something went wrong.");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://movie-mingle-server.vercel.app/create-payment-intent",
        { amount: price * 100 }
      );
      const { clientSecret } = data;
      const { error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethod.id,
        }
      );

      if (confirmError) {
        setError("Something went wrong.");
      } else {
        setSuccess(true);
        setTimeout(() => {
          setShowPayment(false);
        }, 3000);
      }
    } catch (error) {
      setError("Failed to process payment.");
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }, [error]);

  const cardElementOptions = {
    hidePostalCode: true,
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <CardElement className="payment-element" options={cardElementOptions} />
      <button type="submit" disabled={!stripe}>
        Pay {price} kr
      </button>
      <button type="button" onClick={() => setShowPayment(false)}>
        Close
      </button>
      {!success && error && <div className="payment-message">{error}</div>}
      {success && <div className="payment-message">Payment successful!</div>}
    </form>
  );
};

export default CheckoutForm;
