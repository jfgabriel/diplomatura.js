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
          process.env.REACT_APP_API_URL + "memes/" + idMeme + "/comments",
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
          console.log(response);
          if (response.data.result) {
            setComs(coms.concat(response.data.comentario));
            setError("");
          } else {
            if (response.data.message?.includes("Usuario")) {
              setError("Para comentar debes iniciar sesión");
              logout();
            } else
              setError(
                "Error al guardar el comentario: " + response.data.message
              );
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.toString().includes("401")) {
            setError("Para comentar debes iniciar sesión");
            logout();
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
          process.env.REACT_APP_API_URL +
            "comentarios/" +
            idComment +
            "/replies",
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
          console.log(response);
          if (response.data.result) {
            setComs(
              coms.map((e) => {
                if (e._id === idComment) {
                  e.respuestas[e.respuestas.length] = {
                    descripcion: text,
                    fecha: response.data.hora,
                    usuario: isAuthenticated(),
                  };
                }
                return e;
              })
            );
            setError("");
            setidComentarioRespondiendo(idComment); // para desclickear el "reply"
          } else {
            if (response.data.message.includes("usuario")) {
              setError("Para comentar debes iniciar sesión");
              logout();
            } else
              setError(
                "Error al guardar el comentario: " + response.data.message
              );
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.toString().includes("401")) {
            setError("Para comentar debes iniciar sesión");
            logout();
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
        {coms?.map((c, key) => {
          return (
            <MemeCom
              comentario={c}
              saveMemeComReply={saveMemeComReply}
              clickOnReply={clickOnReply}
              respondiendo={c._id === idComentarioRespondiendo}
              error={error}
              key={key}
            />
          );
        })}
      </Comment.Group>
      {isAuthenticated() && !idComentarioRespondiendo && (
        <MemeComForm
          error={error}
          handleSaveComment={saveMemeCom}
          respondiendo={idComentarioRespondiendo}
        />
      )}
    </div>
  );
}

export default MemeComs;
