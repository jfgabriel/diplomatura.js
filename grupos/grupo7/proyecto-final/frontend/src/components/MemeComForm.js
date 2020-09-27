import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Form } from "semantic-ui-react";

function MemeComForm({ error, handleSaveComment, respondiendo }) {
  const [comment, setComment] = useState("");

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSave = (event) => {
    handleSaveComment(comment);
    setComment("");
  };

  return (
    <>
      {error && !respondiendo && (
        <div className="alert alert-warning alert-dismissable">
          <strong>¡Ups!</strong> {error}
        </div>
      )}
      <Form reply>
        <Form.TextArea
          onChange={handleChange}
          value={comment}
          disabled={error !== ""}
        />
        <Button
          content="Add Comment"
          labelPosition="left"
          icon="edit"
          primary
          disabled={!comment}
          onClick={handleSave}
        />
      </Form>
    </>
  );
}

export default MemeComForm;
