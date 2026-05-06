"use client";
import { useState } from "react";

export default function Waitlist() {
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message || "You're on the list! We'll be in touch.");
      setSubmitted(true);
    } catch {
      setMessage("Something went wrong. Please try again.");
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="waitlist" className="py-16 px-4 flex flex-col items-center bg-surface">
      <h2 className="font-heading text-2xl mb-4">Join the Waitlist — be first when we launch.</h2>
      {submitted ? (
        <div className="text-primary text-lg font-medium">{message}</div>
      ) : (
        <form
          className="flex flex-col sm:flex-row gap-3 items-center"
          onSubmit={handleSubmit}
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
            disabled={loading}
            className="bg-primary text-bg px-6 py-2 rounded-full font-semibold hover:bg-primary/90 transition disabled:opacity-60"
          >
            {loading ? "Joining…" : "Join"}
          </button>
        </form>
      )}
    </section>
  );
}
