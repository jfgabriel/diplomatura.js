import React from "react";

function MemeCom({ comment }) {
  return (
    <div>
      <div className="row">
        <h5 className="col-md-1">{comment.usuario} </h5>
        <p className="col-md-2 text-secondary">{comment.fecha.toString()}</p>
      </div>
      {comment.descripcion}
    </div>
  );
}

export default MemeCom;
