export default function Features() {
  return (
    <section id="features" className="py-16 px-4 bg-surface">
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="bg-bg rounded-xl shadow-sm p-6 flex flex-col items-center text-center border border-border">
          <span className="text-4xl mb-3">🧘‍♂️</span>
          <h3 className="font-heading text-xl mb-2">Compassionate Listening</h3>
          <p className="text-muted">Understands emotional nuance, never judges</p>
        </div>
        <div className="bg-bg rounded-xl shadow-sm p-6 flex flex-col items-center text-center border border-border">
          <span className="text-4xl mb-3">📿</span>
          <h3 className="font-heading text-xl mb-2">Buddhist Wisdom</h3>
          <p className="text-muted">Draws on centuries of contemplative practice</p>
        </div>
        <div className="bg-bg rounded-xl shadow-sm p-6 flex flex-col items-center text-center border border-border">
          <span className="text-4xl mb-3">🔒</span>
          <h3 className="font-heading text-xl mb-2">Private & Secure</h3>
          <p className="text-muted">Encrypted, zero data sharing, delete anytime</p>
        </div>
      </div>
    </section>
  );
}
