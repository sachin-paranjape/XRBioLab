# Vibe Coded XR Biology Lab

A Virtual Reality Biology Lab built using **Gemini XR Blocks** and **Three.js**, demonstrating prompt-driven XR development and procedural spatial design.

This project explores how AI-assisted workflows can accelerate XR prototyping while reducing traditional complexity from game engines and asset pipelines.

---

## Project Overview

This experiment demonstrates how a complete XR learning environment can be generated from a single structured prompt using Gemini.

The lab allows users to:

- Walk around a virtual biology laboratory in VR
- Interact with DNA and cell structures
- Explore human organs
- Trigger contextual learning tooltips
- Hear educational explanations using text-to-speech
- Navigate using VR teleportation
- Experience a fully procedural 3D environment

---

## Demo Video

Watch the XR Biology Lab in action:

https://youtube.com/shorts/hLqXIe8XTCc?si=dADIT-BOIddpYLZy

This demo shows:
- VR navigation
- Procedural biology models
- Interaction tooltips

---

## Features

- WebXR VR navigation
- Procedural 3D model generation
- Interactive learning hotspots
- Tooltip information panels
- Native text-to-speech integration
- Realistic lighting and shadows
- Modern lab environment design
- No external asset dependencies
- Single file architecture

---

## Technologies Used

- Three.js
- WebXR API
- JavaScript
- Gemini XR Blocks
- Procedural Geometry
- Browser Text-to-Speech API

---

## Architecture Approach

The project uses a **single HTML architecture** where:

- Geometry is procedurally generated
- Materials are dynamically created
- Interaction is raycast driven
- Navigation uses XR teleportation logic
- UI is rendered as 3D overlays
- Audio uses native browser speech synthesis

This avoids:

- Asset loading failures
- Broken fetch paths
- Dependency conflicts
- Build tooling overhead

---
## Challenges Encountered

Some interesting challenges during development included:

- Balancing lighting realism with performance in a procedural scene
- Making tooltips readable inside VR space
- Designing interaction targets large enough for XR selection
- Structuring procedural models to remain recognizable
- Keeping everything inside a single file without modular imports

These challenges helped shape the final architecture decisions.
---

## The Prompt That Built This Project

This project was generated from the following structured XR prompt:

The full prompt used for this project is available in [docs/prompt.md](docs/prompt.md).
This prompt was designed to explore prompt-driven XR development using procedural generation, browser-native interaction, and educational spatial design.
---

## Screenshots

### XR Lab Environment

![XR Lab] <img width="2559" height="1510" alt="Gemini_Generated_Image_jydtv1jydtv1jydt" src="https://github.com/user-attachments/assets/6038a4ac-e373-4f13-8e9b-8316e2a85666" />


### DNA Model Interaction

![DNA] <img width="2559" height="1421" alt="Gemini_Generated_Image_12m5or12m5or12m5" src="https://github.com/user-attachments/assets/fb716440-6ae9-4015-98e8-27d29c97c3d4" />


### Tooltip System

![Tooltip] <img width="2515" height="1430" alt="Gemini_Generated_Image_qop3lpqop3lpqop3" src="https://github.com/user-attachments/assets/1ff5c040-6dd8-484f-9964-fb690bb7fa88" />

---

## How to Run

1 Download repository
2 Open index.html
3 Use a WebXR compatible browser
4 Enter VR mode

Recommended:

Chrome  
Edge  
Meta Quest Browser  

---

## Learning Goals

This project explores:

- Prompt-driven XR development
- AI-assisted spatial workflows
- Lightweight XR architecture
- Procedural modeling strategies
- Educational XR interaction design

---

## Key Lessons

Some important observations from this experiment:

- AI can dramatically reduce XR prototyping time
- Procedural generation improves reliability for browser XR apps
- Interaction design matters more than visual complexity
- Lightweight XR experiences are possible without game engines
- Prompt structure affects spatial design outcomes

This project reinforced the idea that XR development may shift toward prompt-driven workflows.

---

## Future Improvements

Potential upgrades include:

- Multi-user XR sessions
- Gesture interaction
- Hand tracking
- Physics simulation
- More biology models
- Android XR optimization
- Material 3 spatial UI refinements

---

## Why This Project Exists

XR development traditionally requires heavy tooling and long iteration cycles.

This project explores a different question:

**Can XR experiences be rapidly prototyped using AI and web technologies instead of game engines?**

---

## Author

Awodi Abdulmujeeb A.

XR Developer | Android XR Explorer | AI Spatial Computing

GitHub:
https://github.com/Platinum04

LinkedIn:
https://www.linkedin.com/in/awodi/

---

## License

MIT License
