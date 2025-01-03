import Flexbox from "../../ui/Flexbox";
import Margin from "../../ui/Margin";
import Box from "../../ui/Box";
import stylex from "@stylexjs/stylex";
import { ReactNode } from "react";
import Button from "../../ui/Button";
import { useStoreHistory, useWriteToStore } from "../../store/useStore";
import { saveAs } from "file-saver";
import Popover from "../../ui/Popover";
import AssignmentPanelForGBA from "./assignments/AssignmentPanelForGBA";
import Divider from "../../ui/Divider";
import Tabs from "../../ui/Tabs";
import useProject, { ProjectType } from "../../project/useProject";
import AssignmentPanelForGBASP from "./assignments/AssignmentPanelForGBASP";
import {
  FaArrowRotateLeft,
  FaArrowRotateRight,
  FaDownload,
  FaMoon,
  FaPencil,
} from "react-icons/fa6";

export default function MaterialPanel({
  materialEditor,
}: {
  materialEditor: ReactNode;
}) {
  const { type } = useProject();
  const AssignmentPanel =
    type === ProjectType.GBA ? AssignmentPanelForGBA : AssignmentPanelForGBASP;

  return (
    <Flexbox direction="column" xstyle={styles.root} gap={8}>
      <TypePicker />
      <Box elevation={0} xstyle={styles.root}>
        <Flexbox direction="column" justify="stretch" xstyle={styles.cap}>
          <AssignmentPanel />
          <Divider />
          <Flexbox
            xstyle={[Margin.all12]}
            justify="space-between"
            direction="row"
          >
            <Footer materialEditor={materialEditor} />
          </Flexbox>
        </Flexbox>
      </Box>
    </Flexbox>
  );
}

function TypePicker() {
  const { type } = useProject();
  const { setProjectType } = useWriteToStore();

  return (
    <Box elevation={0}>
      <Flexbox direction="row" gap={4} xstyle={Margin.all12}>
        <Tabs
          tabs={ProjectType}
          activeTab={type}
          setActiveTab={setProjectType}
        />
      </Flexbox>
    </Box>
  );
}

function Footer({ materialEditor }: { materialEditor: ReactNode }) {
  const { onUndo, onRedo, canUndo, canRedo } = useStoreHistory();
  return (
    <>
      <Flexbox direction="row" gap={4}>
        <Button isEnabled={canUndo} onClick={onUndo} type="secondary">
          <FaArrowRotateLeft color="inherit" />
        </Button>
        {canRedo && (
          <Button onClick={onRedo} type="secondary">
            <FaArrowRotateRight color="inherit" />
          </Button>
        )}
      </Flexbox>
      <Flexbox direction="row" gap={4}>
        <Popover popover={materialEditor}>
          <Button title="Material editor" type="secondary">
            <FaPencil color="inherit" />
          </Button>
        </Popover>
        <Button
          title="Download Image"
          onClick={() => {
            document
              .getElementsByTagName("canvas")[0]
              .toBlob((blob) => saveAs(blob, "gba"));
          }}
          type="secondary"
        >
          <FaDownload color="inherit" />
        </Button>
        <Button
          onClick={() => {
            document.documentElement.classList.toggle("light");
          }}
          type="secondary"
        >
          <FaMoon color="inherit" />
        </Button>
      </Flexbox>
    </>
  );
}

const styles = stylex.create({
  root: {
    height: "100%",
  },
  cap: {
    height: "100%",
  },
});
