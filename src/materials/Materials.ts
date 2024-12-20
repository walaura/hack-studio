import { Store } from "../store/useStore";

import defaultMaterials from "../../data/default-materials.json";

export const EMPTY_MATERIAL_ID = "0";

export const DEFAULT_MATERIALS: Store["materials"] = {
  [EMPTY_MATERIAL_ID]: {
    color: "#ff00ff",
  },
  ...defaultMaterials,
};
