import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { IPricingPlan } from "../types";


const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = resolve;
    document.body.appendChild(script);
  });
};


export const createOrder = async (plan:IPricingPlan) => {
  await loadRazorpayScript();
  const response = await axios.post(API_BASE_URL + '/customers/create-payment-order', {
    amount: Number(plan.price.replace(/[^0-9.-]+/g,"")),
    currency: 'USD'
  });
  return response;
};
