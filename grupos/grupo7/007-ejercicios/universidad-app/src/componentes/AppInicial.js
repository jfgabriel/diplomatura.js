import React from "react";
import esquema from "../images/esquema.png";

export default function AppInicial(props) {
  return (
    <>
      <h1>Bienvenido al Sistema de Universidades</h1>
      <img src={esquema} alt="Esquema" />
    </>
  );
}
