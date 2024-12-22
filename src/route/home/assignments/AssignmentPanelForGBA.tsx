import { Assignment } from "../../../assignments/Assignments";
import { MaterialPicker } from "../../../materials/MaterialPicker";
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
                  <MaterialPicker
                    assignmentKey={Assignment.SHELL}
                    size="large"
                  />
                  <Button type="secondary" onClick={() => setTab("shell")}>
                    Tweak shell
                  </Button>
                </APGroup>
                <APGroup>
                  <APRow>
                    <MaterialPicker assignmentKey={Assignment.ALL_BUTTONS} />
                    <MaterialPicker assignmentKey={Assignment.SIDE_BUTTONS} />
                  </APRow>
                  <Button type="secondary" onClick={() => setTab("face")}>
                    Tweak face
                  </Button>
                  <MaterialPicker assignmentKey={Assignment.LOWER_MEMBRANES} />
                </APGroup>
              </>
            );
          case "shell":
            return (
              <>
                <APRow>
                  <MaterialPicker assignmentKey={Assignment.FRONT_SHELL} />
                  <MaterialPicker assignmentKey={Assignment.BACK_SHELL} />
                </APRow>
                <MaterialPicker assignmentKey={Assignment.SHELL} size="small" />
              </>
            );
          case "face":
            return (
              <>
                <APGroup title={"Buttons"}>
                  <APRow>
                    <MaterialPicker assignmentKey={Assignment.BUTTON_A} />
                    <MaterialPicker assignmentKey={Assignment.BUTTON_B} />
                  </APRow>
                  <MaterialPicker assignmentKey={Assignment.DPAD} />
                  <MaterialPicker
                    assignmentKey={Assignment.FACE_BUTTONS}
                    size="small"
                  />
                </APGroup>
                <APGroup title={"Membranes"}>
                  <APRow>
                    <MaterialPicker assignmentKey={Assignment.MEMBRANE_AB} />
                    <MaterialPicker assignmentKey={Assignment.MEMBRANE_DPAD} />
                  </APRow>
                  <MaterialPicker
                    assignmentKey={Assignment.MEMBRANE_START_SELECT}
                  />
                  <MaterialPicker
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
                    <MaterialPicker assignmentKey={Assignment.SHOULDER_L} />
                    <MaterialPicker assignmentKey={Assignment.SHOULDER_R} />
                  </APRow>
                </APGroup>
                <APGroup title={"Rails"}>
                  <APRow>
                    <MaterialPicker assignmentKey={Assignment.RAIL_L} />
                    <MaterialPicker assignmentKey={Assignment.RAIL_R} />
                  </APRow>
                </APGroup>
                <MaterialPicker
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
