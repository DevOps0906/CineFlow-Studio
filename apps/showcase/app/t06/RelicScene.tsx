"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { MathUtils, type Group } from "three";

/** M08 Model reveal: procedural relic (no external asset) scales in, spins, and tilts toward the pointer. */
function Relic() {
  const g = useRef<Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const reveal = useRef(0);

  useEffect(() => {
    const on = (e: PointerEvent) => { target.current = { x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 }; };
    window.addEventListener("pointermove", on);
    return () => window.removeEventListener("pointermove", on);
  }, []);

  useFrame((state, dt) => {
    const grp = g.current;
    if (!grp) return;
    reveal.current = MathUtils.damp(reveal.current, 1, 3, dt);
    grp.scale.setScalar(0.001 + reveal.current);
    grp.rotation.y += dt * 0.35;
    grp.rotation.x = MathUtils.damp(grp.rotation.x, target.current.y * 0.8, 4, dt);
    grp.rotation.z = MathUtils.damp(grp.rotation.z, -target.current.x * 0.6, 4, dt);
    state.gl.domElement.parentElement?.setAttribute("data-reveal", reveal.current.toFixed(2));
  });

  return (
    <group ref={g}>
      <mesh>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial color="#1a0b18" emissive="#ff3d8b" emissiveIntensity={0.45} roughness={0.3} metalness={0.7} flatShading />
      </mesh>
      <mesh scale={1.45}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#3df2ff" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[2.15, 0.012, 8, 160]} />
        <meshBasicMaterial color="#ff3d8b" />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, 0.5, 0]}>
        <torusGeometry args={[2.45, 0.008, 8, 160]} />
        <meshBasicMaterial color="#3df2ff" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

export default function RelicScene({ onReady }: { onReady: () => void }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} onCreated={onReady} aria-hidden="true">
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 4]} intensity={60} color="#3df2ff" />
      <pointLight position={[-4, -2, 3]} intensity={45} color="#ff3d8b" />
      <Relic />
    </Canvas>
  );
}
