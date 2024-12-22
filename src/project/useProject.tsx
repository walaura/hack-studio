import { useStore } from "../store/useStore";

export default function useProject() {
  const { project } = useStore();

  return project;
}
