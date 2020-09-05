import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

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
    <div className="container p-3 m-0">
      <div className="form-group">
        <label htmlFor="newComment">Nuevo comentario</label>

        <textarea
          onChange={handleChange}
          name="newComment"
          disabled={error}
          className="form-control"
          value={comment}
          maxLength="350"
        ></textarea>
      </div>
      <button
        className="btn btn-primary pull-right"
        type="submit"
        disabled={!comment}
        onClick={handleSave}
      >
        <FontAwesomeIcon icon={faEdit} className="mr-2" />
        Publicar
      </button>
    </div>
  );
}

export default MemeComForm;
