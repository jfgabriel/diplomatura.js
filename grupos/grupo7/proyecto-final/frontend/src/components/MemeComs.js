import React, { useState } from "react";
import MemeCom from "./MemeCom";
import axios from "axios";
//import MemeCom2 from "./MemeComOpcion2";
import MemeComForm from "./MemeComForm";
import isAuthenticated from "../lib/isAuthenticated";

function MemeComs({ meme }) {
  console.log("meme: " + meme);
  const [idMeme, setIdMeme] = useState(meme._id);
  const [coms, setComs] = useState(meme.comentarios);
  const [user, setUser] = useState(isAuthenticated());
  const [error, setError] = useState("");

  const saveMemeCom = async (text) => {
    // Verifico que siga logueado
    //const user = isAuthenticated();
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
          console.log(response.data);
          setComs(coms.concat(response.data));
          /* if (response.data.voto === "ok") {
              const memeInc = this.state.meme;
              if (tipo === TIPO_UPVOTE) {
                memeInc.cantVotosUp += 1;
              } else {
                memeInc.cantVotosDown += 1;
              }
              this.setState({
                votando: false,
                meme: memeInc,
              });
            } else {
              this.setState({
                votando: false,
                votandoError: "Error guardando el voto!",
              });
            } */
        })
        .catch((error) => {
          console.log("error al comentar: " + error);
          setError("Error al guardar el comentario: " + error);
          /*  this.setState({
              votando: false,
              votandoError: "Error al guardar el comentario!",
            }); */
        });
    } /* else {
        this.setState({ redirectLogin: true });
      } */

    //

    /* const newComs = coms.concat({
      id: 4,
      author: user,
      comment: text,
    });
    setComs(newComs);
    console.log(meme.coms); */
  };

  return (
    <div>
      {error && (
        <div class="alert alert-warning alert-dismissable">
          <button type="button" class="close" data-dismiss="alert">
            &times;
          </button>
          <strong>¡Ups!</strong> {error}
        </div>
      )}
      <div className="container p-3 my-3 border">
        {coms.map((c) => (
          <MemeCom comment={c} /> //id={c.id} author={c.author} comment={c.comment} />
        ))}
      </div>
      {isAuthenticated() && <MemeComForm handleSaveComment={saveMemeCom} />}
    </div>
  );
}

export default MemeComs;
