import { Assignment } from "../../../assignments/Assignments";
import { MaterialPicker } from "../../../materials/MaterialPicker";
import { AssignmentPanel, APGroup, APRow } from "./ui/AssignmentPanel";

const SECTIONS = {
  base: "Base",
  shell: "Shell",
  face: "Face",
  sides: "Side",
};

export default function AssignmentPanelForGBASP() {
  return (
    <AssignmentPanel tabs={SECTIONS}>
      {(tab) => {
        switch (tab) {
          case "base":
            return (
              <>
                <APGroup title={"Shell"}>
                  <MaterialPicker assignmentKey={Assignment.SHELL} />
                  <APRow>
                    <MaterialPicker assignmentKey={Assignment.FRONT_SHELL} />
                    <MaterialPicker assignmentKey={Assignment.BACK_SHELL} />
                  </APRow>
                </APGroup>
                <APGroup title={"Buttons"}>
                  <MaterialPicker assignmentKey={Assignment.ALL_BUTTONS} />
                  <APRow>
                    <MaterialPicker assignmentKey={Assignment.FACE_BUTTONS} />
                    <MaterialPicker assignmentKey={Assignment.SIDE_BUTTONS} />
                  </APRow>
                </APGroup>
                <APGroup title={"Membranes"}>
                  <MaterialPicker assignmentKey={Assignment.LOWER_MEMBRANES} />
                </APGroup>
              </>
            );
          case "face":
            return (
              <>
                <APGroup title={"Buttons"}>
                  <MaterialPicker assignmentKey={Assignment.FACE_BUTTONS} />
                  <MaterialPicker assignmentKey={Assignment.BUTTON_HOME} />
                  <MaterialPicker assignmentKey={Assignment.DPAD} />
                  <APRow>
                    <MaterialPicker assignmentKey={Assignment.BUTTON_A} />
                    <MaterialPicker assignmentKey={Assignment.BUTTON_B} />
                  </APRow>
                </APGroup>
                <APGroup title={"Membranes"}>
                  <MaterialPicker assignmentKey={Assignment.LOWER_MEMBRANES} />
                  <APRow>
                    <MaterialPicker assignmentKey={Assignment.MEMBRANE_AB} />
                    <MaterialPicker assignmentKey={Assignment.MEMBRANE_DPAD} />
                  </APRow>
                  <MaterialPicker
                    assignmentKey={Assignment.MEMBRANE_START_SELECT}
                  />
                </APGroup>
              </>
            );
          case "sides":
            return (
              <>
                <APGroup title={"Sides"}>
                  <MaterialPicker assignmentKey={Assignment.SIDE_BUTTONS} />
                  <APRow>
                    <MaterialPicker assignmentKey={Assignment.SHOULDER_L} />
                    <MaterialPicker assignmentKey={Assignment.SHOULDER_R} />
                  </APRow>
                  <APRow>
                    <MaterialPicker assignmentKey={Assignment.RAIL_L} />
                    <MaterialPicker assignmentKey={Assignment.RAIL_R} />
                  </APRow>
                </APGroup>
              </>
            );
        }
      }}
    </AssignmentPanel>
  );
}
