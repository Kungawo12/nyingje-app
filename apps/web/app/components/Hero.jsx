export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-20 px-4 bg-bg">
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-80 h-80 rounded-full bg-gradient-to-br from-accent/30 to-accent/0 blur-3xl opacity-60" />
      </div>
      <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4 z-10">A compassionate companion for your hardest moments.</h1>
      <p className="text-muted text-lg md:text-2xl mb-8 z-10 max-w-2xl">Rooted in Buddhist wisdom and modern psychology — Nyingje listens, reflects, and helps you find your way through.</p>
      <div className="flex gap-4 justify-center z-10">
        <a href="#waitlist" className="bg-primary text-bg px-6 py-3 rounded-full font-semibold shadow hover:bg-primary/90 transition">Join the Waitlist</a>
        <a href="#features" className="border border-primary text-primary px-6 py-3 rounded-full font-semibold hover:bg-primary hover:text-bg transition">Learn more ↓</a>
      </div>
    </section>
  );
}
