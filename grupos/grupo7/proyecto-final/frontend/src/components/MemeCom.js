import React from "react";
import moment from "moment/min/moment-with-locales.js";
import "./styles/memeComs.css";

function MemeCom({ comment }) {
  let fechaFormat;
  try {
    var utc = new Date();
    utc.setHours(utc.getHours() + 3);
    moment.locale("es");
    fechaFormat = moment(comment.fecha, "YYYYMMDD HH:mm:ss").from(utc);
  } catch {
    fechaFormat = "Fecha incorrecta";
  }

  return (
    <>
      <div className="row m-0 border-bottom py-2 ">
        <div className="col-12 divComTxt">{comment.descripcion}</div>
        <div className="col-12 divComUsr">
          <span>{comment.usuario}</span>
          <span className="text-secondary"> - {fechaFormat}</span>
        </div>
      </div>
    </>
  );
}

export default MemeCom;
