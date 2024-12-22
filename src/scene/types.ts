import { GLTF } from "three-stdlib";
import * as THREE from "three";

export type GBAType = GLTF & {
  nodes: {
    back: THREE.Mesh;
    Front: THREE.Mesh;
    A: THREE.Mesh;
    B: THREE.Mesh;
    R: THREE.Mesh;
    L: THREE.Mesh;
    DPAD: THREE.Mesh;
    select: THREE.Mesh;
    bezel: THREE.Mesh;
    screen: THREE.Mesh;
    RSide: THREE.Mesh;
    LSide: THREE.Mesh;
    battery: THREE.Mesh;
    screws: THREE.Mesh;
    light: THREE.Mesh;
    CAPACITOR;
    memebrane_dpAD: THREE.Mesh;
    Plane007: THREE.Mesh;
    Plane007_1: THREE.Mesh;
    lights: THREE.Mesh;
    Plane007_2: THREE.Mesh;
    Plane007_3: THREE.Mesh;
    speaker: THREE.Mesh;
  };
  materials: object;
};
