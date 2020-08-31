import React, { useState } from "react";
import MemeCom from "./MemeCom";
//import MemeCom2 from "./MemeComOpcion2";
import MemeComForm from "./MemeComForm";

function MemeComs({ userName }) {
  const [coms, setComments] = useState([
    {
      id: 1,
      author: "Jacinto",
      date: "30/08/2020 17:00",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et tincidunt nisl, vitae lacinia augue",
    },
    {
      id: 2,
      author: "Pablito",
      date: "30/08/2020 17:00",
      comment: "Nulla efficitur sodales porttitor",
    },
    {
      id: 3,
      author: "Laura",
      date: "30/08/2020 17:00",
      comment: "Phasellus ultrices scelerisque risus ac vestibulum",
    },
  ]);
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
