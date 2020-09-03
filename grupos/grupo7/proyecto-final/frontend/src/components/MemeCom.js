import React from "react";
import moment from "moment";

function MemeCom({ comment }) {
  return (
    <div>
      <div className="row">
        <h5 className="col-md-1">{comment.usuario}</h5>
        <p className="col-md-2 text-secondary">
          {moment(comment.fecha, "YYYY-MM-DD hh:mm:ss").fromNow()}
        </p>
      </div>
      {comment.descripcion}
    </div>
  );
}

export default MemeCom;
