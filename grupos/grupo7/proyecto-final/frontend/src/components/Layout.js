import React, { useState } from "react";
import Navbar from "./Navbar";
import Logout from "./Logout";
import "../pages/styles/Home.css";

function Layout(props) {
  const children = props.children;
  const [show, setShow] = useState(false);

  return (
    <React.Fragment>
      <Navbar setShow={setShow} />
      <div className="Home">
        <div className="container p-0">{children}</div>
      </div>
      <Logout show={show} setShow={setShow} />
    </React.Fragment>
  );
}

export default Layout;
