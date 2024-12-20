import Flexbox from "../ui/Flexbox";
import Margin from "../ui/Margin";
import Box from "../ui/Box";
import { MaterialPicker } from "./MaterialPicker";
import { useAssignments } from "../assignments/useAssignments";
import stylex from "@stylexjs/stylex";
import React, { ReactNode, useState } from "react";
import { Assignment, AssignmentKey } from "../assignments/Assignments";
import Button from "../ui/Button";
import { useStoreHistory } from "../store/useStore";
import { BsArrowClockwise, BsArrowCounterclockwise } from "react-icons/bs";

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
): (AssignmentKey | AssignmentKey[])[] {
  switch (section) {
    case "base":
      return [
        Assignment.SHELL,
        [Assignment.FRONT_SHELL, Assignment.BACK_SHELL],
        Assignment.ALL_BUTTONS,
        [Assignment.FACE_BUTTONS, Assignment.SIDE_BUTTONS],
        Assignment.LOWER_MEMBRANES,
      ];
    case "face":
      return [
        Assignment.FACE_BUTTONS,
        Assignment.DPAD,
        [Assignment.BUTTON_A, Assignment.BUTTON_B],
        Assignment.MEMBRANE_START_SELECT,
      ];
    case "sides":
      return [
        Assignment.SIDE_BUTTONS,
        [Assignment.SHOULDER_L, Assignment.SHOULDER_R],
        [Assignment.RAIL_L, Assignment.RAIL_R],
      ];
    case "membranes":
      return [
        Assignment.LOWER_MEMBRANES,
        Assignment.MEMBRANE_AB,
        Assignment.MEMBRANE_DPAD,
        Assignment.MEMBRANE_START_SELECT,
      ];
    case "editor":
      return [];
    default:
      return Object.keys(Assignment) as AssignmentKey[];
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

  const getPickerForAssignment = (
    surfaceID: AssignmentKey,
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
                          {getPickerForAssignment(k, true)}
                        </React.Fragment>
                      ))}
                    </Flexbox>
                  );
                }
                return getPickerForAssignment(key);
              })}
            </Flexbox>
          )}
        </Flexbox>
        <div {...stylex.props(styles.divider)} />
        <Flexbox
          xstyle={[Margin.all20]}
          justify="start"
          direction="row"
          gap={4}
        >
          <Footer />
        </Flexbox>
      </Flexbox>
    </Box>
  );
}

function Footer() {
  const { onUndo, onRedo, canUndo, canRedo } = useStoreHistory();
  return (
    <>
      <Button isEnabled={canUndo} onClick={onUndo} type="secondary">
        <BsArrowCounterclockwise color="inherit" />
      </Button>
      {canRedo && (
        <Button onClick={onRedo} type="secondary">
          <BsArrowClockwise color="inherit" />
        </Button>
      )}
    </>
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
    <Button
      type={section === activeSection ? "activeTab" : "tab"}
      key={section}
      onClick={() => setActiveSection(section as keyof typeof SECTIONS)}
    >
      {SECTIONS[section]}
    </Button>
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
    borderBottom: "2px solid var(--surface-1)",
  },
  noBasis: {
    flexBasis: "0",
    flexGrow: 1,
    flexShrink: 1,
  },
});
