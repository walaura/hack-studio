import { GLTF } from "three-stdlib";
import * as THREE from "three";
import { Material, MaterialKey } from "../materials/useMaterials";

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

export type ModelProps = {
  pickMaterial: (id: MaterialKey) => Material;
};

export type SPTypes = GLTF & {
  nodes: {
    A: THREE.Mesh;
    B: THREE.Mesh;
    battery: THREE.Mesh;
    bottom: THREE.Mesh;
    Dpad: THREE.Mesh;
    io: THREE.Mesh;
    L: THREE.Mesh;
    lights: THREE.Mesh;
    off: THREE.Mesh;
    R: THREE.Mesh;
    select: THREE.Mesh;
    start: THREE.Mesh;
    top: THREE.Mesh;
    Cube006: THREE.Mesh;
    Cube006_1: THREE.Mesh;
    Cube019: THREE.Mesh;
    Cube019_1: THREE.Mesh;
    pads: THREE.Mesh;
    screen: THREE.Mesh;
    cartdrige: THREE.Mesh;
  };
  materials: {
    Screen_Black: THREE.MeshStandardMaterial;
    TEXT_White: THREE.MeshStandardMaterial;
    Black_TEXT_Background: THREE.MeshStandardMaterial;
  };
};

export type GBType = GLTF & {
  nodes: {
    DPAD: THREE.Mesh;
    PlugIn: THREE.Mesh;
    Volume: THREE.Mesh;
    ButtonA: THREE.Mesh;
    BatteryClip: THREE.Mesh;
    PowerSwitch: THREE.Mesh;
    ButtonSelect: THREE.Mesh;
    HeadphoneBorder: THREE.Mesh;
    Brightness: THREE.Mesh;
    plugOut: THREE.Mesh;
    Screws: THREE.Mesh;
    ButtonB: THREE.Mesh;
    Charger: THREE.Mesh;
    Vent: THREE.Mesh;
    Back: THREE.Mesh;
    HeadphonePin: THREE.Mesh;
    ChargerPin: THREE.Mesh;
    low_Screen: THREE.Mesh;
    front: THREE.Mesh;
    bezel: THREE.Mesh;
    PlugInMetal: THREE.Mesh;
    light: THREE.Mesh;
  };
  materials: object;
};

export type GBCTypes = GLTF & {
  nodes: {
    A: THREE.Mesh;
    B: THREE.Mesh;
    back: THREE.Mesh;
    battery: THREE.Mesh;
    bezel: THREE.Mesh;
    DPAD: THREE.Mesh;
    front: THREE.Mesh;
    screen: THREE.Mesh;
    screws: THREE.Mesh;
    select: THREE.Mesh;
    start: THREE.Mesh;
  };
  materials: object;
};
