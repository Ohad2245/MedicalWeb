import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe('pk_test_51M3fIiHoKGSSL2BgJmo9oYduFu6rxTSQAaioDvbHZc3qx06rSKjj5cyUv8swMEYG043soXmEjBV5u8KPhuW6Ttju00aWlBBxUR');
  }

  return stripePromise;
}

export default getStripe;