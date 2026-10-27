import { useEffect, useRef } from "react";

// A tiny dependency-free 3D renderer: a mesh is a list of nodes (atoms / vertices) and edges
// (bonds / wires). Each frame rotates the mesh, projects it with perspective and paints
// everything back-to-front so nearer parts overlap farther ones. Kept deliberately small so
// the site needs no three.js bundle.

// ─── Meshes ──────────────────────────────────────────────────────────────────────────
// Node `kind` maps to a palette colour; `r` is the sphere radius (0 = no sphere, wire only).

const ATOM_R = { C: 0.42, H: 0.24, S: 0.5, O: 0.38 };

function center(nodes, size) {
  const c = nodes.reduce((a, n) => [a[0] + n.x, a[1] + n.y, a[2] + n.z], [0, 0, 0]).map((v) => v / nodes.length);
  const max = Math.max(...nodes.map((n) => Math.hypot(n.x - c[0], n.y - c[1], n.z - c[2])));
  const k = size / max;
  return nodes.map((n) => ({ ...n, x: (n.x - c[0]) * k, y: (n.y - c[1]) * k, z: (n.z - c[2]) * k, r: n.r * k }));
}

// Linear alkylbenzene sulfonate: the workhorse surfactant behind many oilfield chemicals.
function surfactant() {
  const nodes = [];
  const edges = [];
  const add = (kind, x, y, z) => nodes.push({ kind, x, y, z, r: ATOM_R[kind] }) - 1;

  // benzene ring
  const ring = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    ring.push(add("C", 1.4 * Math.cos(a), 1.4 * Math.sin(a), 0));
  }
  ring.forEach((c, i) => edges.push([c, ring[(i + 1) % 6], i % 2 ? 1 : 2]));
  [1, 2, 4, 5].forEach((i) => {
    const a = (Math.PI / 3) * i;
    edges.push([ring[i], add("H", 2.45 * Math.cos(a), 2.45 * Math.sin(a), 0)]);
  });

  // sulfonate head on the para carbon
  const s = add("S", -3.15, 0, 0);
  edges.push([ring[3], s]);
  edges.push([s, add("O", -3.85, 1.2, 0), 2]);
  edges.push([s, add("O", -3.85, -0.6, 1.05), 2]);
  edges.push([s, add("O", -3.85, -0.6, -1.05)]);

  // alkyl tail, zig-zagging out of the ring plane
  let prev = ring[0];
  for (let i = 0; i < 6; i++) {
    const x = 2.9 + i * 1.27;
    const y = i % 2 ? 0.75 : -0.1;
    const z = Math.sin(i * 0.9) * 0.6;
    const c = add("C", x, y, z);
    edges.push([prev, c]);
    const hy = i % 2 ? 1.35 : -0.7;
    edges.push([c, add("H", x, hy, z + 0.9)]);
    edges.push([c, add("H", x, hy, z - 0.9)]);
    if (i === 5) edges.push([c, add("H", x + 1.05, y, z)]);
    prev = c;
  }
  // stand the molecule up on a steep diagonal so spinning about the vertical axis never
  // shows it end-on
  const t = (68 * Math.PI) / 180;
  const upright = nodes.map((n) => ({ ...n, x: n.x * Math.cos(t) - n.y * Math.sin(t), y: n.x * Math.sin(t) + n.y * Math.cos(t) }));
  return { nodes: center(upright, 1.08), edges, bond: 0.075 };
}

function benzene() {
  const nodes = [];
  const edges = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    nodes.push({ kind: "C", x: 1.4 * Math.cos(a), y: 1.4 * Math.sin(a), z: 0, r: ATOM_R.C });
  }
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    nodes.push({ kind: "H", x: 2.5 * Math.cos(a), y: 2.5 * Math.sin(a), z: 0, r: ATOM_R.H });
    edges.push([i, (i + 1) % 6, i % 2 ? 1 : 2], [i, i + 6]);
  }
  return { nodes: center(nodes, 1), edges, bond: 0.075 };
}

// Spur gear: tooth profile on two faces, joined across the face width, plus a bore.
function gear() {
  const nodes = [];
  const edges = [];
  const teeth = 12;
  const profile = [];
  for (let t = 0; t < teeth; t++) {
    const base = (t / teeth) * Math.PI * 2;
    const step = (Math.PI * 2) / teeth;
    [[0, 0.78], [0.18, 1], [0.5, 1], [0.68, 0.78]].forEach(([f, r]) => profile.push([base + f * step, r]));
  }
  const faces = [-0.16, 0.16];
  const start = faces.map((z) => {
    const s = nodes.length;
    profile.forEach(([a, r]) => nodes.push({ kind: "W", x: r * Math.cos(a), y: r * Math.sin(a), z, r: 0 }));
    for (let i = 0; i < profile.length; i++) edges.push([s + i, s + ((i + 1) % profile.length)]);
    return s;
  });
  for (let i = 0; i < profile.length; i += 2) edges.push([start[0] + i, start[1] + i]);
  const bore = 16;
  const bStart = faces.map((z) => {
    const s = nodes.length;
    for (let i = 0; i < bore; i++) {
      const a = (i / bore) * Math.PI * 2;
      nodes.push({ kind: "W", x: 0.3 * Math.cos(a), y: 0.3 * Math.sin(a), z, r: 0 });
    }
    for (let i = 0; i < bore; i++) edges.push([s + i, s + ((i + 1) % bore)]);
    return s;
  });
  for (let i = 0; i < bore; i += 2) edges.push([bStart[0] + i, bStart[1] + i]);
  // spokes on the front face
  for (let i = 0; i < 4; i++) edges.push([bStart[1] + i * 4, start[1] + i * 12]);
  return { nodes: center(nodes, 1), edges, bond: 0 };
}

