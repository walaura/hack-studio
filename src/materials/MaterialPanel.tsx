import Flexbox from "../ui/Flexbox";
import Margin from "../ui/Margin";
import Box from "../ui/Box";
import Text from "../ui/Text";
import { MaterialPicker } from "./MaterialPicker";
import { useAssignments } from "../assignments/useAssignments";
import stylex from "@stylexjs/stylex";
import React, { ReactNode, useState } from "react";
import {
  AssignmentSurface,
  AssignmentSurfaceID,
} from "../assignments/Assignments";

const SECTIONS = {
  base: "Base",
  face: "Face",
  sides: "Side",
  membranes: "Membranes",
  all: "All",
  editor: "Editor",
};

function getSectionContent(
  section: keyof typeof SECTIONS
): (AssignmentSurfaceID | AssignmentSurfaceID[])[] {
  switch (section) {
    case "base":
      return [
        AssignmentSurface.SHELL,
        [AssignmentSurface.FRONT_SHELL, AssignmentSurface.BACK_SHELL],
        AssignmentSurface.ALL_BUTTONS,
        [AssignmentSurface.FACE_BUTTONS, AssignmentSurface.SIDE_BUTTONS],
        AssignmentSurface.LOWER_MEMBRANES,
      ];
    case "face":
      return [
        AssignmentSurface.FACE_BUTTONS,
        AssignmentSurface.DPAD,
        [AssignmentSurface.BUTTON_A, AssignmentSurface.BUTTON_B],
        AssignmentSurface.MEMBRANE_START_SELECT,
      ];
    case "sides":
      return [
        AssignmentSurface.SIDE_BUTTONS,
        [AssignmentSurface.SHOULDER_L, AssignmentSurface.SHOULDER_R],
        [AssignmentSurface.RAIL_L, AssignmentSurface.RAIL_R],
      ];
    case "membranes":
      return [
        AssignmentSurface.LOWER_MEMBRANES,
        AssignmentSurface.MEMBRANE_AB,
        AssignmentSurface.MEMBRANE_DPAD,
        AssignmentSurface.MEMBRANE_START_SELECT,
      ];
    case "editor":
      return [];
    default:
      return Object.keys(AssignmentSurface) as AssignmentSurfaceID[];
  }
}

export default function MaterialPanel({
  materialEditor,
}: {
  materialEditor: ReactNode;
}) {
  const [activeSection, setActiveSection] =
    useState<keyof typeof SECTIONS>("base");
  const keys = getSectionContent(activeSection);
  const { assignments } = useAssignments();

  const getPickerForAssignmentSurface = (
    surfaceID: AssignmentSurfaceID,
    noBasis = false
  ) => {
    return (
      <MaterialPicker
        xstyle={noBasis ? styles.noBasis : undefined}
        key={surfaceID}
        surface={surfaceID}
        assignedMaterial={assignments[surfaceID]}
      />
    );
  };

  return (
    <Box elevation={0} xstyle={styles.root}>
      <Flexbox direction="column" justify="stretch" xstyle={styles.cap}>
        <Flexbox xstyle={[Margin.all20]} direction="row" gap={4}>
          <Tabs
            activeSection={activeSection as keyof typeof SECTIONS}
            setActiveSection={setActiveSection}
          />
        </Flexbox>
        <div {...stylex.props(styles.divider)} />
        <Flexbox
          xstyle={styles.innie}
          direction="column"
          justify="start"
          key={activeSection}
        >
          {activeSection === "editor" ? (
            materialEditor
          ) : (
            <Flexbox gap={4} direction="column">
              {keys.map((key, index) => {
                if (Array.isArray(key)) {
                  return (
                    <Flexbox gap={4} key={index}>
                      {key.map((k) => (
                        <React.Fragment key={k}>
                          {getPickerForAssignmentSurface(k, true)}
                        </React.Fragment>
                      ))}
                    </Flexbox>
                  );
                }
                return getPickerForAssignmentSurface(key);
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
  return Object.keys(SECTIONS).map((section) => (
    <button
      key={section}
      {...stylex.props(
        styles.tab,
        section === activeSection && styles.activeTab
      )}
      onClick={() => setActiveSection(section as keyof typeof SECTIONS)}
    >
      <Text color={section === activeSection ? "primary" : "secondary"}>
        {SECTIONS[section]}
      </Text>
    </button>
  ));
}

const styles = stylex.create({
  tab: {
    padding: ".6em 1.2em",
    border: "none",
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
    borderBottom: "1px solid var(--surface-1)",
  },
  noBasis: {
    flexBasis: "0",
    flexGrow: 1,
    flexShrink: 1,
  },
});
