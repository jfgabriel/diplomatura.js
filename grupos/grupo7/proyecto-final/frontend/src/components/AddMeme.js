import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import ImageUploading from "react-images-uploading";
import isAuthenticated from "../lib/isAuthenticated";

const maxNumber = 10;
const maxMbFileSize = 5 * 1024 * 1024; // 5Mb

function AddMeme(usuario) {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [images, setImages] = useState([]);
  const [imagen, setImagen] = useState(null);
  const [respuesta, setRespuesta] = useState("");
  const [loggedin, setLoggedin] = useState(isAuthenticated());
  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = () => {
    const options = {
      url: "http://localhost:8000/categorias",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    axios(options)
      .then((response) => {
        if (response.status === 200) {
          setCategorias(response.data);
        } else {
          console.log(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleGuardarOnClick = () => {
    const data = new FormData();
    data.append("titulo", titulo);
    data.append("categoria", categoria);
    data.append("usuario", loggedin);
    data.append("uploadFile", imagen);

    for (var pair of data.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    const token = localStorage.getItem("mymemejs_jwt");
    axios
      .post("http://localhost:8000/memes", data, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data._id) {
          // se agrego correctamente

          // alert("Meme agregado Correctamente");
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
