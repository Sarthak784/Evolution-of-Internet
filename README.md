# 🌐 NetOdyssey — The Evolution of the Internet

> *From two letters on a wire to a world connected.*

---

## Overview

**NetOdyssey** is an immersive, scroll-driven web experience that traces the 60-year history of the internet — from ARPANET's first two-letter transmission in 1969 to the decentralized promise of Web3 and AI. Built as a single-page storytelling journey, it blends editorial narrative with interactive moments to make the history of the internet feel alive and personal.

---

## Concept

The core idea was to treat internet history as a **cinematic timeline** rather than a static article. Each era — the Cold War origins of ARPANET, the chaotic optimism of the dot-com boom, the rise of social media, the smartphone revolution, and the emerging Web3 frontier — gets its own visual identity and an interactive element. The user doesn't just *read* history; they scroll through it.

---

## Design Process

The design leans into a **dark, high-contrast aesthetic** inspired by terminal interfaces and deep-space exploration — fitting for a story about networks and signals. Typography mixes `Space Mono` for that retro-tech feel with `Playfair Display` for editorial weight and `Inter` for clean readability.

Each chapter is distinguished by a shifting background color and era-specific background animations — node graphs for ARPANET, pixelated windows for the dot-com era, glowing grids for Web3. A persistent dot-navigation bar lets users jump across eras, while a custom cursor and scroll-progress indicator reinforce the sense of deliberate forward motion.

Interactive elements were designed to deepen engagement without interrupting the narrative flow. Instead of static text, users get their hands dirty with the history through:
* A functional ARPANET terminal simulator and a canvas-based packet delivery physics game.
* A NASDAQ dot-com timeline slider that visualizes the boom and crash.
* A mobile app showcase and a fully playable classic canvas Snake game.
* A Web 1.0 / 2.0 / 3.0 comparison toggle and an interactive human hash chain that lets users mine blocks and actively tamper with data to see how blockchains break.

The result is a piece that works equally as an educational tool, a design portfolio piece, or simply a compelling interactive read.

---

## Tech Stack

- **HTML5 / CSS3 / Vanilla JS**
- **GSAP + ScrollTrigger** — scroll-based animations and transitions
- **Google Fonts** — Space Mono, Playfair Display, Inter

---

## Structure

```text
index.html   → Markup & content for all 7 sections
style.css    → Visual design system, animations, responsive layout
script.js    → Interactivity, scroll logic, terminal simulator, canvas games, counters
