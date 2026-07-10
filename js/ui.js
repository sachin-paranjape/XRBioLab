import * as THREE from 'three';
import { state } from './state.js';

export function setupInfoPanel() {
  const geo = new THREE.PlaneGeometry(9.9, 4.4);
  const mat = new THREE.MeshBasicMaterial({ transparent: true, side: THREE.DoubleSide });
  state.infoPanelMesh = new THREE.Mesh(geo, mat);
  state.infoPanelMesh.visible = false;
  state.infoPanelMesh.position.set(0, 3.5, -14.7);
  state.scene.add(state.infoPanelMesh);
}

export function updateSmartboard(data) {
  if (!state.smartboardMesh) {
    console.warn("state.smartboardMesh is undefined!");
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 2048, 1024);

  if (!data) {
    // Draw grid
    ctx.strokeStyle = 'rgba(78, 205, 196, 0.15)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 2048; i += 64) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 1024); ctx.stroke();
    }
    for (let j = 0; j < 1024; j += 64) {
      ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(2048, j); ctx.stroke();
    }

    ctx.fillStyle = '#4ecdc4';
    ctx.font = 'bold 100px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('XR BIOLOGY LAB', 1024, 450);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '40px sans-serif';
    ctx.fillText('Select a biological model to inspect details', 1024, 580);
  } else {
    // Just the background grid, slightly dimmed
    ctx.strokeStyle = 'rgba(78, 205, 196, 0.08)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 2048; i += 64) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 1024); ctx.stroke();
    }
    for (let j = 0; j < 1024; j += 64) {
      ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(2048, j); ctx.stroke();
    }
  }

  // Dispose old texture to prevent memory leaks
  if (state.smartboardMesh.material.map) {
    state.smartboardMesh.material.map.dispose();
  }

  // Force texture update
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  // Update the mesh material directly
  state.smartboardMesh.material.map = texture;
  state.smartboardMesh.material.needsUpdate = true;

  console.log("Smartboard texture updated for:", data ? data.title : "Welcome");
}

export function updateInfoPanel(data) {
  if (!state.infoPanelMesh) return;

  if (!data) {
    state.infoPanelMesh.visible = false;
    updateSmartboard(null);
    return;
  }

  state.infoPanelMesh.visible = true;
  updateSmartboard(data); // Puts smartboard in dimmed grid state

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 921; // 2048 * (3.4 / 7.5) aspect ratio (approx 16:7)
  const ctx = canvas.getContext('2d');

  // Transparent center, solid slate background panel
  ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(0, 0, 2048, 921, 48);
    ctx.fill();
    // Colored border matching organ's theme
    ctx.strokeStyle = '#' + data.color.toString(16).padStart(6, '0');
    ctx.lineWidth = 16;
    ctx.stroke();
  } else {
    ctx.fillRect(0, 0, 2048, 921);
  }

  // Draw Title
  ctx.fillStyle = '#' + data.color.toString(16).padStart(6, '0');
  ctx.font = 'bold 96px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(data.title, 1024, 180);

  // Draw Description with wrapping
  ctx.fillStyle = '#f1f5f9';
  ctx.font = '54px sans-serif';
  const words = data.desc.split(' ');
  let line = '';
  const lines = [];
  const maxWidth = 1800;

  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let metrics = ctx.measureText(testLine);
    let testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  let y = 360;
  lines.forEach((l) => {
    ctx.fillText(l.trim(), 1024, y);
    y += 80;
  });

  // Dispose of old texture
  if (state.infoPanelMesh.material.map) {
    state.infoPanelMesh.material.map.dispose();
  }

  // Update texture
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  state.infoPanelMesh.material.map = texture;
  state.infoPanelMesh.material.needsUpdate = true;
}

