import React, { useState } from "react";
import "./SwitchTabs.scss";
const SwitchTabs = ({ data, handleTab }) => {
  const [select, setSelect] = useState(0);
  //initial index selected is 0
  const [left, setLeft] = useState(0);
  const handleSwitch = (tab, index) => {
    setSelect(index);
    setTimeout(() => {
      setLeft(index * 100);
    }, 100);
    handleTab(tab);
  };
  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((item, index) => {
          return (
            <span
              key={index}
              className={`tabItem ${index === select ? "active" : null}`}
              onClick={() => {
                handleSwitch(item, index);
              }}
            >
              {item}
            </span>
          );
        })}
        <span className="movingBg" style={{ left }}></span>
      </div>
    </div>
  );
};

export default SwitchTabs;
