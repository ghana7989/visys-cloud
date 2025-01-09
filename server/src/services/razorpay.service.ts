import Razorpay from 'razorpay';
import { Orders } from 'razorpay/dist/types/orders';

// Initialize Razorpay with test credentials
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_ID',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'YOUR_KEY_SECRET'
});

export const createOrder = async (amount: number, currency: string = 'INR') => {
  const options :Orders.RazorpayOrderCreateRequestBody= {
    amount: amount * 100, // Razorpay expects amount in paise
    currency,
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

export const verifyPayment = (razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string) => {
  const hmac = require('crypto').createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(`${razorpayOrderId}|${razorpayPaymentId}`);
  const generated_signature = hmac.digest('hex');
  
  return generated_signature === razorpaySignature;
}; 
