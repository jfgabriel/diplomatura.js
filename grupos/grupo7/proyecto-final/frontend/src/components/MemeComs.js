import React, { useState } from "react";
import MemeCom from "./MemeCom";
//import MemeCom2 from "./MemeComOpcion2";
import MemeComForm from "./MemeComForm";

function MemeComs({ userName, comments }) {
  const [coms, setComments] = useState(comments);
  const [user, setUser] = useState(userName);

  const saveMemeCom = (text) => {
    const newComs = coms.concat({
      id: 4,
      author: user,
      comment: text,
    });
    setComments(newComs);
    console.log(coms);
  };

  return (
    <div>
      <div className="container p-3 my-3 border">
        {coms.map((c) => (
          <MemeCom comment={c} /> //id={c.id} author={c.author} comment={c.comment} />
        ))}
      </div>
      <MemeComForm handleSaveComment={saveMemeCom} />
    </div>
  );
}

export default MemeComs;
