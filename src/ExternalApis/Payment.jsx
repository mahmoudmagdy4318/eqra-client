import React from "react";
import StripeCheckout from "react-stripe-checkout";
// import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../API/axiosInstance";
import './styles.css'
toast.configure();

const Payment = ({ product }) => {
  async function handleToken(token, addresses) {
    console.log('product',product)
    const response = await axiosInstance.post("api/checkout", { token, product });
    const { status } = response.data;
    console.log("Response:", response);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return (
    <>
      <StripeCheckout
        ComponentClass="myStripe"
        stripeKey="pk_test_qldeOx2RsqvPXmVGAlXBlZQQ00qufvfDcj"
        token={handleToken}
        amount={product.price * 100}
        name={product.name}
        label="get a copy"
        billingAddress
        shippingAddress
      />
    </>
  );
}

export default Payment
