# LinkAI QBR Hero

A premium hero section with an organic WebGL blob, inspired by [Off+Brand](https://www.itsoffbrand.com/).

## Setup

### 1. Add your logo

Place the LinkAI logo image at:

```
public/linkai-logo.png
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Structure

```
├── app/
│   ├── globals.css      # Noise overlay, vignette, base styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Renders Hero
├── components/
│   ├── Hero.tsx         # Main hero component with animations
│   └── BlobBackground.tsx # WebGL metaball blob shader
└── public/
    └── linkai-logo.png  # Your logo here
```

## Features

- **WebGL Blob**: Organic metaball shader with cursor reactivity
- **Smooth Animations**: Framer Motion entrance sequences
- **Noise + Vignette**: CSS-only atmospheric effects
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Performance**: Capped DPR, optimized shader

## Design

- Background: Near-black `#050506`
- Blob: Muted orange-to-blue gradient, soft and organic
- Typography: Inter, light weights
- Motion: Slow, premium, never jittery

---

*GoodLeap LinkAI · Internal QBR*
