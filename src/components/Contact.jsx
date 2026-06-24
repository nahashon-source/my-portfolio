import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone, Clock } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { sendEmail } from "../utils/sendEmail";

const CONTACT_INFO = [
  { icon: Mail,  title: "Email",        value: "nashonmwendwa0@gmail.com" },
  { icon: MapPin, title: "Location",    value: "Nairobi, Kenya" },
  { icon: Phone,  title: "Phone",       value: "+254 748 495 724" },
  { icon: Clock,  title: "Availability", value: "Open to opportunities" },
];

const INITIAL_FORM = { name: "", email: "", subject: "", message: "", company: "" };

const INPUT_CLASS = `
  w-full px-4 py-2.5 rounded-xl text-sm
  bg-white/[0.03] border border-white/[0.07]
  text-white placeholder:text-white/20
  focus:outline-none focus:border-green-500/40 focus:bg-white/[0.05]
  transition-all
`;

const Contact = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot
    if (formData.company) return;

    if (formData.message.length > 1000) {
      toast.error("Message must be under 1000 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      await sendEmail(formData);
      toast.success("Message sent successfully!");
      setFormData(INITIAL_FORM);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#060a0d]">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0f1a13",
            color: "#e2e8f0",
            border: "1px solid rgba(34,197,94,0.15)",
            fontSize: "13px",
          },
        }}
      />

      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium text-green-500 uppercase tracking-widest mb-3">
            Contact
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Let's Work Together
          </h2>

          <p className="text-[15px] text-white/40 max-w-xl mx-auto leading-relaxed">
            Have a project, opportunity, or idea you'd like to discuss?
            Reach out and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">

          {/* Contact info */}
          <div className="space-y-3">
            {CONTACT_INFO.map((item, idx) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  className="
                    flex items-center gap-4 p-4 rounded-xl
                    bg-white/[0.02] border border-white/[0.06]
                    hover:border-green-500/15 hover:bg-white/[0.035]
                    transition-all
                  "
                >
                  <div className="w-9 h-9 rounded-lg bg-green-500/8 border border-green-500/15 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-green-400" size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 mb-0.5">{item.title}</p>
                    <p className="text-sm text-white/70">{item.value}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            aria-busy={isSubmitting}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4"
          >
            {/* Honeypot */}
            <input
              type="text"
              name="company"
              className="hidden"
              onChange={handleChange}
              tabIndex={-1}
              aria-hidden="true"
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-white/35 mb-1.5">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={50}
                  autoComplete="name"
                  placeholder="Your name"
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label className="block text-xs text-white/35 mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  placeholder="your@email.com"
                  className={INPUT_CLASS}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/35 mb-1.5">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                maxLength={100}
                placeholder="What's this about?"
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label className="block text-xs text-white/35 mb-1.5">Message</label>
              <textarea
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                maxLength={1000}
                required
                placeholder="Tell me about your project..."
                className={`${INPUT_CLASS} resize-none`}
              />
              <p className="text-right text-[11px] text-white/20 mt-1">
                {formData.message.length}/1000
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full py-3 rounded-xl
                bg-green-700 hover:bg-green-600
                text-white text-sm font-medium
                flex items-center justify-center gap-2
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-colors
              "
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                <>
                  <Send size={15} />
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