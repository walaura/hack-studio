import { useStore } from "../store/useStore";

export enum ProjectType {
  GBA = "GBA",
  GBA_SP = "GBA_SP",
}

export default function useProject() {
  const { project } = useStore();

  return project;
}
