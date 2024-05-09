import React from "react";
import "./ContentWrapper.scss";
const ContentWrapper = ({ children }) => {
  // so that a common css is applied to each component(or content)
  return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;
