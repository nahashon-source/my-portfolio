import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Sends an email using EmailJS.
 * Template variables: from_name, from_email, message
 */
export const sendEmail = async (data) => {
  const response = await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
    },
    PUBLIC_KEY
  );

  return response;
};