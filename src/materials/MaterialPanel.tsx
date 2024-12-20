import Flexbox from "../ui/Flexbox";
import Margin from "../ui/Margin";
import Box from "../ui/Box";
import Text from "../ui/Text";
import { MaterialPicker } from "./MaterialPicker";
import { useAssignments } from "../assignments/useAssignments";
import stylex from "@stylexjs/stylex";
import { ReactNode, useState } from "react";
import { Assignment, AssignmentKey } from "../assignments/Assignments";
import Button from "../ui/Button";
import { useStoreHistory } from "../store/useStore";
import {
  BsArrowClockwise,
  BsArrowCounterclockwise,
  BsMoon,
} from "react-icons/bs";

const SECTIONS = {
  base: "Base",
  face: "Face",
  sides: "Side",
  membranes: "Membranes",
  all: "All",
  editor: "Editor",
};

type SectionLayout =
  | {
      type: "title";
      title: string;
    }
  | AssignmentKey
  | SectionLayout[];

function getSectionContent(section: keyof typeof SECTIONS): SectionLayout[] {
  switch (section) {
    case "base":
      return [
        {
          type: "title",
          title: "Shell",
        },
        Assignment.SHELL,
        [Assignment.FRONT_SHELL, Assignment.BACK_SHELL],
        {
          type: "title",
          title: "Buttons",
        },
        Assignment.ALL_BUTTONS,
        [Assignment.FACE_BUTTONS, Assignment.SIDE_BUTTONS],
        {
          type: "title",
          title: "Membranes",
        },
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
    surfaceID: SectionLayout,
    noBasis = false
  ) => {
    if (typeof surfaceID === "object") {
      if ("type" in surfaceID && surfaceID.type === "title") {
        return (
          <Flexbox xstyle={styles.title} key={surfaceID.title} justify="start">
            <Text type="headline2">{surfaceID.title}</Text>
          </Flexbox>
        );
      }
      return;
    }
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
                      {key.map((k) => getPickerForAssignment(k, true))}
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
          justify="space-between"
          direction="row"
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
      <Flexbox direction="row">
        <Button isEnabled={canUndo} onClick={onUndo} type="secondary">
          <BsArrowCounterclockwise color="inherit" />
        </Button>
        {canRedo && (
          <Button onClick={onRedo} type="secondary">
            <BsArrowClockwise color="inherit" />
          </Button>
        )}
      </Flexbox>
      <Button
        onClick={() => {
          document.documentElement.classList.toggle("light");
        }}
        type="secondary"
      >
        <BsMoon color="inherit" />
      </Button>
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
  title: {
    marginTop: 16,
    marginBottom: 4,
    marginLeft: 12,
  },
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
    height: "100%",
    width: "100%",
    padding: 20,
    overflow: "auto",
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
