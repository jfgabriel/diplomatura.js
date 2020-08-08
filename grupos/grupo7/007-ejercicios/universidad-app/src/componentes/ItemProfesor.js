import React from "react";

export default function ItemProfesor(props) {
  return (
    <tr>
      <th scope="row">{props.profesor.id}</th>
      <td>{props.profesor.nombre}</td>
    </tr>
  );
}
