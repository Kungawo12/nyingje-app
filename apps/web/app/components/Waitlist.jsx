"use client";
import { useState } from "react";

export default function Waitlist() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <section id="waitlist" className="py-16 px-4 flex flex-col items-center bg-surface">
      <h2 className="font-heading text-2xl mb-4">Join the Waitlist — be first when we launch.</h2>
      {submitted ? (
        <div className="text-primary text-lg font-medium">Thank you, we'll be in touch!</div>
      ) : (
        <form
          className="flex flex-col sm:flex-row gap-3 items-center"
          onSubmit={e => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <input
            type="email"
            required
            placeholder="Your email"
            className="px-4 py-2 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-bg text-text min-w-[220px]"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary text-bg px-6 py-2 rounded-full font-semibold hover:bg-primary/90 transition"
          >
            Join
          </button>
        </form>
      )}
    </section>
  );
}
