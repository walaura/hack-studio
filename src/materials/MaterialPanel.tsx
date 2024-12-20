import Flexbox from "../ui/Flexbox";
import Margin from "../ui/Margin";
import Box from "../ui/Box";
import Text from "../ui/Text";
import { MaterialPicker } from "./MaterialPicker";
import { MaterialMap, Surface, SurfaceID } from "./useMaterialAssignments";
import stylex from "@stylexjs/stylex";
import { ReactNode, useState } from "react";
import { Material, MaterialID } from "./useMaterials";

const SECTIONS = {
  base: "Base",
  face: "Face buttons",
  sides: "Side buttons",
  membranes: "Membranes",
  all: "All",
  editor: "Editor",
};

function getSectionContent(
  section: keyof typeof SECTIONS
): (SurfaceID | SurfaceID[])[] {
  switch (section) {
    case "base":
      return [
        Surface.SHELL,
        [Surface.FRONT_SHELL, Surface.BACK_SHELL],
        Surface.ALL_BUTTONS,
        [Surface.FACE_BUTTONS, Surface.SIDE_BUTTONS],
        Surface.LOWER_MEMBRANES,
      ];
    case "face":
      return [
        Surface.FACE_BUTTONS,
        Surface.DPAD,
        [Surface.BUTTON_A, Surface.BUTTON_B],
        Surface.MEMBRANE_START_SELECT,
      ];
    case "sides":
      return [
        Surface.SIDE_BUTTONS,
        [Surface.SHOULDER_L, Surface.SHOULDER_R],
        [Surface.RAIL_L, Surface.RAIL_R],
      ];
    case "membranes":
      return [
        Surface.LOWER_MEMBRANES,
        Surface.MEMBRANE_AB,
        Surface.MEMBRANE_DPAD,
        Surface.MEMBRANE_START_SELECT,
      ];
    case "editor":
      return [];
    default:
      return Object.keys(Surface) as SurfaceID[];
  }
}

export default function MaterialPanel({
  materialMap,
  materials,
  assignInheritance,
  assignMaterial,
  materialEditor,
}: {
  materialMap: MaterialMap;
  materials: Material[];
  assignInheritance: (surfaceID: SurfaceID, from: SurfaceID) => void;
  assignMaterial: (surfaceID: SurfaceID, materialID: MaterialID) => void;
  materialEditor: ReactNode;
}) {
  const [activeSection, setActiveSection] =
    useState<keyof typeof SECTIONS>("base");
  const keys = getSectionContent(activeSection);

  const getPickerForSurface = (surfaceID: SurfaceID, noBasis = false) => {
    return (
      <MaterialPicker
        xstyle={noBasis ? styles.noBasis : undefined}
        key={surfaceID}
        surface={surfaceID}
        materials={materials}
        assignedMaterial={materialMap[surfaceID]}
        onPickInheritance={(id) => {
          assignInheritance(surfaceID, id);
        }}
        onPickMaterial={(id) => {
          assignMaterial(surfaceID, id);
        }}
      />
    );
  };

  return (
    <Box elevation={0} xstyle={styles.root}>
      <Flexbox direction="row" justify="stretch" xstyle={styles.cap}>
        <Flexbox xstyle={[Margin.all20]} direction="column">
          <Tabs
            activeSection={activeSection as keyof typeof SECTIONS}
            setActiveSection={setActiveSection}
          />
        </Flexbox>
        <div {...stylex.props(styles.divider)} />
        <Flexbox xstyle={[styles.innie]} direction="column" justify="start">
          {activeSection === "editor" ? (
            materialEditor
          ) : (
            <Flexbox gap={4} direction="column">
              {keys.map((key) => {
                if (Array.isArray(key)) {
                  return (
                    <Flexbox gap={4}>
                      {key.map((k) => getPickerForSurface(k, true))}
                    </Flexbox>
                  );
                }
                return getPickerForSurface(key);
              })}
            </Flexbox>
          )}
        </Flexbox>
      </Flexbox>
    </Box>
  );
}

function Tabs({
  activeSection,
  setActiveSection,
}: {
  activeSection: keyof typeof SECTIONS;
  setActiveSection: (section: keyof typeof SECTIONS) => void;
}) {
  return (
    <Flexbox direction="column">
      {Object.keys(SECTIONS).map((section) => (
        <button
          {...stylex.props(
            styles.tab,
            section === activeSection && styles.activeTab
          )}
          onClick={() => setActiveSection(section as keyof typeof SECTIONS)}
        >
          <Text type={section === activeSection ? "body3emphasis" : "body3"}>
            {SECTIONS[section]}
          </Text>
        </button>
      ))}
    </Flexbox>
  );
}

const styles = stylex.create({
  tab: {
    padding: "1em 2em",
    border: "none",
    width: "10em",
    backgroundColor: "transparent",
    cursor: "pointer",
    borderRadius: "9999em",
    ":hover": {
      boxShadow: "inset 0 0 0 2px var(--surface-1)",
    },
  },
  activeTab: {
    backgroundColor: "var(--surface-1)",
  },
  root: {
    height: "100%",
    overflow: "hidden",
  },
  innie: {
    overflow: "scroll",
    height: "100%",
    width: "100%",
    padding: 20,
  },
  cap: {
    height: "100%",
  },
  divider: {
    borderLeft: "1px solid var(--divider)",
  },
  noBasis: {
    flexBasis: "0",
    flexGrow: 1,
    flexShrink: 1,
  },
});
