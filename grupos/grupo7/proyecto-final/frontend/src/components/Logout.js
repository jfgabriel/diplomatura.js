import React from "react";
import { Button, Modal } from "react-bootstrap";

import logout from "../lib/logout";

export default function LogoutModal({ show, setShow }) {
  const handleClose = () => {
    logout();
    window.location.reload(false);
  };

  const handleHide = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Esta seguro?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHide}>
            No
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Si
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
