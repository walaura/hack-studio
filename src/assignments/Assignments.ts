import { EMPTY_MATERIAL_ID } from "../materials/Materials";
import { Store } from "../store/useStore";

import defaultAssignments from "../../data/default-assignments.json";

enum Shell {
  FRONT_SHELL = "FRONT_SHELL",
  BACK_SHELL = "BACK_SHELL",
}

enum Button {
  DPAD = "DPAD",
  BUTTON_A = "BUTTON_A",
  BUTTON_B = "BUTTON_B",
}

enum SideButton {
  SHOULDER_L = "SHOULDER_L",
  SHOULDER_R = "SHOULDER_R",
  RAIL_L = "RAIL_L",
  RAIL_R = "RAIL_R",
}

enum Membrane {
  MEMBRANE_AB = "MEMBRANE_AB",
  MEMBRANE_DPAD = "MEMBRANE_DPAD",
  MEMBRANE_START_SELECT = "MEMBRANE_START_SELECT",
}

export enum Groups {
  EVERYTHING = "EVERYTHING",
  SHELL = "SHELL",
  ALL_BUTTONS = "ALL_BUTTONS",
  FACE_BUTTONS = "FACE_BUTTONS",
  SIDE_BUTTONS = "SIDE_BUTTONS",
  LOWER_MEMBRANES = "LOWER_MEMBRANES",
}

const BaseAssignmentSurface = {
  ...Button,
  ...SideButton,
  ...Shell,
  ...Membrane,
};

export const AssignmentSurface = { ...Groups, ...BaseAssignmentSurface };
export type AssignmentSurfaceID = keyof typeof AssignmentSurface;

export const GBA_INHERITS_FROM: {
  [K in keyof typeof AssignmentSurface]: keyof typeof Groups;
} = {
  [Shell.FRONT_SHELL]: Groups.SHELL,
  [Shell.BACK_SHELL]: Groups.SHELL,

  [Button.DPAD]: Groups.FACE_BUTTONS,
  [Button.BUTTON_A]: Groups.FACE_BUTTONS,
  [Button.BUTTON_B]: Groups.FACE_BUTTONS,
  [Membrane.MEMBRANE_START_SELECT]: Groups.FACE_BUTTONS,

  [SideButton.SHOULDER_L]: Groups.SIDE_BUTTONS,
  [SideButton.SHOULDER_R]: Groups.SIDE_BUTTONS,
  [SideButton.RAIL_L]: Groups.SIDE_BUTTONS,
  [SideButton.RAIL_R]: Groups.SIDE_BUTTONS,

  [Groups.FACE_BUTTONS]: Groups.ALL_BUTTONS,
  [Groups.SIDE_BUTTONS]: Groups.ALL_BUTTONS,

  [Membrane.MEMBRANE_AB]: Groups.LOWER_MEMBRANES,
  [Membrane.MEMBRANE_DPAD]: Groups.LOWER_MEMBRANES,
  [Groups.LOWER_MEMBRANES]: Groups.EVERYTHING,
  [Groups.ALL_BUTTONS]: Groups.EVERYTHING,
  [Groups.SHELL]: Groups.EVERYTHING,
  [Groups.EVERYTHING]: Groups.EVERYTHING,
};

export const PRETTY_NAMES: {
  [K in keyof typeof AssignmentSurface]: string;
} = {
  [Shell.FRONT_SHELL]: "Front shell",
  [Shell.BACK_SHELL]: "Back shell",

  [Button.DPAD]: "+ D-pad",
  [Button.BUTTON_A]: "A button",
  [Button.BUTTON_B]: "B button",
  [Membrane.MEMBRANE_START_SELECT]: "Start/Select",

  [SideButton.SHOULDER_L]: "L button",
  [SideButton.SHOULDER_R]: "R button",
  [SideButton.RAIL_L]: "Left rail",
  [SideButton.RAIL_R]: "Right rail",

  [Groups.FACE_BUTTONS]: "All face buttons",
  [Groups.SIDE_BUTTONS]: "All sides",

  [Membrane.MEMBRANE_AB]: "A/B membrane",
  [Membrane.MEMBRANE_DPAD]: "D-pad membrane",
  [Groups.LOWER_MEMBRANES]: "All membranes",
  [Groups.ALL_BUTTONS]: "All buttons",
  [Groups.SHELL]: "Entire shell",
  [Groups.EVERYTHING]: "Base material",
};

export const DEFAULT_ASSIGNMENTS: Store["assignments"] = {
  ...Object.keys(AssignmentSurface).reduce((acc, key) => {
    acc[key] = {
      type: "inherit",
      from: GBA_INHERITS_FROM[key],
    };
    return acc;
  }, {} as Store["assignments"]),
  ...defaultAssignments,
  [Groups.EVERYTHING]: {
    type: "assign",
    material: EMPTY_MATERIAL_ID,
  },
} as Store["assignments"];
