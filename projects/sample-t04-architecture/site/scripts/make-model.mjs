// Generates public/models/building.glb (self-made, no external assets). Run: node scripts/make-model.mjs
import fs from "node:fs";

// name, material (0 concrete / 1 dark), size [w,h,d], base-center position [x,y,z]
const parts = [
  ["base",    0, [8.0, 0.15, 6.0], [0, -0.15, 0]],
  ["level-0", 0, [6.0, 1.2, 4.4],  [0, 0, 0]],
  ["level-1", 1, [4.8, 1.2, 3.6],  [-0.4, 1.2, 0]],
  ["level-2", 0, [3.8, 1.2, 3.0],  [-0.6, 2.4, 0]],
  ["level-3", 1, [2.8, 1.0, 2.4],  [-0.8, 3.6, 0]],
  ["roof",    0, [3.4, 0.18, 2.9], [-0.8, 4.6, 0]],
];

const chunks = []; const bufferViews = []; const accessors = []; const meshes = []; const nodes = [];
let offset = 0;
const push = (buf, target) => { bufferViews.push({ buffer: 0, byteOffset: offset, byteLength: buf.byteLength, target }); chunks.push(Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength)); offset += buf.byteLength; return bufferViews.length - 1; };

const faces = [ // normal, 4 corners (unit cube 0..1 in y, -.5..+.5 in x/z)
  [[0,0,1],  [[-.5,0,.5],[.5,0,.5],[.5,1,.5],[-.5,1,.5]]],
  [[0,0,-1], [[.5,0,-.5],[-.5,0,-.5],[-.5,1,-.5],[.5,1,-.5]]],
  [[1,0,0],  [[.5,0,.5],[.5,0,-.5],[.5,1,-.5],[.5,1,.5]]],
  [[-1,0,0], [[-.5,0,-.5],[-.5,0,.5],[-.5,1,.5],[-.5,1,-.5]]],
  [[0,1,0],  [[-.5,1,.5],[.5,1,.5],[.5,1,-.5],[-.5,1,-.5]]],
  [[0,-1,0], [[-.5,0,-.5],[.5,0,-.5],[.5,0,.5],[-.5,0,.5]]],
];

for (const [name, mat, [w, h, d], [x, y, z]] of parts) {
  const pos = [], nor = [], idx = [];
  faces.forEach(([n, corners], f) => {
    corners.forEach(([cx, cy, cz]) => { pos.push(cx * w, cy * h, cz * d); nor.push(...n); });
    const b = f * 4; idx.push(b, b + 1, b + 2, b, b + 2, b + 3);
  });
  const P = new Float32Array(pos), N = new Float32Array(nor), I = new Uint16Array(idx);
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < P.length; i += 3) for (let k = 0; k < 3; k++) { min[k] = Math.min(min[k], P[i + k]); max[k] = Math.max(max[k], P[i + k]); }
  const pv = push(P, 34962), nv = push(N, 34962), iv = push(I, 34963);
  accessors.push({ bufferView: pv, componentType: 5126, count: 24, type: "VEC3", min, max });
  accessors.push({ bufferView: nv, componentType: 5126, count: 24, type: "VEC3" });
  accessors.push({ bufferView: iv, componentType: 5123, count: 36, type: "SCALAR" });
  const a = accessors.length - 3;
  meshes.push({ name, primitives: [{ attributes: { POSITION: a, NORMAL: a + 1 }, indices: a + 2, material: mat }] });
  nodes.push({ name, mesh: meshes.length - 1, translation: [x, y, z] });
}

const bin = Buffer.concat(chunks);
const json = {
  asset: { version: "2.0", generator: "strata-atelier make-model.mjs" },
  scene: 0, scenes: [{ nodes: nodes.map((_, i) => i) }], nodes, meshes, accessors, bufferViews,
  buffers: [{ byteLength: bin.length }],
  materials: [
    { name: "concrete", pbrMetallicRoughness: { baseColorFactor: [0.82, 0.8, 0.75, 1], metallicFactor: 0, roughnessFactor: 0.9 } },
    { name: "dark",     pbrMetallicRoughness: { baseColorFactor: [0.16, 0.16, 0.15, 1], metallicFactor: 0.1, roughnessFactor: 0.5 } },
  ],
};
const pad = (b, ch) => Buffer.concat([b, Buffer.alloc((4 - (b.length % 4)) % 4, ch)]);
const jsonBuf = pad(Buffer.from(JSON.stringify(json)), 0x20), binBuf = pad(bin, 0);
const total = 12 + 8 + jsonBuf.length + 8 + binBuf.length;
const head = Buffer.alloc(12); head.writeUInt32LE(0x46546c67, 0); head.writeUInt32LE(2, 4); head.writeUInt32LE(total, 8);
const ch = (len, type) => { const b = Buffer.alloc(8); b.writeUInt32LE(len, 0); b.writeUInt32LE(type, 4); return b; };
fs.mkdirSync("public/models", { recursive: true });
fs.writeFileSync("public/models/building.glb", Buffer.concat([head, ch(jsonBuf.length, 0x4e4f534a), jsonBuf, ch(binBuf.length, 0x004e4942), binBuf]));
console.log("building.glb", total, "bytes");
