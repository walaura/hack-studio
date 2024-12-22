import Button from "./Button";
import Flexbox from "./Flexbox";

export default function Tabs<Tabs extends { [key: string]: string }>({
  activeTab,
  setActiveTab,
  tabs,
}: {
  tabs: Tabs;
  activeTab: keyof Tabs;
  setActiveTab: (section: keyof Tabs) => void;
}) {
  return (
    <Flexbox direction="row" gap={4}>
      {Object.keys(tabs).map((tab) => (
        <Button
          size="small"
          type={tab === activeTab ? "activeTab" : "tab"}
          key={tab}
          onClick={() => setActiveTab(tab as keyof Tabs)}
        >
          {tabs[tab]}
        </Button>
      ))}
    </Flexbox>
  );
}
