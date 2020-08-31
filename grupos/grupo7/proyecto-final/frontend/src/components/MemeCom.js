import React from "react";

function MemeCom({ comment }) {
  return (
    <div>
      <div class="row">
        <h5 class="col-md-1">{comment.author} </h5>
        <p class="col-md-2 text-secondary">{comment.date?.toString()}</p>
      </div>
      {comment.comment}
    </div>
  );
}

export default MemeCom;
