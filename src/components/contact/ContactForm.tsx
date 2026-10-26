"use client";

import { useState } from "react";
import { HiMail } from "react-icons/hi";
import Button from "@/components/ui/Button";
import { sendContactMessage } from "@/app/actions";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const result = await sendContactMessage(formData);
      if (result.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", subject: "", message: "", company: "" });
      } else {
        setError(result.error);
        setStatus("error");
      }
    } catch {
      setError("Something went wrong. Please try again later.");
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full  border border-black/[0.08] bg-white px-4 py-3.5 text-sm text-cream-heading outline-none transition-all duration-300 placeholder:text-cream-muted/60 focus:border-gold-dark focus:bg-white focus:shadow-[0_0_0_3px_rgba(138,109,27,0.1)]";

  if (status === "sent") {
    return (
      <div className="border border-gold-dark/20 bg-gold-dark/6 p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center bg-gold-dark/10">
          <HiMail className="text-gold-dark" size={24} />
        </div>
        <h3 className="mt-4 text-xl font-bold text-cream-heading">
          Message Sent!
        </h3>
        <p className="mt-2 text-cream-body">
          Thank you for reaching out. We&apos;ve emailed you a copy and will respond as soon as possible.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-medium text-gold-dark underline underline-offset-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        className="hidden"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-cream-heading">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClasses}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-cream-heading">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClasses}
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-cream-heading">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className={inputClasses}
          placeholder="How can we help?"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-cream-heading">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`${inputClasses} resize-none`}
          placeholder="Your message..."
        />
      </div>
      {status === "error" && (
        <p role="alert" className="text-sm text-red-dark">
          {error}
        </p>
      )}
      <Button type="submit" variant="primary" size="lg" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
