import emailjs from '@emailjs/browser';

const YOUR_SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID';
const YOUR_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';
const YOUR_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';

export const sendEmail = async (data) => {
  try {
    const response = await emailjs.send(
      YOUR_SERVICE_ID,
      YOUR_TEMPLATE_ID,
      {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
      },
      YOUR_PUBLIC_KEY
    );
    return response;
  } catch (error) {
    throw new Error('Failed to send email');
  }
};