import { Assignment } from "../../../assignments/Assignments";
import {
  AssignmentPanel,
  APGroup,
  APPicker,
  APRow,
} from "./ui/AssignmentPanel";

const SECTIONS = {
  base: "Base",
  shell: "Shell",
  face: "Face",
  sides: "Side",
};

export default function AssignmentPanelForGBA() {
  return (
    <AssignmentPanel tabs={SECTIONS}>
      {(tab) => {
        switch (tab) {
          case "base":
            return (
              <>
                <APPicker assignmentKey={Assignment.SHELL} />
                <APPicker assignmentKey={Assignment.ALL_BUTTONS} />
                <APPicker assignmentKey={Assignment.LOWER_MEMBRANES} />
              </>
            );
          case "shell":
            return (
              <>
                <APPicker assignmentKey={Assignment.SHELL} />
                <APRow>
                  <APPicker assignmentKey={Assignment.FRONT_SHELL} />
                  <APPicker assignmentKey={Assignment.BACK_SHELL} />
                </APRow>
              </>
            );
          case "face":
            return (
              <>
                <APGroup title={"Buttons"}>
                  <APPicker assignmentKey={Assignment.FACE_BUTTONS} />
                  <APPicker assignmentKey={Assignment.DPAD} />
                  <APRow>
                    <APPicker assignmentKey={Assignment.BUTTON_A} />
                    <APPicker assignmentKey={Assignment.BUTTON_B} />
                  </APRow>
                </APGroup>
                <APGroup title={"Membranes"}>
                  <APPicker assignmentKey={Assignment.LOWER_MEMBRANES} />
                  <APRow>
                    <APPicker assignmentKey={Assignment.MEMBRANE_AB} />
                    <APPicker assignmentKey={Assignment.MEMBRANE_DPAD} />
                  </APRow>
                  <APPicker assignmentKey={Assignment.MEMBRANE_START_SELECT} />
                </APGroup>
              </>
            );
          case "sides":
            return (
              <>
                <APGroup title={"Sides"}>
                  <APPicker assignmentKey={Assignment.SIDE_BUTTONS} />
                  <APRow>
                    <APPicker assignmentKey={Assignment.SHOULDER_L} />
                    <APPicker assignmentKey={Assignment.SHOULDER_R} />
                  </APRow>
                </APGroup>
                <APGroup title={"Rails"}>
                  <APRow>
                    <APPicker assignmentKey={Assignment.RAIL_L} />
                    <APPicker assignmentKey={Assignment.RAIL_R} />
                  </APRow>
                </APGroup>
              </>
            );
        }
      }}
    </AssignmentPanel>
  );
}