// Icosahedron: a node graph, standing in for distributed systems / APIs.
function network() {
  const p = (1 + Math.sqrt(5)) / 2;
  const v = [
    [-1, p, 0], [1, p, 0], [-1, -p, 0], [1, -p, 0],
    [0, -1, p], [0, 1, p], [0, -1, -p], [0, 1, -p],
    [p, 0, -1], [p, 0, 1], [-p, 0, -1], [-p, 0, 1],
  ];
  const nodes = v.map(([x, y, z], i) => ({ kind: i % 3 === 0 ? "S" : "N", x, y, z, r: 0.2 }));
  const edges = [];
  for (let i = 0; i < 12; i++)
    for (let j = i + 1; j < 12; j++) {
      const d = Math.hypot(v[i][0] - v[j][0], v[i][1] - v[j][1], v[i][2] - v[j][2]);
      if (Math.abs(d - 2) < 0.01) edges.push([i, j]);
    }
  return { nodes: center(nodes, 1), edges, bond: 0 };
}

const MESHES = { surfactant, benzene, gear, network };

// ─── Palette ─────────────────────────────────────────────────────────────────────────

function palette(dark) {
  return dark
    ? { C: "#8a8178", H: "#efe6d6", S: "#d9b25e", O: "#d0683f", N: "#c9a55a", W: "#c9a55a", bond: "#6d655c" }
    : { C: "#3a332c", H: "#fffaf1", S: "#b8892f", O: "#c0532c", N: "#9b7640", W: "#7a5c2e", bond: "#8f8578" };
}

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const f = (c) => Math.max(0, Math.min(255, Math.round(c + amt * 255)));
  return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`;
}

// ─── Component ───────────────────────────────────────────────────────────────────────

export default function Scene3D({ mesh = "surfactant", speed = 0.25, tilt = 0.35, interactive = false, className = "", label }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { nodes, edges, bond } = MESHES[mesh]();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let angle = 0.6;
    let last = performance.now();
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const pal = palette(document.documentElement.classList.contains("dark"));
      ctx.clearRect(0, 0, w, h);
      const scale = Math.min(w, h) * 0.42;
      const cam = 3.2;
      const ay = angle + pointer.x * 0.6;
      const ax = tilt + pointer.y * 0.4;
      const [sy, cy, sx, cx] = [Math.sin(ay), Math.cos(ay), Math.sin(ax), Math.cos(ax)];

      const pts = nodes.map((n) => {
        const x1 = n.x * cy + n.z * sy;
        const z1 = -n.x * sy + n.z * cy;
        const y2 = n.y * cx - z1 * sx;
        const z2 = n.y * sx + z1 * cx;
        const p = cam / (cam + z2);
        return { x: w / 2 + x1 * scale * p, y: h / 2 + y2 * scale * p, z: z2, p };
      });

      // painter's algorithm over atoms and bonds together
      const items = [];
      edges.forEach(([a, b, order]) => items.push({ z: (pts[a].z + pts[b].z) / 2, a, b, order: order || 1 }));
      nodes.forEach((n, i) => n.r > 0 && items.push({ z: pts[i].z, i }));
      items.sort((m, n) => n.z - m.z);

      for (const it of items) {
        const depth = Math.max(0.25, Math.min(1, 0.75 - it.z * 0.6));
        if (it.i === undefined) {
          const A = pts[it.a];
          const B = pts[it.b];
          ctx.globalAlpha = depth;
          ctx.lineCap = "round";
          if (bond) {
            ctx.strokeStyle = pal.bond;
            ctx.lineWidth = Math.max(1, bond * scale * A.p);
            const dx = B.y - A.y;
            const dy = A.x - B.x;
            const len = Math.hypot(dx, dy) || 1;
            const off = it.order === 2 ? ctx.lineWidth * 0.9 : 0;
            const strokes = it.order === 2 ? [-1, 1] : [0];
            strokes.forEach((s) => {
              ctx.beginPath();
              ctx.moveTo(A.x + (dx / len) * off * s, A.y + (dy / len) * off * s);
              ctx.lineTo(B.x + (dx / len) * off * s, B.y + (dy / len) * off * s);
              ctx.stroke();
            });
          } else {
            ctx.strokeStyle = pal.W;
            ctx.lineWidth = 1.25;
            ctx.beginPath();
            ctx.moveTo(A.x, A.y);
            ctx.lineTo(B.x, B.y);
            ctx.stroke();
          }
        } else {
          const n = nodes[it.i];
          const P = pts[it.i];
          const r = n.r * scale * P.p;
          const base = pal[n.kind];
          const g = ctx.createRadialGradient(P.x - r * 0.35, P.y - r * 0.4, r * 0.1, P.x, P.y, r);
          g.addColorStop(0, shade(base, 0.25));
          g.addColorStop(0.55, base);
          g.addColorStop(1, shade(base, -0.28));
          ctx.globalAlpha = Math.min(1, depth + 0.25);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(P.x, P.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      angle += dt * speed;
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      draw();
      if (visible) raf = requestAnimationFrame(tick);
    };

    const onPointer = (e) => {
      const r = canvas.getBoundingClientRect();
      pointer.tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
      pointer.ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
    };

    resize();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);

    // redraw once when the theme flips so a paused (reduced-motion) scene still recolours
    const mo = new MutationObserver(draw);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    let io;
    if (!reduce) {
      io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) {
          last = performance.now();
          raf = requestAnimationFrame(tick);
        }
      });
      io.observe(canvas);
      if (interactive) window.addEventListener("pointermove", onPointer, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      io?.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, [mesh, speed, tilt, interactive]);

  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} role="img" aria-label={label || `${mesh} 3D model`} />;
}
