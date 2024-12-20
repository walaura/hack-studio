import { Store } from "../store/useStore";

export const EMPTY_MATERIAL_ID = "0";

export const DEFAULT_MATERIALS: Store["materials"] = {
  [EMPTY_MATERIAL_ID]: {
    color: "#ff00ff",
  },
  purple: {
    color: "#643A6D",
  },
  gray: {
    color: "#E0E0E0",
  },
  white: {
    color: "#fff",
  },
  black: {
    color: "#000",
  },
  babyGreen: {
    color: "#64D1C5",
  },
  yellow: {
    color: "#FEBC3D",
  },
  beige: {
    color: "#F2EBE4",
  },
  orange: {
    color: "#EF5E16",
  },
  SFCGrey: {
    color: "#C4C2CA",
  },
  babyBlue: {
    color: "#ACFCFE",
  },
  pink: {
    color: "#F2C2CC",
  },
};
