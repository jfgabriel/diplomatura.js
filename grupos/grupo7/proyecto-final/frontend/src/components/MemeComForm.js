import React, { useState } from "react";

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
    <div>
      <div>
        Nuevo comentario :
        <textarea
          onChange={handleChange}
          name="newComment"
          disabled={error}
          className="form-control"
          value={comment}
        ></textarea>
        <br />
      </div>
      <button
        className="btn btn-primary pull-right"
        type="submit"
        disabled={!comment}
        onClick={handleSave}
      >
        Publicar
      </button>
    </div>
  );
}

export default MemeComForm;
