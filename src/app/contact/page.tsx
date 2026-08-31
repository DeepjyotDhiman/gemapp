"use client";

import React, { useState } from "react";
import { MessageCircle, Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    gemstoneInterest: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FBF9F4] min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3 pb-8 mb-10 border-b border-[#E8E2D6]">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B88E3E]">
            Direct Inquiries
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1C1917]">
            Contact Bhatia Gems
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] max-w-2xl mx-auto leading-relaxed">
            Have a question about a specific gemstone, custom ring/pendant mounting, or certification details? We are here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Quick Connect Card */}
            <div className="bg-white rounded-xl border border-[#E8E2D6] p-6 sm:p-7 subtle-shadow space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-semibold text-[#1C1917]">
                    Instant WhatsApp Support
                  </h2>
                  <p className="text-xs text-[#78716C]">Fastest response for stone availability & videos</p>
                </div>
              </div>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Connect with our gemstone specialist directly. We can share macro videos under natural sunlight, certificate previews, and sizing recommendations.
              </p>
              <a
                href="https://wa.me/919876543210?text=Hello%20Bhati%20Gems,%20I%20have%20an%20inquiry%20regarding%20natural%20gemstones."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Business Contact Details (Clearly Marked Placeholders) */}
            <div className="bg-white rounded-xl border border-[#E8E2D6] p-6 sm:p-7 subtle-shadow space-y-5">
              <h3 className="font-serif text-base font-semibold text-[#1C1917] pb-3 border-b border-[#F4EFE6]">
                Business Details
              </h3>

              <ul className="space-y-4 text-xs text-[#57534E]">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B88E3E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1C1917] block">Showroom / Studio</span>
                    <span>[Jaipur / Delhi Gem Market Placeholder, India]</span>
                    <span className="text-[10px] text-[#A8A29E] block mt-0.5 italic">
                      Physical visiting hours by prior appointment.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#B88E3E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1C1917] block">Phone & WhatsApp</span>
                    <span>+91 98765 43210 [Placeholder]</span>
                    <span className="text-[10px] text-[#78716C] block">Mon – Sat, 10:00 AM – 7:30 PM IST</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#B88E3E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1C1917] block">Email Inquiries</span>
                    <span>contact@bhatiagems.com [Placeholder]</span>
                  </div>
                </li>
              </ul>

              <div className="p-3 bg-[#F4EFE6] rounded text-[11px] text-[#78716C] border border-[#B88E3E]/20">
                Notice: Contact details and office address are temporary placeholders for Phase 1 and will be updated with confirmed business details.
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl border border-[#E8E2D6] p-6 sm:p-8 subtle-shadow">
              <h2 className="font-serif text-xl font-semibold text-[#1C1917] mb-1">
                Send an Inquiry Message
              </h2>
              <p className="text-xs text-[#78716C] mb-6">
                Fill out the form below and our team will get in touch with you.
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-[#F4EFE6] rounded-lg border border-[#B88E3E]/30 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white text-[#B88E3E] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                    Inquiry Received
                  </h3>
                  <p className="text-xs text-[#57534E] max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out to Bhatia Gems. Our specialist will respond via WhatsApp or phone shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", mobile: "", email: "", gemstoneInterest: "", message: "" });
                    }}
                    className="mt-4 px-4 py-2 bg-[#1C1917] text-white text-xs font-semibold rounded hover:bg-[#B88E3E] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825] mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Rajesh Sharma"
                        className="w-full px-3.5 py-2.5 bg-[#FBF9F4] border border-[#E8E2D6] rounded text-sm text-[#1C1917] focus:outline-none focus:bg-white focus:border-[#B88E3E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825] mb-1">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="9876543210"
                        className="w-full px-3.5 py-2.5 bg-[#FBF9F4] border border-[#E8E2D6] rounded text-sm text-[#1C1917] focus:outline-none focus:bg-white focus:border-[#B88E3E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rajesh@example.com"
                        className="w-full px-3.5 py-2.5 bg-[#FBF9F4] border border-[#E8E2D6] rounded text-sm text-[#1C1917] focus:outline-none focus:bg-white focus:border-[#B88E3E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825] mb-1">
                        Gemstone of Interest
                      </label>
                      <input
                        type="text"
                        value={formData.gemstoneInterest}
                        onChange={(e) => setFormData({ ...formData, gemstoneInterest: e.target.value })}
                        placeholder="e.g. Yellow Sapphire (Pukhraj), Ruby"
                        className="w-full px-3.5 py-2.5 bg-[#FBF9F4] border border-[#E8E2D6] rounded text-sm text-[#1C1917] focus:outline-none focus:bg-white focus:border-[#B88E3E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825] mb-1">
                      Message / Requirement
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please let us know your preferred carat weight, astrological purpose, budget range, or questions about certification..."
                      className="w-full px-3.5 py-2.5 bg-[#FBF9F4] border border-[#E8E2D6] rounded text-sm text-[#1C1917] focus:outline-none focus:bg-white focus:border-[#B88E3E]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-md bg-[#1C1917] hover:bg-[#B88E3E] text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
