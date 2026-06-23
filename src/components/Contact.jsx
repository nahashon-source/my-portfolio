import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { sendEmail } from "../utils/sendEmail";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "nashonmwendwa0@gmail.com",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Nairobi, Kenya",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+254 748 495 724",
  },
  {
    icon: Clock,
    title: "Availability",
    value: "Open to opportunities",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.company) return;

    if (formData.message.length > 1000) {
      toast.error("Message must be under 1000 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      await sendEmail(formData);

      toast.success("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        company: "",
      });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-gray-50 dark:bg-gray-900"
    >
      <Toaster position="top-right" />

      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-green-600 font-semibold uppercase tracking-widest mb-2">
            Contact
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Let's Work Together
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have a project, opportunity, or idea you'd like to discuss?
            Feel free to reach out and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((item, idx) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="
                    flex items-start gap-4
                    p-5 rounded-2xl
                    bg-white dark:bg-gray-800
                    shadow-md hover:shadow-xl
                    transition-all
                  "
                >
                  <div className="
                    w-12 h-12 rounded-xl
                    bg-green-100 dark:bg-green-900/30
                    flex items-center justify-center
                  ">
                    <Icon className="text-green-600" size={22} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            aria-busy={isSubmitting}
            className="
              p-8 rounded-2xl
              bg-white dark:bg-gray-800
              shadow-lg
              space-y-6
            "
          >
            {/* Honeypot */}
            <input
              type="text"
              name="company"
              className="hidden"
              onChange={handleChange}
            />

            <div>
              <label className="block mb-2 font-medium">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={50}
                autoComplete="name"
                className="
                  w-full px-4 py-3 rounded-xl
                  border border-gray-200
                  dark:border-gray-700
                  bg-gray-50 dark:bg-gray-900
                  focus:ring-2 focus:ring-green-500
                  outline-none
                "
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="
                  w-full px-4 py-3 rounded-xl
                  border border-gray-200
                  dark:border-gray-700
                  bg-gray-50 dark:bg-gray-900
                  focus:ring-2 focus:ring-green-500
                  outline-none
                "
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                maxLength={100}
                className="
                  w-full px-4 py-3 rounded-xl
                  border border-gray-200
                  dark:border-gray-700
                  bg-gray-50 dark:bg-gray-900
                  focus:ring-2 focus:ring-green-500
                  outline-none
                "
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Message
              </label>

              <textarea
                rows={6}
                name="message"
                value={formData.message}
                onChange={handleChange}
                maxLength={1000}
                required
                className="
                  w-full px-4 py-3 rounded-xl
                  border border-gray-200
                  dark:border-gray-700
                  bg-gray-50 dark:bg-gray-900
                  focus:ring-2 focus:ring-green-500
                  outline-none
                "
              />

              <div className="text-right text-xs text-gray-500 mt-2">
                {formData.message.length}/1000
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full py-4
                rounded-xl
                bg-green-600
                hover:bg-green-700
                text-white
                font-medium
                flex items-center justify-center gap-2
                disabled:opacity-50
                transition
              "
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;