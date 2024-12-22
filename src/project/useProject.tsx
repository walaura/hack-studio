import { useStore } from "../store/useStore";

export enum ProjectType {
  GBA = "GBA",
  GBA_SP = "GBA_SP",
  GB = "GB",
  GBC = "GBC",
}

export default function useProject() {
  const { project } = useStore();

  return project;
}
