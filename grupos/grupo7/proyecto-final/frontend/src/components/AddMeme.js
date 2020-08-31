import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import ImageUploading from "react-images-uploading";
import isAuthenticated from "../lib/isAuthenticated";

const maxNumber = 10;
const maxMbFileSize = 5 * 1024 * 1024; // 5Mb

function AddMeme({ categorias, usuario = "juan" }) {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [images, setImages] = useState([]);
  const [imagen, setImagen] = useState(null);
  const [respuesta, setRespuesta] = useState("");
  const [loggedin, setLoggedin] = useState(isAuthenticated());

  const handleGuardarOnClick = () => {
    const data = new FormData();
    data.append("titulo", titulo);
    data.append("categoria", categoria);
    data.append("usuario", usuario);
    data.append("uploadFile", imagen);

    for (var pair of data.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    // fetch("http://localhost:8000/memes", {
    //   method: "POST",
    //   body: data,
    // }).then(
    //   function (res) {
    //     if (res.ok) {
    //       alert("Perfect! ");
    //     } else if (res.status === 401) {
    //       alert("Oops! ");
    //     }
    //   },
    //   function (e) {
    //     alert("Error submitting form!");
    //   }
    // );
    // Cookie: connect.sid=s%3AKEejmNx7E6Iqtj2794v_MQ1mZyPQfmKY.jAmpseskYn7OEtdDqO0M4hwL1nR3xyDdO8Xu6F8%2FiDM
    //axios.defaults.withCredentials = true;
    const token = localStorage.getItem("mymemejs_jwt");
    axios
      .post("http://localhost:8000/memes", data, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data._id) {
          // se agrego correctamente

          alert("Meme agregado Correctamente");
          this.props.history.push("/");
          window.location.reload(false);
        }
      })
      .catch((err) => console.log(err.data));
  };

  const handleTituloChange = (e) => {
    setTitulo(e.target.value);
    console.log(titulo);
  };

  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value);
    console.log(categoria);
  };

  const onImageChange = (imageList, addUpdateIndex) => {
    setImages(imageList);

    //if (imageList.length > 0) formData.append("uploadFile", imageList.files[0]);
    let im = null;
    imageList.forEach((file, i) => {
      // formData.append("uploadFile", file);
      // console.log(i, file);
      im = file.file;
    });
    if (im) setImagen(im);
    console.log(im);
  };
  const onImageError = (errors, files) => {
    console.log(errors, files);
  };
  console.log(loggedin);
  if (!loggedin || loggedin === "") {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: "/addmeme" },
        }}
      />
    );
  } else {
    return (
      <ImageUploading
        value={images}
        onChange={onImageChange}
        maxNumber={maxNumber}
        maxFileSize={maxMbFileSize}
        // acceptType={["jpg", "gif", "png"]}
        onError={onImageError}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          dragProps,
        }) => (
          <div>
            <div>
              Titulo :
              <input
                type="text"
                name="titulo"
                value={titulo}
                onChange={handleTituloChange}
              />
            </div>
            {imageList.length === 0 && (
              <div>
                <button type="button" onClick={onImageUpload} {...dragProps}>
                  Buscar Imagen
                </button>
              </div>
            )}

            {imageList.map((image, index) => (
              <div key={index}>
                <div>
                  <img src={image.data_url} alt="" width="200" />
                </div>
                <div>
                  <button onClick={() => onImageUpdate(index)}>
                    Actualizar
                  </button>
                  <button onClick={() => onImageRemove(index)}>Borrar</button>
                </div>
              </div>
            ))}
            <div>
              Categoria :
              <select
                name="categotias"
                className="mdb-select md-form"
                value={categoria}
                onChange={handleCategoriaChange}
              >
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.nombre}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button onClick={handleGuardarOnClick}>Guardar</button>
            </div>
            <p>{respuesta}</p>
          </div>
        )}
      </ImageUploading>
    );
  }
}

export default AddMeme;
