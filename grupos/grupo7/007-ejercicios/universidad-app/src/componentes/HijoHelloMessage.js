import React from "react";

function mostrarAmigo(amigo) {
  return <li key={amigo.id}>{amigo.nombre}</li>;
}

function MostrarAmigos(props) {
  return <ul>{props.amigos.map((a) => mostrarAmigo(a))}</ul>;
}

export default MostrarAmigos;
