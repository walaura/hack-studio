/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei";
import { SPTypes } from "../types";

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/sp.glb") as SPTypes;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.A.geometry}
        material={nodes.A.material}
        position={[1.185, -0.74, 1.324]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.B.geometry}
        material={nodes.B.material}
        position={[0.596, -0.738, 1.556]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.battery.geometry}
        material={nodes.battery.material}
        position={[-0.041, -1.212, 1.058]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bottom.geometry}
        material={nodes.bottom.material}
        position={[0.054, -1.031, 1.365]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Dpad.geometry}
        material={nodes.Dpad.material}
        position={[-0.968, -0.813, 1.443]}
      />
      <group position={[0.057, -1.084, 0.783]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube036.geometry}
          material={materials.Button_Black}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube036_1.geometry}
          material={materials.Buttons_Light_Grey}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube036_2.geometry}
          material={materials.Port_Gold}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.L.geometry}
        material={materials.Buttons_Light_Grey}
        position={[-1.746, -1.042, -0.077]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.lights.geometry}
        material={materials.Battery_Light}
        position={[1.73, -0.832, 0.683]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.off.geometry}
        material={materials.Buttons_Light_Grey}
        position={[-0.053, -0.81, 0.619]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.R.geometry}
        material={materials.Buttons_Light_Grey}
        position={[1.661, -1.065, -0.086]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.select.geometry}
        material={materials.Buttons_Light_Grey}
        position={[-0.363, -0.803, 3.101]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.start.geometry}
        material={materials.Buttons_Light_Grey}
        position={[0.266, -0.803, 3.101]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.top.geometry}
        material={nodes.top.material}
        position={[1.804, -0.615, -0.043]}
      >
        <group position={[-1.747, -0.469, 0.826]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube006.geometry}
            material={materials.Screen_Black}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube006_1.geometry}
            material={materials.TEXT_White}
          />
        </group>
        <group position={[-1.747, -0.469, 0.826]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube019.geometry}
            material={materials.TEXT_White}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube019_1.geometry}
            material={materials.Black_TEXT_Background}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pads.geometry}
          material={nodes.pads.material}
          position={[-1.747, -0.469, 0.826]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.screen.geometry}
          material={nodes.screen.material}
          position={[-1.747, -0.469, 0.826]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cartdrige.geometry}
        material={nodes.cartdrige.material}
        position={[0.072, -1.053, 0.769]}
      />
    </group>
  );
}

useGLTF.preload("/sp.glb");
