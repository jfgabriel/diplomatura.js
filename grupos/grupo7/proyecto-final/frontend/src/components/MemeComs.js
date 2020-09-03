import React, { useState } from "react";
import MemeCom from "./MemeCom";
import axios from "axios";
import MemeComForm from "./MemeComForm";
import isAuthenticated from "../lib/isAuthenticated";
import logout from "../lib/logout";

function MemeComs({ meme }) {
  const [idMeme, setIdMeme] = useState(meme._id);
  const [coms, setComs] = useState(meme.comentarios);
  const [user, setUser] = useState(isAuthenticated());
  const [error, setError] = useState("");

  const saveMemeCom = async (text) => {
    setUser(isAuthenticated());
    if (user) {
      const token = localStorage.getItem("mymemejs_jwt");
      axios
        .post(
          "http://localhost:8000/memes/" + idMeme + "/comments",
          {
            // los datos del comentario que voy a guardar
            usuario: user,
            descripcion: text,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((response) => {
          setComs(coms.concat(response.data));
        })
        .catch((error) => {
          if (error?.toString()?.includes("401")) {
            logout();
            setError("Necesitamos que vuelvas a iniciar tu sesión");
          } else setError("Error al guardar el comentario: " + error);
        });
    } else {
      setError("Error al guardar el comentario: " + error);
      logout();
    }
  };

  return (
    <div className="card">
      <div className="container p-0 m-0">
        {coms.map((c, key) => (
          <MemeCom comment={c} key={key} />
        ))}
      </div>
      {error && (
        <div class="alert alert-warning alert-dismissable">
          <strong>¡Ups!</strong> {error}{" "}
        </div>
      )}
      {<MemeComForm error={error} handleSaveComment={saveMemeCom} />}
    </div>
  );
}

export default MemeComs;
