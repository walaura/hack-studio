import { Store } from "../store/useStore";

export const EMPTY_MATERIAL_ID = "0";

export const DEFAULT_MATERIALS: Store["materials"] = {
  [EMPTY_MATERIAL_ID]: {
    color: "#ff00ff",
  },
  purple: {
    color: "#7F00FF",
  },
  gray: {
    color: "#eee",
  },
};
