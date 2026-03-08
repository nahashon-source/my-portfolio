import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { sendEmail } from "../services/emailService";

const contactInfo = [
  { icon: Mail, title: "Email", value: "nashonmwendwa0@gmail.com" },
  { icon: MapPin, title: "Location", value: "Nairobi, Kenya" },
  { icon: Phone, title: "Phone", value: "+254 748 495 724" },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    company: "", // honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.company) {
      return; // bot detected
    }

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
      className="py-24 bg-white dark:bg-gray-900"
    >
      <Toaster position="top-right" />

      <div className="container mx-auto px-6 md:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Get in Touch
          </h2>

          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Interested in collaborating or discussing a project? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">

          {/* Contact Info */}
          <div className="space-y-8">
            {contactInfo.map((item, idx) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="p-3 rounded-lg bg-green-100 dark:bg-gray-800">
                    <Icon className="text-green-600 dark:text-green-400" size={24} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
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
            className="space-y-6"
            aria-busy={isSubmitting}
          >
            {/* Honeypot */}
            <input
              type="text"
              name="company"
              className="hidden"
              onChange={handleChange}
            />

            <div>
              <label className="block text-sm font-medium mb-2">
                Name
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
                maxLength={50}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                autoComplete="email"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Message
              </label>

              <textarea
                name="message"
                rows={5}
                maxLength={1000}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <div className="text-xs text-gray-500 mt-1 text-right">
                {formData.message.length}/1000
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center disabled:opacity-50"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send size={18} className="mr-2" />
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