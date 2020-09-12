import React, { useState } from "react";
import moment from "moment/min/moment-with-locales.js";
import "semantic-ui-css/semantic.min.css";
import { Button, Comment, Form } from "semantic-ui-react";
import isAuthenticated from "../lib/isAuthenticated";
import { AVATAR_DEFAULT } from "../lib/getUserAvatar";

const MemeCom = (com) => {
  // lo que recibe:
  // clickOnReply(idComment)
  // saveMemeComReply(idComment,texto)
  // error={error}
  const error = com.error;
  const comentario = com.comentario;
  const respuestas = comentario.respuestas;
  const respondiendo = com.respondiendo; // indica si está respondiendo este comentario
  const [reply, setReply] = useState(); // contiene la respuesta

  let fechaFormat;
  try {
    var utc = new Date();
    utc.setHours(utc.getHours() + 3);
    moment.locale("es");
    fechaFormat = moment(comentario.fecha, "YYYY-MM-DD HH:mm:ss").from(utc);
  } catch {
    fechaFormat = "Fecha incorrecta";
  }

  const enableReplyClick = () => {
    com.clickOnReply(comentario._id);
  };

  const handleChange = (event) => {
    setReply(event.target.value);
  };

  const handleClick = () => {
    com.saveMemeComReply(comentario._id, reply);
    setReply("");
  };
  return (
    <Comment>
      {/* <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" /> */}
      <Comment.Avatar
        src={comentario.avatar ? comentario.avatar : AVATAR_DEFAULT}
      />
      <Comment.Content>
        <Comment.Author as="span">{comentario.usuario}</Comment.Author>
        <Comment.Metadata>
          <div>{fechaFormat}</div>
        </Comment.Metadata>
        <Comment.Text>{comentario.descripcion}</Comment.Text>
        {isAuthenticated() && (
          <Comment.Actions>
            <Comment.Action
              onClick={enableReplyClick}
              active={respondiendo && !error}
            >
              Reply
            </Comment.Action>
          </Comment.Actions>
        )}
      </Comment.Content>
      <Comment.Group>
        {respuestas?.map((c, key) => {
          fechaFormat = moment(c.fecha, "YYYYMMDD HH:mm:ss").from(utc);
          return (
            <Comment key={key}>
              {/* <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" /> */}
              <Comment.Avatar src={c.avatar ? c.avatar : AVATAR_DEFAULT} />
              <Comment.Content>
                <Comment.Author as="span">{c.usuario}</Comment.Author>
                <Comment.Metadata>
                  <div>{fechaFormat}</div>
                </Comment.Metadata>
                <Comment.Text>{c.descripcion}</Comment.Text>
              </Comment.Content>
            </Comment>
          );
        })}
        {/* </Comment.Group> */}
        {error && respondiendo && (
          <div className="alert alert-warning alert-dismissable">
            <strong>¡Ups!</strong> {error}
          </div>
        )}
        {respondiendo && !error && (
          <Form reply>
            <Form.TextArea value={reply} onChange={handleChange} />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
              onClick={handleClick}
              disabled={!reply}
            />
          </Form>
        )}
      </Comment.Group>
    </Comment>
  );
};

export default MemeCom;
