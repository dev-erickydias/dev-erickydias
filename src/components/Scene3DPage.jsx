"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ position, geometry, color, speed = 1, floatSpeed = 1 }) {
  const meshRef = useRef();

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.001 * speed;
    meshRef.current.rotation.y += 0.002 * speed;
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position}>
        {geometry}
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.08}
          wireframe
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

function MouseLight() {
  const lightRef = useRef();
  const { pointer, viewport } = useThree();

  useFrame(() => {
    if (!lightRef.current) return;
    lightRef.current.position.x = (pointer.x * viewport.width) / 2;
    lightRef.current.position.y = (pointer.y * viewport.height) / 2;
  });

  return <pointLight ref={lightRef} position={[0, 0, 6]} intensity={0.5} color="#D4A853" />;
}

function Particles({ count = 40 }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  const ref = useRef();

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.0002;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#D4A853" transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

const VARIANTS = {
  about: [
    { pos: [-4, 2, -3], geo: "icosahedron", color: "#D4A853", speed: 0.6 },
    { pos: [4, -2, -4], geo: "torus", color: "#3ECFB4", speed: 0.8 },
    { pos: [0, 3.5, -5], geo: "octahedron", color: "#E8895C", speed: 0.5 },
  ],
  experience: [
    { pos: [-3.5, 1.5, -3], geo: "dodecahedron", color: "#3ECFB4", speed: 0.7 },
    { pos: [4.5, -1, -4], geo: "tetrahedron", color: "#D4A853", speed: 0.9 },
    { pos: [-1, -3, -5], geo: "torus", color: "#E8895C", speed: 0.5 },
  ],
  projects: [
    { pos: [-4.5, -1, -3], geo: "torus", color: "#D4A853", speed: 0.8 },
    { pos: [3.5, 2.5, -4], geo: "icosahedron", color: "#3ECFB4", speed: 0.6 },
    { pos: [1, -3.5, -5], geo: "dodecahedron", color: "#E8895C", speed: 0.7 },
  ],
  contact: [
    { pos: [-3, 2.5, -3], geo: "octahedron", color: "#D4A853", speed: 0.5 },
    { pos: [4, 0, -4], geo: "icosahedron", color: "#3ECFB4", speed: 0.7 },
    { pos: [-1, -2.5, -5], geo: "tetrahedron", color: "#E8895C", speed: 0.6 },
  ],
};

const GEOMETRIES = {
  icosahedron: <icosahedronGeometry args={[0.9, 1]} />,
  torus: <torusGeometry args={[0.8, 0.25, 8, 16]} />,
  octahedron: <octahedronGeometry args={[0.7, 0]} />,
  dodecahedron: <dodecahedronGeometry args={[0.6, 0]} />,
  tetrahedron: <tetrahedronGeometry args={[0.8, 0]} />,
};

export default function Scene3DPage({ variant = "about" }) {
  const shapes = VARIANTS[variant] || VARIANTS.about;

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
    >
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.2} />
      <MouseLight />

      {shapes.map((shape, i) => (
        <FloatingShape
          key={i}
          position={shape.pos}
          geometry={GEOMETRIES[shape.geo]}
          color={shape.color}
          speed={shape.speed}
          floatSpeed={0.8}
        />
      ))}

      <Particles count={50} />
    </Canvas>
  );
}
