import React from "react";
import Navbar from "./Navbar";
import "../pages/styles/Home.css";
function Layout(props) {
  const children = props.children;

  return (
    <React.Fragment>
      <Navbar />
      <div className="Home">
        <div className="container p-0">{children}</div>
      </div>
    </React.Fragment>
  );
}

export default Layout;
