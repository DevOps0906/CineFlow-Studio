"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { MathUtils, type Group } from "three";
import type { GLTF } from "three/addons/loaders/GLTFLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { PROGRESS_EVENT } from "@/lib/motions";

/** M08 Model reveal: building levels rise one after another from the base as M04 progress goes 0 -> 1. */
function Building({ staticMode, gltf }: { staticMode: boolean; gltf: GLTF }) {
  const group = useRef<Group>(null);
  const target = useRef(staticMode ? 1 : 0);
  const current = useRef(staticMode ? 1 : 0);

  useEffect(() => {
    if (staticMode) return;
    const on = (e: Event) => { target.current = (e as CustomEvent<number>).detail; };
    window.addEventListener(PROGRESS_EVENT, on);
    return () => window.removeEventListener(PROGRESS_EVENT, on);
  }, [staticMode]);

  useFrame(({ gl }) => {
    current.current = MathUtils.damp(current.current, target.current, 6, 1 / 60);
    const p = staticMode ? 1 : current.current;
    const kids = gltf.scene.children;
    kids.forEach((k, i) => {
      const t = (i / kids.length) * 0.8;
      const s = MathUtils.clamp((p - t) / 0.2, 0, 1);
      k.visible = s > 0.001;
      k.scale.y = Math.max(s, 0.001);
    });
    if (group.current) group.current.rotation.y = -0.7 + p * 1.1;
    gl.domElement.parentElement?.setAttribute("data-progress", p.toFixed(2));
  });

  return <group ref={group} position={[0, -1.6, 0]}><primitive object={gltf.scene} /></group>;
}

const MODEL_URL = "/models/building.glb";

export default function Scene({ staticMode, onReady, onFail }: { staticMode: boolean; onReady: () => void; onFail: () => void }) {
  const [gltf, setGltf] = useState<GLTF | null>(null);

  // Load explicitly (no suspense/throw) so a failed request is handled without surfacing an uncaught error.
  useEffect(() => {
    let cancelled = false;
    new GLTFLoader().loadAsync(MODEL_URL).then((g) => { if (!cancelled) setGltf(g); }).catch(() => { if (!cancelled) onFail(); });
    return () => { cancelled = true; };
  }, [onFail]);

  if (!gltf) return null;
  return (
    <Canvas frameloop={staticMode ? "demand" : "always"} camera={{ position: [9.5, 6.5, 12.5], fov: 35 }} dpr={[1, 1.5]}
      gl={{ antialias: true }} onCreated={onReady} aria-hidden="true">
      <color attach="background" args={["#1b1a18"]} />
      <ambientLight intensity={0.45} />
      <hemisphereLight args={["#f2eee6", "#111111", 0.35]} />
      <directionalLight position={[-7, 8, 6]} intensity={3} color="#f2b872" />
      <directionalLight position={[6, 3, -4]} intensity={0.6} color="#9fb4d8" />
      <Building staticMode={staticMode} gltf={gltf} />
    </Canvas>
  );
}