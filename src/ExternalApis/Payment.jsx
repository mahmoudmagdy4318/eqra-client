import React from "react";
import StripeCheckout from "react-stripe-checkout";
// import axios from "axios";
// import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../API/axiosInstance";
import './styles.css'
import Snack from "../utils/Snackbar";

// toast.configure();

const Payment = ({product}) => {
  async function handleToken(token, addresses) {
    const response = await axiosInstance.post("api/checkout", {token,product});
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      <Snack />
      // toast("Success! Check email for details", { type: "success" });
    } else {
      // toast("Something went wrong", { type: "error" });
    }
  }

  return (
    <>
      <StripeCheckout
      ComponentClass="myStripe"
        stripeKey="pk_test_qldeOx2RsqvPXmVGAlXBlZQQ00qufvfDcj"
        token={handleToken}
        amount={product.price * 100}
        name="Tesla Roadster"
        label="get a copy"
        billingAddress
        shippingAddress
      />
    </>
  );
}

export default Payment
