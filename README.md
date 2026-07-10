# XR Biology Lab

An interactive, immersive Virtual Reality Biology Lab built using **Three.js** and the **WebXR API**. This project demonstrates modular ES6 spatial development, background loading of high-definition GLB models, browser-native text-to-speech narration, and custom VR controller gestures.

---

## Project Overview

The XR Biology Lab provides an immersive educational environment where users can study biological structures and systems in full 3D. 

The lab is split into three main learning zones:
1. **Genetics & Cell Core**: Nucleus, Chromosome, DNA Double Helix, and Base Pairs.
2. **Cellular Organelles**: Mitochondria, Ribosomes, Endoplasmic Reticulum, and Golgi Apparatus.
3. **Human Anatomy & Systems**: Heart, Brain, Lungs, and Bones.

---

## Demo Video

Watch the XR Biology Lab in action:


[XR Biology Lab YouTube Demo](https://youtube.com/shorts/hLqXIe8XTCc?si=dADIT-BOIddpYLZy)

This demo showcases VR navigation, model interactions, and the interactive lab environment.

---

## Current Features & Functionality

### 1. Hybrid Graphics & HD Model Loading
* **Procedural Fallbacks**: To ensure instant page loads, the scene immediately renders recognizable, lightweight procedural shapes for all hotspots.
* **Lazy-Loaded HD Models**: Once the scene is loaded, high-definition GLB models (`mitochondria.glb`, `ribosome.glb`, `er.glb`, `golgi.glb`, `heart.glb`, `brain.glb`, `lungs.glb`, `bone.glb`) load in the background and seamlessly swap in.
* **Loading Toast**: A clean, progress-tracked toast bar at the bottom of the screen displays HD model loading status to desktop users.

### 2. Immersive Interactions
* **Raycast Targeting**: Pointer rays extend from VR controllers and turn teal when hovering over an interactive hotspot sphere.
* **Smartboard UI & Info Panels**: Selecting a model updates the laboratory's central Smartboard screen and displays a floating, color-coded 3D info panel next to the model.
* **Native Text-to-Speech Guide**: The browser's native `SpeechSynthesis` API speaks the details of the selected biological structure. Deselecting immediately stops the narration.
* **Grip & Inspect (Grab/Clone)**: Pressing and holding the Grip/Squeeze button on a VR controller clones the targeted structure and anchors it 0.6m in front of the controller, allowing for close, physical rotation and inspection.
* **Comfort Locomotion**: Joystick-based VR walking and turning with built-in collision bounds to prevent walking through tables or passing outside the laboratory walls.

### 3. Comprehensive Manuals
* **Desktop Manual Overlay**: A beautiful overlay guide toggled via the floating "CONTROLS MANUAL" button or by pressing the `A` key.
* **VR 3D Manual Screen**: A camera-attached floating panel displaying VR guidelines and controller maps, toggled in VR by pressing the `A` or `X` buttons.

---

## Technical Architecture

The application is structured as a **modular ES6 project**, avoiding heavy build pipelines or build tooling:

* [index.html](file:///d:/WebXR/vibe-coded-xr-biology-lab-main/index.html) - Structural markup, CSS styling for the loading overlay and manual modal, and application entry point.
* [js/app.js](file:///d:/WebXR/vibe-coded-xr-biology-lab-main/js/app.js) - Initializes WebGL and WebXR, binds desktop events, and manages the animation loop.
* [js/state.js](file:///d:/WebXR/vibe-coded-xr-biology-lab-main/js/state.js) - Centralized state container tracking camera, scene, controls, manual status, and VR controller values.
* [js/data.js](file:///d:/WebXR/vibe-coded-xr-biology-lab-main/js/data.js) - Contains positions, colors, titles, descriptions, and model paths for the 12 biology hotspots.
* [js/environment.js](file:///d:/WebXR/vibe-coded-xr-biology-lab-main/js/environment.js) - Sets up realistic lighting, floor grids, and procedural lab furniture.
* [js/textures.js](file:///d:/WebXR/vibe-coded-xr-biology-lab-main/js/textures.js) - Dynamically generates canvas-based textures for the lab environment.
* [js/models.js](file:///d:/WebXR/vibe-coded-xr-biology-lab-main/js/models.js) - Assembles fallback procedural geometry and loads/injects GLB files.
* [js/ui.js](file:///d:/WebXR/vibe-coded-xr-biology-lab-main/js/ui.js) - Computes and renders 2D canvas textures onto 3D panels (Smartboard, Info Panels, and VR Manual).
* [js/interaction.js](file:///d:/WebXR/vibe-coded-xr-biology-lab-main/js/interaction.js) - Handles raycasting, mouse pointer clicks, Web Speech synthesis, and VR controller input handlers.

---

## How to Run & Test

Because the project relies on native ES6 modules, it must be run via an HTTP/HTTPS server.

### 1. Launch a Local Web Server
Expose the project directory locally using Node or Python:

* **Using Node.js**:
  ```bash
  npx http-server -p 8000
  ```
* **Using Python**:
  ```bash
  python -m http.server 8000
  ```

### 2. Test in VR (Requires HTTPS / Secure Context)
Exposing the project to a VR headset requires HTTPS. A helper script is included to run the server over a secure Tunnelmole connection:

```bash
node --dns-result-order=ipv4first run_tunnel_spawn.js
```
This spawns Tunnelmole, forces IPv4 resolution to prevent local OS DNS lookup hangs, and writes the public HTTPS address to [tunnel_url.txt](file:///d:/WebXR/vibe-coded-xr-biology-lab-main/tunnel_url.txt). Open this URL on your WebXR headset (e.g. Meta Quest Browser) and select **Enter VR**.

---

## User Control Mapping

### Desktop & Mobile Controls
* **Look Around**: Left-click and drag (or swipe).
* **Move & Pan**: Right-click and drag (or keyboard arrow keys).
* **Inspect Hotspot**: Click/tap any glowing hotspot sphere.
* **Deselect Hotspot**: Click the floor or empty background space.
* **Toggle Manual**: Press the **'A'** key or click **CONTROLS MANUAL** at the top-right.

### Immersive VR Controls
* **Movement (Walk)**: Push the **Right Joystick** forward/backward/left/right.
* **Turn / Height**: Use the **Left Joystick** to steer left/right or adjust pitch height.
* **Select Hotspot**: Point controller ray at a hotspot sphere and pull the **Trigger**.
* **Grab & Inspect (Clone)**: Hold the **Grip/Squeeze** button when pointing at a model to anchor a replica in front of your controller. Release the Grip button to dismiss it.
* **Quick Deselect**: Press the **B** or **Y** button on either controller to clear selections.
* **Toggle Manual**: Press the **A** or **X** button on either controller to show/hide the VR Manual.

---

## Future Roadmap & Potential Upgrades
* Multi-user shared VR chemistry/biology lab sessions.
* Hand tracking gestures to replace controller raycasting.
* Real-time physics simulation for cell collisions.
* Dual-controller pinch zoom mechanics to scale grabbed models.

---

## Author
**Awodi Abdulmujeeb A.**
* GitHub: [Platinum04](https://github.com/Platinum04)
* LinkedIn: [Awodi Abdulmujeeb A.](https://www.linkedin.com/in/awodi/)

---

## License
This project is licensed under the MIT License. See [LICENSE](file:///d:/WebXR/vibe-coded-xr-biology-lab-main/LICENSE) for details.
