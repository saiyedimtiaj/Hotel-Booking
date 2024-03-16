import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-hot-toast";

const Payment = ({ setOpen, totalPrice, bookingInfo, refetch }) => {
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const { user } = useAuth();
  const elements = useElements();
  const axios = useAxiosPublic();

  useEffect(() => {
    if (totalPrice > 0) {
      axios
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axios, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });

    const reservations = {
      startDate: bookingInfo?.startDate,
      endDate: bookingInfo?.endDate,
    };

    if (confirmError) {
      toast.error(confirmError.message);
    } else {
      console.log(paymentIntent, "payment intent");
      if (paymentIntent.status === "succeeded") {
        setOpen(false);
        axios.post("/bookings", bookingInfo).then((res) => {
          if (res.data.insertedId) {
            toast.success("Your booking is added Sucessfully");
            refetch();
          }
        });
      }
    }
  };
  return (
    <form className="mt-3 md:w-[420px]" onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="flex gap-8 items-center justify-center mt-3">
        <button
          className="bg-blue-600 text-white px-5 py-1.5 rounded"
          type="submit"
          disabled={!stripe}
        >
          Pay
        </button>
        <button
          onClick={() => setOpen(false)}
          className="bg-rose-300 text-black px-5 rounded py-1.5"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Payment;
