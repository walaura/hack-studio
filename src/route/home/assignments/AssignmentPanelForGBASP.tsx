import { Assignment } from "../../../assignments/Assignments";
import { AssignmentPicker } from "../../../assignments/AssignmentPicker";
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
                  <AssignmentPicker assignmentKey={Assignment.SHELL} />
                  <APRow>
                    <AssignmentPicker assignmentKey={Assignment.FRONT_SHELL} />
                    <AssignmentPicker assignmentKey={Assignment.BACK_SHELL} />
                  </APRow>
                </APGroup>
                <APGroup title={"Buttons"}>
                  <AssignmentPicker assignmentKey={Assignment.ALL_BUTTONS} />
                  <APRow>
                    <AssignmentPicker assignmentKey={Assignment.FACE_BUTTONS} />
                    <AssignmentPicker assignmentKey={Assignment.SIDE_BUTTONS} />
                  </APRow>
                </APGroup>
                <APGroup title={"Membranes"}>
                  <AssignmentPicker
                    assignmentKey={Assignment.LOWER_MEMBRANES}
                  />
                </APGroup>
              </>
            );
          case "face":
            return (
              <>
                <APGroup title={"Buttons"}>
                  <AssignmentPicker assignmentKey={Assignment.FACE_BUTTONS} />
                  <AssignmentPicker assignmentKey={Assignment.BUTTON_HOME} />
                  <AssignmentPicker assignmentKey={Assignment.DPAD} />
                  <APRow>
                    <AssignmentPicker assignmentKey={Assignment.BUTTON_A} />
                    <AssignmentPicker assignmentKey={Assignment.BUTTON_B} />
                  </APRow>
                </APGroup>
                <APGroup title={"Membranes"}>
                  <AssignmentPicker
                    assignmentKey={Assignment.LOWER_MEMBRANES}
                  />
                  <APRow>
                    <AssignmentPicker assignmentKey={Assignment.MEMBRANE_AB} />
                    <AssignmentPicker
                      assignmentKey={Assignment.MEMBRANE_DPAD}
                    />
                  </APRow>
                  <AssignmentPicker
                    assignmentKey={Assignment.MEMBRANE_START_SELECT}
                  />
                </APGroup>
              </>
            );
          case "sides":
            return (
              <>
                <APGroup title={"Sides"}>
                  <AssignmentPicker assignmentKey={Assignment.SIDE_BUTTONS} />
                  <APRow>
                    <AssignmentPicker assignmentKey={Assignment.SHOULDER_L} />
                    <AssignmentPicker assignmentKey={Assignment.SHOULDER_R} />
                  </APRow>
                  <APRow>
                    <AssignmentPicker assignmentKey={Assignment.RAIL_L} />
                    <AssignmentPicker assignmentKey={Assignment.RAIL_R} />
                  </APRow>
                </APGroup>
              </>
            );
        }
      }}
    </AssignmentPanel>
  );
}
