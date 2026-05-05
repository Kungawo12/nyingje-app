"use client";
export default function Nav() {
  return (
    <nav className="sticky top-0 z-30 bg-bg/80 backdrop-blur border-b border-border flex items-center justify-between px-6 py-4">
      <span className="font-heading italic text-2xl text-primary">nyingje</span>
      <button
        className="border border-primary text-primary rounded-full px-5 py-2 font-medium hover:bg-primary hover:text-bg transition"
        onClick={() => {
          document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Get Early Access
      </button>
    </nav>
  );
}
