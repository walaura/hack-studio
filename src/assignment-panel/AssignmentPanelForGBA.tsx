import { Assignment } from "../assignments/Assignments";
import {
  AssignmentPanel,
  APGroup,
  APPicker,
  APRow,
} from "./ui/AssignmentPanel";

const SECTIONS = {
  base: "Base",
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
                <APGroup title={"Shell"}>
                  <APPicker assignmentKey={Assignment.SHELL} />
                  <APRow>
                    <APPicker assignmentKey={Assignment.FRONT_SHELL} />
                    <APPicker assignmentKey={Assignment.BACK_SHELL} />
                  </APRow>
                </APGroup>
                <APGroup title={"Buttons"}>
                  <APPicker assignmentKey={Assignment.ALL_BUTTONS} />
                  <APRow>
                    <APPicker assignmentKey={Assignment.FACE_BUTTONS} />
                    <APPicker assignmentKey={Assignment.SIDE_BUTTONS} />
                  </APRow>
                </APGroup>
                <APGroup title={"Membranes"}>
                  <APPicker assignmentKey={Assignment.LOWER_MEMBRANES} />
                </APGroup>
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
