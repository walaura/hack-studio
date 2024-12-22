import { ReactNode, useMemo, useState } from "react";
import { Assignment, AssignmentKey } from "../../../../assignments/Assignments";
import { MaterialPicker } from "../../../../materials/MaterialPicker";
import Flexbox from "../../../../ui/Flexbox";
import Text from "../../../../ui/Text";
import Tabs from "../../../../ui/Tabs";
import Margin from "../../../../ui/Margin";
import Divider from "../../../../ui/Divider";
import stylex from "@stylexjs/stylex";
import useAssignment from "../../../../assignments/useAssignment";

export function APRow({ children }: { children: ReactNode }) {
  return <div {...stylex.props(styles.row)}>{children}</div>;
}

export function APPicker({ assignmentKey }: { assignmentKey: AssignmentKey }) {
  return (
    <MaterialPicker
      surface={assignmentKey}
      assignedMaterial={useAssignment(assignmentKey)}
    />
  );
}

export function APGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Flexbox justify="start" direction="column" gap={4} xstyle={Margin.top20}>
      <Text type="headline2">{title}</Text>
      {children}
    </Flexbox>
  );
}

export function AssignmentPanel<Tabs extends { [key: string]: string }>({
  tabs,
  children,
}: {
  tabs: Tabs;
  children: (tab: keyof Tabs) => ReactNode;
}) {
  type TabsWithEditor = Tabs & { __all: string };
  const tabsWithEditor = { ...tabs, __all: "All" } as TabsWithEditor;

  const initial = Object.keys(tabs)[0] as keyof Tabs;
  const [activeTab, setActiveTab] = useState<keyof Tabs>(initial);

  const allAssignments = useMemo(
    () =>
      Object.keys(Assignment).map((assignment) => (
        <APPicker
          assignmentKey={assignment as AssignmentKey}
          key={assignment}
        />
      )),
    []
  );

  return (
    <>
      <Flexbox xstyle={Margin.all20} direction="row">
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabsWithEditor}
        />
      </Flexbox>
      <Divider />
      <Flexbox
        xstyle={styles.innie}
        direction="column"
        justify="start"
        key={String(activeTab)}
      >
        <Flexbox direction="column" gap={4}>
          {activeTab === "__all" ? allAssignments : children(activeTab)}
        </Flexbox>
      </Flexbox>
    </>
  );
}

const styles = stylex.create({
  innie: {
    height: "100%",
    width: "100%",
    padding: 20,
    overflow: "auto",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 4,
  },
});
