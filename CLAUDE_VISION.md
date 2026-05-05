# Nyingje App — Senior Engineer Vision

> Maintained by: Claude (Senior Software Engineer)
> Last updated: 2026-05-05

---

## Mission

Build a compassionate AI companion that bridges Buddhist wisdom with modern psychology.
Not a chatbot — a genuine support presence for people in emotional pain.

---

## Core Principles

1. **Privacy first** — encrypted conversations, zero data sharing, full user control
2. **Culturally grounded** — genuine Buddhist framework, not superficial spiritual aesthetics
3. **Clinically aware** — not a replacement for therapy; knows its limits, refers when needed
4. **Multilingual** — English first, Tibetan in Phase 3
5. **Accessible** — works on low-end devices, offline where possible

---

## Architecture Decisions

### AI Layer
- **Claude API** as the primary conversation engine (empathy, nuance, long context)
- Claude handles: therapy-adjacent conversations, Buddhist guidance, emotional reflection
- GPT-4.1 used during development: code generation, research, problem-solving

### Mobile
- React Native + Expo — single codebase for iOS and Android
- Expo Go for development, EAS Build for production
- Local-first where possible (offline mood logging)

### Backend
- Node.js + Express — lightweight, fast, familiar ecosystem
- RESTful API + WebSocket for real-time chat
- JWT auth with refresh tokens

### Database
- PostgreSQL — encrypted at rest (pgcrypto)
- Per-user encryption keys derived from their credentials
- Conversation memory stored with TTL (user-configurable)

---

## Phase Roadmap

### Phase 1 — Core (Current)
- [ ] Project scaffolding (mobile + backend)
- [ ] Auth (sign up, login, JWT)
- [ ] Chat screen with Claude API integration
- [ ] Conversation memory (last N turns in context)
- [ ] Buddhist knowledge base (static, curated)
- [ ] Basic onboarding flow

### Phase 2 — Depth
- [ ] Mood tracking with patterns
- [ ] Guided breathing practices
- [ ] Weekly insights from conversation patterns
- [ ] Push notifications (gentle check-ins)

### Phase 3 — Tibetan
- [ ] Full Tibetan UI translation
- [ ] Tibetan language conversation support
- [ ] Culturally specific content for Tibetan users

---

## Team

| Role | Agent | Responsibility |
|------|-------|----------------|
| Senior Engineer / Architect | Claude (Sonnet 4.6) | Vision, architecture, code review, task assignment |
| Coder / Researcher | GPT-4.1 | Code generation, research, problem solving |
| Product Owner | Tenzin | Direction, decisions, testing |

---

## Communication Protocol

See `WORKFLOW.md` for how Claude and GPT-4.1 communicate via the bridge.
