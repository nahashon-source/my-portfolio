// import emailjs from '@emailjs/browser';

// const YOUR_SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID';
// const YOUR_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';
// const YOUR_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';

// export const sendEmail = async (data) => {
//   try {
//     const response = await emailjs.send(
//       YOUR_SERVICE_ID,
//       YOUR_TEMPLATE_ID,
//       {
//         from_name: data.name,
//         from_email: data.email,
//         message: data.message,
//       },
//       YOUR_PUBLIC_KEY
//     );
//     return response;
//   } catch (error) {
//     throw new Error('Failed to send email');
//   }
// };





// src/utils/sendEmail.js
import emailjs from '@emailjs/browser';

// Use environment variables for safety
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Sends an email using EmailJS
 * @param {Object} data - Form data
 * @param {string} data.name - Sender's name
 * @param {string} data.email - Sender's email
 * @param {string} data.message - Message body
 * @returns {Promise<Object>} - EmailJS response object
 */
export const sendEmail = async (data) => {
  try {
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
  } catch (error) {
    console.error("❌ EmailJS error:", error);
    throw new Error(error.text || "Failed to send email");
  }
};
