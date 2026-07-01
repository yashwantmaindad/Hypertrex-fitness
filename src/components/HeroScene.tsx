"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function FloatingGeometries() {
  const torusRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Group>(null); // Changed to Group for dumbbell model
  const ringRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Rotate geometries individually
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.1;
      torusRef.current.rotation.y = t * 0.15;
    }

    if (sphereRef.current) {
      sphereRef.current.rotation.y = -t * 0.15;
      sphereRef.current.rotation.x = t * 0.08;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.05;
      ringRef.current.rotation.z = t * 0.03;
    }

    // Parallax effect based on mouse coordinate
    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mouse.x * 0.8, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mouse.y * 0.8, 0.05);
      
      // Rotate group slightly with mouse
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.2, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.2, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central 3D Dumbbell (Procedurally Modeled Gym Equipment) */}
      <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.5}>
        <group ref={sphereRef} position={[0, 0, 0]} rotation={[0.4, 0.5, 0.6]}>
          {/* Dumbbell Handle/Shaft */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.07, 0.07, 2.2, 32]} />
            <meshStandardMaterial
              color="#D4AF37"
              roughness={0.1}
              metalness={0.95}
              emissive="#332200"
              emissiveIntensity={0.1}
            />
          </mesh>

          {/* Shaft grip texture rings */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.075, 0.075, 1.0, 32]} />
            <meshStandardMaterial
              color="#111111"
              roughness={0.6}
              metalness={0.2}
            />
          </mesh>

          {/* Inner Collars / Stopper (Left) */}
          <mesh position={[-0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.16, 0.16, 0.1, 32]} />
            <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* Inner Collars / Stopper (Right) */}
          <mesh position={[0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.16, 0.16, 0.1, 32]} />
            <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.15} />
          </mesh>

          {/* Left Weight Plate 1 (Inner Dark) */}
          <mesh position={[-0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.65, 0.65, 0.22, 32]} />
            <meshStandardMaterial color="#0d0d0d" metalness={0.8} roughness={0.1} />
          </mesh>
          {/* Left Weight Plate 2 (Outer Gold) */}
          <mesh position={[-1.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.55, 0.55, 0.2, 32]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.15} />
          </mesh>

          {/* Right Weight Plate 1 (Inner Dark) */}
          <mesh position={[0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.65, 0.65, 0.22, 32]} />
            <meshStandardMaterial color="#0d0d0d" metalness={0.8} roughness={0.1} />
          </mesh>
          {/* Right Weight Plate 2 (Outer Gold) */}
          <mesh position={[1.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.55, 0.55, 0.2, 32]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.15} />
          </mesh>
        </group>
      </Float>

      {/* Golden Orbital Ring */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={0.8}>
        <mesh ref={ringRef} position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.5, 0.03, 16, 100]} />
          <meshStandardMaterial
            color="#D4AF37"
            roughness={0.15}
            metalness={0.95}
            emissive="#554411"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

      {/* Floating Gold Weight Plate 1 (Torus) */}
      <Float speed={1.2} rotationIntensity={2} floatIntensity={1.8}>
        <mesh ref={torusRef} position={[-3, 1.5, -2]}>
          <torusGeometry args={[0.7, 0.22, 16, 48]} />
          <meshStandardMaterial
            color="#D4AF37"
            roughness={0.1}
            metalness={0.9}
            emissive="#221100"
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>

      {/* Floating Obsidian Weight Plate 2 */}
      <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[3.2, -1.2, -1.5]} rotation={[1.2, 0.5, 0]}>
          <torusGeometry args={[0.6, 0.2, 16, 48]} />
          <meshStandardMaterial
            color="#111111"
            roughness={0.05}
            metalness={0.85}
          />
        </mesh>
      </Float>

      {/* Floating Gold Detail Plate 3 */}
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-2.2, -2, -1]} rotation={[0.2, 1.0, 0.5]}>
          <torusGeometry args={[0.4, 0.12, 16, 32]} />
          <meshStandardMaterial
            color="#D4AF37"
            roughness={0.1}
            metalness={0.95}
          />
        </mesh>
      </Float>
    </group>
  );
}

// Separate component for scroll camera handling
function SceneController() {
  useFrame((state) => {
    // Camera moves down slowly as user scrolls
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0;
    
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 6 + scrollPercent * 4, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -scrollPercent * 3, 0.05);
  });
  return null;
}

export default function HeroScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 bg-primary-bg flex items-center justify-center">
        {/* Loading Spinner / Fallback */}
        <div className="w-16 h-16 rounded-full border border-accent-gold/20 border-t-accent-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 select-none pointer-events-none">
      <Canvas eventSource={typeof window !== "undefined" ? window.document.body : undefined}>
        <PerspectiveCamera makeDefault position={[0, 0, 6.5]} fov={50} />
        
        {/* Lighting Config */}
        <ambientLight intensity={0.2} />
        
        {/* Intense cinematic spot lights */}
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.5}
          color="#ffffff"
          castShadow
        />
        <spotLight
          position={[-10, -10, -5]}
          angle={0.3}
          penumbra={1}
          intensity={1.0}
          color="#D4AF37"
        />
        <directionalLight position={[0, 5, 5]} intensity={0.5} color="#D4AF37" />
        <pointLight position={[0, 0, 2]} intensity={0.4} color="#ffffff" />
        
        <FloatingGeometries />
        <SceneController />
      </Canvas>
    </div>
  );
}
