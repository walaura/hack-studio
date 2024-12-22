import { MeshPhysicalMaterial, TextureLoader, Vector2 } from "three";
import { Material } from "../materials/useMaterials";

export const plasticNormal = new TextureLoader().load(
  "./assets/Plastic013A_2K-JPG_NormalDX.jpg"
);

export const createBezelMaterial = (type: "dark" | "light") =>
  new MeshPhysicalMaterial({
    roughness: 0.1,
    thickness: 1,
    color: type === "dark" ? "black" : "white",
  });

export const createButtonsMaterial = (color: string) =>
  new MeshPhysicalMaterial({
    color,
    roughness: 0.3,
    reflectivity: 1,
    clearcoat: 0.5,
  });

export const membranesMaterial = (color: string) =>
  new MeshPhysicalMaterial({
    color,
    roughness: 1,
    opacity: 0.9,
    sheen: 10,
    clearcoat: 0,
  });

export const createHardPlasticMaterial = (material: Material) => {
  const commonPlastic = {
    color: material.color,
    normalMap: plasticNormal,
    thickness: 0.2,
    ior: 1.46,
    normalScale: new Vector2(0.5, 0.6),
  };
  return material.opacity !== 1
    ? new MeshPhysicalMaterial({
        roughness: Math.min(Math.max(material.opacity, 0.1), 0.4),
        transmission: 1,
        ...commonPlastic,
      })
    : new MeshPhysicalMaterial({
        roughness: 0.5,
        ...commonPlastic,
      });
};
