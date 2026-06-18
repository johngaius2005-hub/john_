import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Mail, MapPin, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { ContactFormData } from "../types";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

export default function ContactModal({ isOpen, onClose, userEmail }: ContactModalProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validate = (): boolean => {
    const tempErrors: Partial<ContactFormData> = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }
    if (!formData.subject.trim()) tempErrors.subject = "Subject is required";
    if (!formData.message.trim()) tempErrors.message = "Message is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#06070c]/90 backdrop-blur-md"
            id="contact-modal-backdrop"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl bg-[#0d101d]/90 border border-zinc-800/80 rounded-2xl shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-[85vh]"
            id="contact-modal-content"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition z-20"
              aria-label="Close Contact Panel"
              id="close-contact-modal-btn"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left Column: Ambient Info Panel */}
            <div className="md:col-span-5 bg-gradient-to-b from-[#11162b] to-[#0a0a0f] p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-800/50">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase font-medium">Keep In Touch</span>
                  <h3 className="text-xl md:text-2xl font-display font-semibold text-white mt-1">
                    Connect Personally
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    Have an interesting system challenge, design request, or cooperative initiative? Drop me a line, and let's craft something outstanding.
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-center justify-center text-sky-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono text-zinc-500 uppercase">Direct Email</span>
                      <a href={`mailto:${userEmail}`} className="text-xs font-mono text-zinc-300 hover:text-sky-400 transition">
                        {userEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-center justify-center text-indigo-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono text-zinc-500 uppercase">Location Basis</span>
                      <span className="text-xs text-zinc-300">San Francisco Bay Area, CA</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Details/Social handles */}
              <div className="pt-6 border-t border-zinc-900 flex flex-col gap-2">
                <span className="text-[9px] font-mono text-zinc-500 uppercase">Digital Coordinates</span>
                <div className="flex items-center gap-3 text-xs">
                  <a href="https://github.com/johngaius" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition">GitHub</a>
                  <span className="text-zinc-700">•</span>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition">LinkedIn</a>
                  <span className="text-zinc-700">•</span>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition">Twitter</a>
                </div>
              </div>
            </div>

            {/* Right Column: Interaction Form */}
            <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-center bg-zinc-950/45 min-h-[400px]">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    id="contact-form"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Julian Vance"
                          className={`w-full px-3.5 py-2 rounded-lg bg-zinc-900/50 border ${
                            errors.name ? "border-rose-500" : "border-zinc-800 focus:border-sky-500"
                          } text-xs text-white placeholder-zinc-600 focus:outline-none transition-colors`}
                        />
                        {errors.name && (
                          <p className="text-[10px] text-rose-500 mt-0.5">{errors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                          Your Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="julian@vance.io"
                          className={`w-full px-3.5 py-2 rounded-lg bg-zinc-900/50 border ${
                            errors.email ? "border-rose-500" : "border-zinc-800 focus:border-sky-500"
                          } text-xs text-white placeholder-zinc-600 focus:outline-none transition-colors`}
                        />
                        {errors.email && (
                          <p className="text-[10px] text-rose-500 mt-0.5">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                        Topic or Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Collaboration on Intelligent State Caching Project"
                        className={`w-full px-3.5 py-2 rounded-lg bg-zinc-900/50 border ${
                          errors.subject ? "border-rose-500" : "border-zinc-800 focus:border-sky-500"
                        } text-xs text-white placeholder-zinc-600 focus:outline-none transition-colors`}
                      />
                      {errors.subject && (
                        <p className="text-[10px] text-rose-500 mt-0.5">{errors.subject}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Hello John, I read your showcase panel and am interested in exploring..."
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/50 border ${
                          errors.message ? "border-rose-500" : "border-zinc-800 focus:border-sky-500"
                        } text-xs text-white placeholder-zinc-600 focus:outline-none h-28 resize-none transition-colors leading-relaxed`}
                      />
                      {errors.message && (
                        <p className="text-[10px] text-rose-500 mt-0.5">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-4 flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-sky-500 text-zinc-950 font-medium text-xs hover:bg-sky-400 hover:shadow-sky-500/10 hover:shadow-lg disabled:bg-zinc-800 disabled:text-zinc-600 transition duration-300"
                      id="submit-contact-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Routing Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Enroute Message</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8 space-y-4"
                    id="contact-success-state"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-semibold text-white font-display">Communication Transmitted!</h4>
                      <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                        Your message has bypassed local filters and successfully dispatched to <span className="text-sky-400 font-mono">{userEmail}</span>.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/80 text-xs text-zinc-300 hover:text-white transition"
                    >
                      <span>Return home</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
