import React from "react";

// Centered content column with consistent side gutters.
const Layout = ({ children, className = "" }) => {
  return <div className={`mx-auto w-full max-w-6xl px-10 lg:px-8 sm:px-5 ${className}`}>{children}</div>;
};

export default Layout;
