import { useStore } from "../store/useStore";

export enum ProjectType {
  GBA = "GBA",
  GBA_SP = "GBA_SP",
  GB = "GB",
  GBC = "GBC",
}

export const projectTypeName = {
  [ProjectType.GBA]: "GB Advance",
  [ProjectType.GBA_SP]: "GB Advance SP",
  [ProjectType.GB]: "GB",
  [ProjectType.GBC]: "GB Color",
};

export default function useProject() {
  const { project } = useStore();

  return project;
}
