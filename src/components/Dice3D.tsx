import { Canvas } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  value: number;
};

function Pip({
  position,
}: {
  position: [number, number, number];
}) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.18, 32, 32]} />
      <meshStandardMaterial color="#111111" />
    </mesh>
  );
}

function DiceMesh({ value }: Props) {
  const meshRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    const rotations: Record<
      number,
      [number, number, number]
    > = {
      1: [0, 0, 0],
      2: [0, Math.PI / 2, 0],
      3: [-Math.PI / 2, 0, 0],
      4: [Math.PI / 2, 0, 0],
      5: [0, -Math.PI / 2, 0],
      6: [0, Math.PI, 0],
    };

    meshRef.current.rotation.set(
      rotations[value][0] - 0.6,
      rotations[value][1] + 0.8,
      rotations[value][2]
    );
  }, [value]);

  return (
    <group ref={meshRef}>
      <RoundedBox
        args={[2.5, 2.5, 2.5]}
        radius={0.18}
        smoothness={8}
        castShadow
      >
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.2}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Face 1 */}
      <Pip position={[0, 0, 1.28]} />

      {/* Face 2 */}
      <Pip position={[-0.5, 0.5, -1.28]} />
      <Pip position={[0.5, -0.5, -1.28]} />

      {/* Face 3 */}
      <Pip position={[1.28, 0.5, 0.5]} />
      <Pip position={[1.28, 0, 0]} />
      <Pip position={[1.28, -0.5, -0.5]} />

      {/* Face 4 */}
      <Pip position={[-1.28, 0.5, 0.5]} />
      <Pip position={[-1.28, 0.5, -0.5]} />
      <Pip position={[-1.28, -0.5, 0.5]} />
      <Pip position={[-1.28, -0.5, -0.5]} />

      {/* Face 5 */}
      <Pip position={[-0.5, 1.28, 0.5]} />
      <Pip position={[0.5, 1.28, 0.5]} />
      <Pip position={[0, 1.28, 0]} />
      <Pip position={[-0.5, 1.28, -0.5]} />
      <Pip position={[0.5, 1.28, -0.5]} />

      {/* Face 6 */}
      <Pip position={[-0.5, -1.28, 0.6]} />
      <Pip position={[0.5, -1.28, 0.6]} />
      <Pip position={[-0.5, -1.28, 0]} />
      <Pip position={[0.5, -1.28, 0]} />
      <Pip position={[-0.5, -1.28, -0.6]} />
      <Pip position={[0.5, -1.28, -0.6]} />
    </group>
  );
}

export default function Dice3D({
  value,
}: Props) {
  return (
    <div
      style={{
        width: "400px",
        height: "400px",
      }}
    >
      <Canvas
        shadows
        camera={{
          position: [6, 5, 6],
          fov: 45,
        }}
      >
        <ambientLight intensity={1.5} />

        <spotLight
          position={[10, 15, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
        />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
          castShadow
        />

        <pointLight
          position={[-5, 5, 5]}
          intensity={1}
          color="#60A5FA"
        />

        <DiceMesh value={value} />

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -2, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.4} />
        </mesh>

        <OrbitControls
          enableZoom={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}