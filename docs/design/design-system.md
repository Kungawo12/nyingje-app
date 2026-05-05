# Nyingje Design System

> Defined by: Claude (Senior Engineer)
> Applied to: Website + Mobile

---

## Brand Identity

Nyingje (ཉིང་རྗེ) means compassion in Tibetan.
The visual language should feel: **calm, grounded, warm, trustworthy** — not clinical, not overly spiritual.
Think: a quiet monastery library meets a modern wellness app.

---

## Color Palette

```
Background:     #FDFCF8   warm white — primary page/screen background
Surface:        #F4F1EB   warm off-white — cards, bubbles, inputs
Primary:        #5B7FA6   calm steel blue — buttons, links, user chat bubbles
Accent:         #C9965A   warm saffron gold — highlights, icons, decorative
Text:           #2C2C2C   near-black — primary body text
Muted:          #6B7280   gray — secondary text, placeholders
AI Bubble:      #EDE9E3   warm gray — AI message background
User Bubble:    #5B7FA6   primary blue — user message background (white text)
Border:         #E5E0D8   soft warm border
Error:          #D97B6C   muted red
Success:        #6BAD8A   muted green
```

---

## Typography

**Web:**
- Headings: `Fraunces` (Google Fonts) — serif, literary, warm
- Body: `DM Sans` (Google Fonts) — clean, friendly sans-serif

**Mobile:**
- Headings: `System` bold (SF Pro on iOS, Roboto on Android)
- Body: `System` regular

**Scale:**
```
xs:   12px
sm:   14px
base: 16px
lg:   18px
xl:   22px
2xl:  28px
3xl:  36px
4xl:  48px
```

---

## Spacing

Base unit: 4px
Common: 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96

---

## Border Radius

```
sm:   6px
md:   12px
lg:   20px
xl:   28px
full: 9999px
```

Chat bubbles: 20px (full on the corner away from avatar)

---

## Elevation / Shadows

```
card:   0 2px 12px rgba(0,0,0,0.06)
modal:  0 8px 32px rgba(0,0,0,0.12)
```

---

## Components

### Button (Primary)
- Background: #5B7FA6
- Text: white
- Padding: 14px 28px
- Border radius: full
- Font: DM Sans 500

### Button (Ghost)
- Background: transparent
- Border: 1.5px solid #5B7FA6
- Text: #5B7FA6

### Chat Input
- Background: #F4F1EB
- Border: 1.5px solid #E5E0D8
- Border radius: full
- Padding: 12px 20px

---

## Do's and Don'ts

✓ Use lots of whitespace — breathing room is the point
✓ Soft shadows, never harsh
✓ Warm tones, never cold grays
✗ No dark mode in Phase 1
✗ No animations that feel hyper or aggressive
✗ No stock photo of meditating people
