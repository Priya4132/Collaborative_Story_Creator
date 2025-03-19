import React, { useEffect, useState } from "react";

export const PaymentComponent = () => {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  const createOrder = async () => {
    try {
      const response = await fetch("https://collaborative-story-creator.vercel.app/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 200 }), // ₹2
      });
  
      const order = await response.json();
      return order.id;
    } catch (error) {
      console.error("Error creating order:", error);
      return null;
    }
  };

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      alert("Razorpay SDK is still loading. Please wait.");
      return;
    }

    const order_id = await createOrder();

    if (!order_id) return;

    // alert("button is clicked")
    const options = {
      key: "rzp_test_bEWNPZaAnEdkkv",
      amount: 200, // Amount in paise (₹2)
      currency: "INR",
      name: "Prima",
      description: "Test Transaction",
      order_id: order_id, // Generate order_id from server
      handler: (response) => {
        console.log(response);
        alert("Payment Successful!");
      },
      prefill: {
        name: "Priya Tripathi",
        email: "priya.aakashmishra@gmail.com",
        contact: "9569576205",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <button onClick={handlePayment} disabled={!razorpayLoaded}>
        {razorpayLoaded ? "Pay Now" : "Loading..."}
      </button>
    </div>
  );
};