import React, { useState } from "react";
import MemeCom from "./MemeCom1";
import MemeComForm from "./MemeComForm1";
import axios from "axios";
import isAuthenticated from "../lib/isAuthenticated";
import logout from "../lib/logout";
import "./styles/memeComs.css";
import "semantic-ui-css/semantic.min.css";
import { Comment, Header } from "semantic-ui-react";

function MemeComs({ meme }) {
  const idMeme = meme._id;
  const [idComentarioRespondiendo, setidComentarioRespondiendo] = useState("");
  console.log("Respondiendo el comentario: " + idComentarioRespondiendo);
  //const [idMeme, setIdMeme] = useState(meme._id);
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
          setError("");
        })
        .catch((error) => {
          if (error?.toString()?.includes("401")) {
            logout();
            setError("Para comentar debes iniciar sesión");
          } else setError("Error al guardar el comentario: " + error);
        });
    } else {
      setError("Para comentar debes iniciar sesión");
      logout();
    }
  };

  const saveMemeComReply = async (idComment, text) => {
    setUser(isAuthenticated());
    if (user) {
      const token = localStorage.getItem("mymemejs_jwt");
      axios
        .post(
          "http://localhost:8000/comentarios/" + idComment,
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
          //let comentarioPpal = coms.filter((e) => {
          //  e._id === idComment;
          //});
          setComs(
            coms.map((e) => {
              return e._id === idComment ? e.concat(response.data) : e;
            })
          );
          setError("");
        })
        .catch((error) => {
          if (error?.toString()?.includes("401")) {
            logout();
            setError("Para comentar debes iniciar sesión");
          } else setError("Error al guardar el comentario: " + error);
        });
    } else {
      setError("Para comentar debes iniciar sesión");
      logout();
    }
  };

  return (
    <div className="bkg_coms">
      <Comment.Group>
        <Header as="h3" dividing>
          Comments
        </Header>
        {coms.map((c, key) => {
          console.log(c);
          return (
            <MemeCom
              comentario={c}
              saveMemeComReply={saveMemeComReply}
              setidComentarioRespondiendo={setidComentarioRespondiendo}
              respondiendo={c._id === idComentarioRespondiendo}
              key={key}
            />
          );
        })}
        {/* 
      {error && (
        <div className="alert alert-warning alert-dismissable">
          <strong>¡Ups!</strong> {error}
        </div>
      )}
      {isAuthenticated() && (
        <MemeComForm error={error} handleSaveComment={saveMemeCom} />
      )} */}
      </Comment.Group>
      {error && (
        <div className="alert alert-warning alert-dismissable">
          <strong>¡Ups!</strong> {error}
        </div>
      )}
      {isAuthenticated() && !idComentarioRespondiendo && (
        <MemeComForm error={error} handleSaveComment={saveMemeCom} />
      )}
    </div>
  );
}

export default MemeComs;
