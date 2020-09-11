import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Form } from "semantic-ui-react";

function MemeComForm({ error, handleSaveComment }) {
  const [comment, setComment] = useState("");

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSave = (event) => {
    handleSaveComment(comment);
    setComment("");
  };

  return (
    <Form reply>
      <Form.TextArea
        onChange={handleChange}
        value={comment}
        disabled={error !== ""}
      />
      <Button
        content="Add Reply"
        labelPosition="left"
        icon="edit"
        primary
        disabled={!comment}
        onClick={handleSave}
      />
    </Form>
  );
}

export default MemeComForm;
