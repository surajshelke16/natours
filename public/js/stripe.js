import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51LDfVNSGXebgq3gPTbn99N0Kf29sunuBncpQhnuVCbyH9BBLUCZKgp6OvLXtCFFpZCUot6TPmOdU2hQHxtI0K9RD00FDKWd443'
);

export const bookTour = async (tourID) => {
  try {
    // Get checkout session from API
    const session = await axios(
      `/api/v1/bookings//checkout-session/${tourID}`
    );
    // console.log(session);
    // Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
