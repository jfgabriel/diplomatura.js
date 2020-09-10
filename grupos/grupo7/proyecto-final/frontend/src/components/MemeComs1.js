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
  //const [idMeme, setIdMeme] = useState(meme._id);
  const [coms, setComs] = useState(meme.comentarios);
  const [user, setUser] = useState(isAuthenticated());
  const [error, setError] = useState("");

  const clickOnReply = (valor) => {
    // si vuelve a clickear sobre el mismo reply, se oculta el form
    if (valor === idComentarioRespondiendo) setidComentarioRespondiendo("");
    else setidComentarioRespondiendo(valor);
  };

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
          console.log("Acáaaaaaaaaaaaaaaa");
          console.log(response.data);
          if (response.data) {
            setComs(coms.concat(response.data));
            setError("");
          } else {
            if (response.message?.includes("Usuario")) {
              setError("Para comentar debes iniciar sesión");
              logout();
            } else setError("Error al guardar el comentario: " + error);
          }
        })
        .catch((error) => {
          setError("Error al guardar el comentario: " + error);
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
          "http://localhost:8000/comentarios/" + idComment + "/replies",
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
          if (response.data) {
            console.log("Guardando una respuesta");
            console.log(response);
            setComs(
              coms.map((e) => {
                console.log("recorriendo los comentarios");
                console.log(e);
                return e._id === idComment
                  ? (e.respuestas[e.respuestas.length] = {
                      descripcion: text,
                      fecha: Date.now(),
                      usuario: isAuthenticated(),
                    })
                  : e;
              })
            );
            console.log(coms);
            window.location.reload(false);
            setError("");
          } else {
            if (response.message?.includes("usuario")) {
              setError("Para comentar debes iniciar sesión");
              logout();
            } else setError("Error al guardar el comentario: " + error);
          }
        })
        .catch((error) => {
          setError("catch:Error al guardar el comentario: " + error);
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
          return (
            <MemeCom
              comentario={c}
              saveMemeComReply={saveMemeComReply}
              clickOnReply={clickOnReply}
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
