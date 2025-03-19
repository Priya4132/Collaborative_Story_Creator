import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { amount } = req.body; // Amount in paise (50000 = ₹500)

    const razorpay = new Razorpay({
      key_id: process.env.key_id,
      key_secret: process.env.key_secret,
    });

    const options = {
      amount: amount, // Pass the amount from frontend
      currency: "INR",
      receipt: "receipt#1",
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}