export function setupVRManual() {
  const geo = new THREE.PlaneGeometry(1.5, 1.125); // 4:3 aspect ratio
  const mat = new THREE.MeshBasicMaterial({ transparent: true, side: THREE.DoubleSide });
  state.vrManualMesh = new THREE.Mesh(geo, mat);
  state.vrManualMesh.visible = false;
  state.vrManualMesh.position.set(0, 0, -1.2);
  state.camera.add(state.vrManualMesh);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1536;
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(0, 0, 2048, 1536, 64);
    ctx.fill();
    ctx.strokeStyle = '#4ecdc4';
    ctx.lineWidth = 16;
    ctx.stroke();
  } else {
    ctx.fillRect(0, 0, 2048, 1536);
  }

  // Title
  ctx.fillStyle = '#4ecdc4';
  ctx.font = 'bold 84px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('LABORATORY MANUAL & CONTROLS', 1024, 160);

  // Divider line
  ctx.strokeStyle = 'rgba(78, 205, 196, 0.3)';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(100, 220);
  ctx.lineTo(1948, 220);
  ctx.stroke();

  // Column 1: VR Controls (Left)
  ctx.textAlign = 'left';
  ctx.fillStyle = '#a5f3fc';
  ctx.font = 'bold 52px sans-serif';
  ctx.fillText('VR CONTROLS', 150, 320);

  const vrControls = [
    { label: 'Movement:', desc: 'Right Thumbstick (push to walk)' },
    { label: 'Turn / Height:', desc: 'Left Thumbstick (steer)' },
    { label: 'Select Part:', desc: 'Point and Pull Trigger' },
    { label: 'Grab & Move Part:', desc: 'Hold Squeeze/Grip (moves with controller)' },
    { label: 'Rotate Part:', desc: 'Rotate Controller while gripping' },
    { label: 'Scale Part:', desc: 'Hold both Grips & move apart/together' },
    { label: 'Deselect Part:', desc: 'Press B or Y Button' },
    { label: 'Toggle Manual:', desc: 'Press A or X Button' },
  ];

  let y = 400;
  vrControls.forEach(ctrl => {
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 40px sans-serif';
    ctx.fillText('• ' + ctrl.label, 150, y);
    ctx.fillStyle = '#f8fafc';
    ctx.font = '40px sans-serif';
    const labelWidth = ctx.measureText('• ' + ctrl.label + ' ').width;
    ctx.fillText(ctrl.desc, 150 + labelWidth, y);
    y += 75;
  });

  // Column 2: Lab Guide & Rules (Right)
  ctx.fillStyle = '#a5f3fc';
  ctx.font = 'bold 52px sans-serif';
  ctx.fillText('VR LAB GUIDELINES', 1150, 320);

  const guide = [
    { label: 'Explore:', desc: 'Walk around the benches to inspect structures.' },
    { label: 'Select:', desc: 'Point ray at spheres and pull the Trigger.' },
    { label: 'Grab:', desc: 'Hold Squeeze/Grip button to inspect organs.' },
    { label: 'Reset:', desc: 'Press B/Y button to deselect the active model.' },
  ];

  y = 400;
  guide.forEach(ctrl => {
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 40px sans-serif';
    ctx.fillText('• ' + ctrl.label, 1150, y);
    ctx.fillStyle = '#f8fafc';
    ctx.font = '40px sans-serif';
    const labelWidth = ctx.measureText('• ' + ctrl.label + ' ').width;
    ctx.fillText(ctrl.desc, 1150 + labelWidth, y);
    y += 75;
  });

  // Lab Guide intro
  y += 20;
  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'bold 44px sans-serif';
  ctx.fillText('WELCOME TO THE LAB', 1150, y);
  y += 60;

  ctx.fillStyle = '#94a3b8';
  ctx.font = '36px sans-serif';
  const introLines = [
    'This immersive environment allows you to study',
    'biological structures in full 3D detail. Grab any',
    'organ to bring it close and examine it physically.',
    'Listen to the audio guide to learn about functions',
    'and cellular structures.',
  ];
  introLines.forEach(line => {
    ctx.fillText(line, 1150, y);
    y += 50;
  });

  // Bottom text
  ctx.fillStyle = '#4ecdc4';
  ctx.font = 'italic bold 44px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText("Press 'A' Button to dismiss/show this manual", 1024, 1420);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  state.vrManualMesh.material.map = texture;
  state.vrManualMesh.material.needsUpdate = true;
}
