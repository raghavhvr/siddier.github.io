/* ═══════════════════════════════════════════════
   SCENE — Three.js Universe, Stars, Nebula, Orb
═══════════════════════════════════════════════ */

const Scene = (() => {

  let renderer, camera, scene;
  let stars, nebulaParticles;
  let planets = [];
  let mouseX = 0, mouseY = 0;
  let scrollProgress = 0;
  let time = 0;
  let initiated = false;

  // ── Boot ──────────────────────────────────────
  function init() {
    const canvas = document.getElementById('space-canvas');
    if (!canvas || initiated) return;
    initiated = true;

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x01020a, 1);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1, 3000
    );
    camera.position.set(0, 0, 700);

    _buildStarField();
    _buildNebula();
    _buildPlanets();
    _buildLights();

    window.addEventListener('resize', _onResize);
    document.addEventListener('mousemove', _onMouse);

    _tick();
  }

  // ── Star Field ────────────────────────────────
  function _buildStarField() {
    const layers = [
      { count: 3000, spread: 2800, size: 1.0, color: 0xeef0f8, opacity: 0.8 },
      { count: 1200, spread: 2000, size: 1.8, color: 0xd4a843, opacity: 0.35 },
      { count: 500,  spread: 1600, size: 2.8, color: 0x38c8e8, opacity: 0.2  },
    ];

    layers.forEach(layer => {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(layer.count * 3);
      for (let i = 0; i < layer.count * 3; i++) {
        pos[i] = (Math.random() - 0.5) * layer.spread;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        color:       layer.color,
        size:        layer.size,
        transparent: true,
        opacity:     layer.opacity,
        sizeAttenuation: true,
      });
      scene.add(new THREE.Points(geo, mat));
    });
  }

  // ── Nebula Cloud ──────────────────────────────
  function _buildNebula() {
    const count = 1200;
    const geo   = new THREE.BufferGeometry();
    const pos   = new Float32Array(count * 3);
    const col   = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle  = Math.random() * Math.PI * 2;
      const radius = 280 + Math.random() * 500;
      const height = (Math.random() - 0.5) * 350;
      const depth  = -200 - Math.random() * 600;

      pos[i*3]     = Math.cos(angle) * radius * (0.4 + Math.random() * 0.6);
      pos[i*3 + 1] = height;
      pos[i*3 + 2] = Math.sin(angle) * radius * 0.35 + depth;

      // Blue-teal-gold gradient
      const t = Math.random();
      const u = Math.random();
      col[i*3]     = t * 0.82 + u * 0.21;
      col[i*3 + 1] = t * 0.78 + u * 0.49;
      col[i*3 + 2] = t * 0.90 + u * 0.27;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));

    nebulaParticles = new THREE.Points(geo, new THREE.PointsMaterial({
      size:            5,
      transparent:     true,
      opacity:         0.14,
      vertexColors:    true,
      sizeAttenuation: true,
    }));
    scene.add(nebulaParticles);
  }

  // ── Chapter Planets ───────────────────────────
  function _buildPlanets() {
    const defs = [
      { z: -100, y:   60, x: -180, r: 28, color: 0x3b82f6, ring: false },  // ch1 Earth
      { z: -400, y:  -40, x:  220, r: 20, color: 0xf97316, ring: false },  // ch2 Mars
      { z: -800, y:   30, x: -160, r: 44, color: 0x8b5cf6, ring: true  },  // ch3 Jupiter
      { z:-1200, y:  -50, x:  200, r: 36, color: 0x10b981, ring: true  },  // ch4 Neptune
      { z:-1600, y:   20, x:    0, r: 52, color: 0xd4a843, ring: false },  // ch5 Gold Star
    ];

    defs.forEach((def, i) => {
      const group = new THREE.Group();
      group.position.set(def.x, def.y, def.z);

      // Core sphere
      const geo = new THREE.SphereGeometry(def.r, 32, 32);
      const mat = new THREE.MeshPhongMaterial({
        color:     def.color,
        emissive:  def.color,
        emissiveIntensity: 0.15,
        shininess: 40,
        transparent: true,
        opacity: 0.85,
      });
      const mesh = new THREE.Mesh(geo, mat);
      group.add(mesh);

      // Atmosphere glow
      const atmoGeo = new THREE.SphereGeometry(def.r * 1.18, 32, 32);
      const atmoMat = new THREE.MeshBasicMaterial({
        color:       def.color,
        transparent: true,
        opacity:     0.06,
        side:        THREE.BackSide,
      });
      group.add(new THREE.Mesh(atmoGeo, atmoMat));

      // Ring (for some planets)
      if (def.ring) {
        const ringGeo = new THREE.TorusGeometry(def.r * 1.7, 1.5, 4, 80);
        const ringMat = new THREE.MeshBasicMaterial({
          color:       def.color,
          transparent: true,
          opacity:     0.3,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI * 0.38;
        group.add(ring);
      }

      scene.add(group);
      planets.push({ group, mesh, def, index: i });
    });
  }

  // ── Orb (About section) ───────────────────────
  let orbScene, orbRenderer, orbCamera, orbMesh, orbWire, orbRing, orbOrigPos, orbTime = 0;

  function initOrb() {
    const canvas = document.getElementById('orb-canvas');
    if (!canvas) return;

    orbRenderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    orbRenderer.setClearColor(0x000000, 0);

    orbScene  = new THREE.Scene();
    orbCamera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    orbCamera.position.z = 3.8;

    function resizeOrb() {
      const w = canvas.parentElement?.clientWidth  || 400;
      const h = canvas.parentElement?.clientHeight || 400;
      orbRenderer.setSize(w, h);
      orbRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      orbCamera.aspect = w / h;
      orbCamera.updateProjectionMatrix();
    }
    resizeOrb();
    window.addEventListener('resize', resizeOrb);

    // Core animated sphere
    const geo = new THREE.IcosahedronGeometry(1.3, 6);
    orbOrigPos = geo.attributes.position.array.slice();
    orbMesh = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({
      color:     0x071030,
      emissive:  0x050f28,
      specular:  0x38c8e8,
      shininess: 90,
      transparent: true,
      opacity: 0.88,
    }));
    orbScene.add(orbMesh);

    // Wireframe shell
    orbWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.35, 2),
      new THREE.MeshBasicMaterial({ color: 0x38c8e8, wireframe: true, transparent: true, opacity: 0.1 })
    );
    orbScene.add(orbWire);

    // Gold equatorial ring
    orbRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.7, 0.012, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0xd4a843, transparent: true, opacity: 0.55 })
    );
    orbRing.rotation.x = Math.PI * 0.4;
    orbScene.add(orbRing);

    // Second ring (perpendicular)
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.55, 0.007, 8, 100),
      new THREE.MeshBasicMaterial({ color: 0x38c8e8, transparent: true, opacity: 0.2 })
    );
    ring2.rotation.x = Math.PI * 0.5;
    ring2.rotation.z = Math.PI * 0.25;
    orbScene.add(ring2);

    // Lights
    orbScene.add(new THREE.AmbientLight(0x0a1628, 2.5));
    const p1 = new THREE.PointLight(0x38c8e8, 3.5, 12); p1.position.set(4, 3, 4); orbScene.add(p1);
    const p2 = new THREE.PointLight(0xd4a843, 2.0, 12); p2.position.set(-4,-2, 3); orbScene.add(p2);

    _orbTick();
  }

  function _orbTick() {
    requestAnimationFrame(_orbTick);
    orbTime += 0.009;
    const pos = orbMesh.geometry.attributes.position.array;
    for (let i = 0; i < pos.length; i += 3) {
      const ox = orbOrigPos[i], oy = orbOrigPos[i+1], oz = orbOrigPos[i+2];
      const len = Math.sqrt(ox*ox + oy*oy + oz*oz);
      const n = Math.sin(ox*2.8 + orbTime) *
                Math.cos(oy*2.8 + orbTime*0.75) *
                Math.sin(oz*2.2 + orbTime*1.4) * 0.14;
      const s = (1.3 + n) / len;
      pos[i] = ox*s; pos[i+1] = oy*s; pos[i+2] = oz*s;
    }
    orbMesh.geometry.attributes.position.needsUpdate = true;
    orbMesh.geometry.computeVertexNormals();
    orbMesh.rotation.y += 0.005;
    orbMesh.rotation.x += 0.001;
    orbRing.rotation.z += 0.004;
    orbRenderer.render(orbScene, orbCamera);
  }

  // ── Lights ────────────────────────────────────
  function _buildLights() {
    scene.add(new THREE.AmbientLight(0x04071a, 3));
    const sun = new THREE.PointLight(0x38c8e8, 2, 1200);
    sun.position.set(0, 200, 400);
    scene.add(sun);
    const fill = new THREE.PointLight(0xd4a843, 1, 800);
    fill.position.set(-300, -100, 200);
    scene.add(fill);
  }

  // ── Scroll ────────────────────────────────────
  function setScrollProgress(t) {
    scrollProgress = t;
  }

  // ── Render Loop ───────────────────────────────
  function _tick() {
    requestAnimationFrame(_tick);
    time += 0.0003;

    // Camera parallax from mouse
    camera.position.x += (mouseX * 60 - camera.position.x) * 0.04;
    camera.position.y += (-mouseY * 30 - camera.position.y) * 0.04;

    // Camera Z flies deeper as user scrolls
    const targetZ = 700 - scrollProgress * 2200;
    camera.position.z += (targetZ - camera.position.z) * 0.06;

    // Nebula slow rotation
    if (nebulaParticles) {
      nebulaParticles.rotation.y = time * 0.4;
    }

    // Planet animation
    planets.forEach((p, i) => {
      p.group.rotation.y += 0.002 + i * 0.0005;
      // Fade in/out based on camera proximity
      const dist = Math.abs(camera.position.z - p.def.z);
      const fade = Math.max(0, 1 - dist / 600);
      p.mesh.material.opacity = 0.2 + fade * 0.65;
    });

    renderer.render(scene, camera);
  }

  // ── Events ────────────────────────────────────
  function _onMouse(e) {
    mouseX = (e.clientX / window.innerWidth  - 0.5);
    mouseY = (e.clientY / window.innerHeight - 0.5);
  }

  function _onResize() {
    const w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  return { init, initOrb, setScrollProgress };

})();

window.Scene = Scene;
