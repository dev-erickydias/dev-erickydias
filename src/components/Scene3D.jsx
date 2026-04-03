"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ position, geometry, color, speed = 1, floatSpeed = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.002 * speed;
    meshRef.current.rotation.y += 0.003 * speed;
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position}>
        {geometry}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          transparent
          opacity={0.2}
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

  return <pointLight ref={lightRef} position={[0, 0, 6]} intensity={0.8} color="#D4A853" />;
}

function Particles({ count = 80 }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  const ref = useRef();

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.0003;
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
      <pointsMaterial size={0.04} color="#D4A853" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
    >
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.5} />
      <MouseLight />

      <FloatingShape
        position={[-3.5, 2, -2]}
        geometry={<icosahedronGeometry args={[1.2, 1]} />}
        color="#D4A853"
        speed={0.8}
        floatSpeed={1.2}
      />
      <FloatingShape
        position={[3.5, -1.5, -3]}
        geometry={<torusGeometry args={[1, 0.3, 8, 16]} />}
        color="#3ECFB4"
        speed={1.2}
        floatSpeed={0.8}
      />
      <FloatingShape
        position={[0, 3, -4]}
        geometry={<octahedronGeometry args={[0.8, 0]} />}
        color="#E8895C"
        speed={0.6}
        floatSpeed={1.5}
      />
      <FloatingShape
        position={[-2, -2.5, -2]}
        geometry={<dodecahedronGeometry args={[0.7, 0]} />}
        color="#3ECFB4"
        speed={1}
        floatSpeed={1}
      />
      <FloatingShape
        position={[4, 2.5, -5]}
        geometry={<tetrahedronGeometry args={[0.9, 0]} />}
        color="#D4A853"
        speed={0.7}
        floatSpeed={1.3}
      />

      <Particles count={100} />
    </Canvas>
  );
}
