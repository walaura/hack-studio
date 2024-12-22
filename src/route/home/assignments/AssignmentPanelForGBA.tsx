import { Assignment } from "../../../assignments/Assignments";
import { AssignmentPicker } from "../../../assignments/AssignmentPicker";
import Button from "../../../ui/Button";
import { AssignmentPanel, APGroup, APRow } from "./ui/AssignmentPanel";

const SECTIONS = {
  base: "Base",
  shell: "Shell",
  face: "Face",
  sides: "Sides",
};

export default function AssignmentPanelForGBA() {
  return (
    <AssignmentPanel tabs={SECTIONS}>
      {(tab, setTab) => {
        switch (tab) {
          case "base":
            return (
              <>
                <APGroup>
                  <AssignmentPicker
                    assignmentKey={Assignment.SHELL}
                    size="large"
                  />
                  <Button type="secondary" onClick={() => setTab("shell")}>
                    Tweak shell
                  </Button>
                </APGroup>
                <APGroup>
                  <APRow>
                    <AssignmentPicker assignmentKey={Assignment.ALL_BUTTONS} />
                    <AssignmentPicker assignmentKey={Assignment.SIDE_BUTTONS} />
                  </APRow>
                  <Button type="secondary" onClick={() => setTab("face")}>
                    Tweak face
                  </Button>
                  <AssignmentPicker
                    assignmentKey={Assignment.LOWER_MEMBRANES}
                  />
                </APGroup>
              </>
            );
          case "shell":
            return (
              <>
                <APRow>
                  <AssignmentPicker assignmentKey={Assignment.FRONT_SHELL} />
                  <AssignmentPicker assignmentKey={Assignment.BACK_SHELL} />
                </APRow>
                <AssignmentPicker
                  assignmentKey={Assignment.SHELL}
                  size="small"
                />
              </>
            );
          case "face":
            return (
              <>
                <APGroup title={"Buttons"}>
                  <APRow>
                    <AssignmentPicker assignmentKey={Assignment.BUTTON_A} />
                    <AssignmentPicker assignmentKey={Assignment.BUTTON_B} />
                  </APRow>
                  <AssignmentPicker assignmentKey={Assignment.DPAD} />
                  <AssignmentPicker
                    assignmentKey={Assignment.FACE_BUTTONS}
                    size="small"
                  />
                </APGroup>
                <APGroup title={"Membranes"}>
                  <APRow>
                    <AssignmentPicker assignmentKey={Assignment.MEMBRANE_AB} />
                    <AssignmentPicker
                      assignmentKey={Assignment.MEMBRANE_DPAD}
                    />
                  </APRow>
                  <AssignmentPicker
                    assignmentKey={Assignment.MEMBRANE_START_SELECT}
                  />
                  <AssignmentPicker
                    assignmentKey={Assignment.LOWER_MEMBRANES}
                    size="small"
                  />
                </APGroup>
              </>
            );
          case "sides":
            return (
              <>
                <APGroup title={"Sides"}>
                  <APRow>
                    <AssignmentPicker assignmentKey={Assignment.SHOULDER_L} />
                    <AssignmentPicker assignmentKey={Assignment.SHOULDER_R} />
                  </APRow>
                </APGroup>
                <APGroup title={"Rails"}>
                  <APRow>
                    <AssignmentPicker assignmentKey={Assignment.RAIL_L} />
                    <AssignmentPicker assignmentKey={Assignment.RAIL_R} />
                  </APRow>
                </APGroup>
                <AssignmentPicker
                  assignmentKey={Assignment.SIDE_BUTTONS}
                  size="small"
                />
              </>
            );
        }
      }}
    </AssignmentPanel>
  );
}
