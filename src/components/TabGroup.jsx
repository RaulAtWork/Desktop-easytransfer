import React, { Children, useState } from "react";

export default function TabGroup({ children }) {
  const [currentTab, setCurrentTab] = useState(0);
  const tabWidth = `${100 / Children.count(children)}%`

  return (
    <>
      <ul className="tab-group">
        {Children.toArray(children).map((tab, index) => (
          <li className="tab" style={{width:tabWidth}} key={tab.props.name}>
            <button type="button" className={`${tab.props.labelColor} ${index === currentTab && "selected"}`} onClick={() => setCurrentTab(index)}>
              {tab.props.name}
            </button>
          </li>
        ))}
      </ul>
      {Children.toArray(children)[currentTab]}
    </>
  );
}

export function Tab({ name, labelColor, children }) {
  return <div>{children}</div>;
}
