import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import ImageUploading from "react-images-uploading";
import isAuthenticated from "../lib/isAuthenticated";

const maxNumber = 10;
const maxMbFileSize = 5 * 1024 * 1024; // 5Mb

function AddMeme(usuario) {
  const [memeGuardado, setMemeGuardado] = useState(false);
  const [mensaje, setMensaje] = useState("");
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
          setMensaje("Problema cargando las categorias");
        }
      })
      .catch((e) => {
        setMensaje("Problema cargando las categorias");
      });
  };

  const handleGuardarOnClick = () => {
    if (!titulo) {
      setMensaje("Ingrese el titulo del meme");
      return false;
    }
    if (!imagen) {
      setMensaje("Seleccione una imagen Meme");
      return false;
    }

    if (mensaje === "") {
      const data = new FormData();
      data.append("titulo", titulo);
      data.append("categoria", categoria);
      data.append("usuario", loggedin);
      data.append("uploadFile", imagen);

      const token = localStorage.getItem("mymemejs_jwt");

      axios
        .post("http://localhost:8000/memes", data, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data._id) {
            setMemeGuardado(true);
          } else {
            setMensaje(
              "UPS! Ocurrió un problema guardando su meme. Por favor intente en unos minutos..."
            );
          }
        })
        .catch((err) =>
          setMensaje(
            "UPS! Ocurrió un problema guardando su meme. Por favor intente en unos minutos..."
          )
        );
    }
  };

  const handleTituloChange = (e) => {
    setTitulo(e.target.value);
    //console.log(titulo);
  };

  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value);
    //console.log(categoria);
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
  };

  const onImageError = (errors, files) => {
    setMensaje("Error subiendo la imagen");
  };

  // const onImageRemove = (index) => {
  //   setImagen("");
  // };

  if (memeGuardado) {
    return <Redirect to="/login"></Redirect>;
  }

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
            {mensaje !== "" && (
              <div
                className="alert alert-warning alert-dismissible"
                role="alert"
              >
                {mensaje}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="txtTitulo">Titulo</label>
              <input
                id="txtTitulo"
                type="text"
                name="titulo"
                maxLength="100"
                value={titulo}
                onChange={handleTituloChange}
                className={"form-control" + (titulo ? "" : " is-invalid")}
              />
              <div className="invalid-feedback">Ingrese un titulo!</div>
            </div>
            <div className="form-group">
              <label htmlFor="lstCategoria">Categoria</label>
              <select
                name="categorias"
                className="form-control"
                value={categoria}
                onChange={handleCategoriaChange}
              >
                {categorias.map((cat) => (
                  <option key={cat._id} value={cat.nombre}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="lstCategoria">Meme</label>
              {imageList.length === 0 && (
                <>
                  <br />
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Buscar Meme
                  </button>
                </>
              )}

              {imageList.map((image, index) => (
                <div key={index}>
                  <div>
                    <img src={image.data_url} alt="" width="200" />
                  </div>
                  <div>
                    <button
                      className="btn btn-secondary mt-2 mr-3"
                      onClick={() => onImageUpdate(index)}
                    >
                      Cambiar
                    </button>
                    {/* <button
                      className="btn btn-danger mt-2"
                      onClick={() => onImageRemove(index)}
                    >
                      Borrar
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <button
                className="btn btn-primary mt-3"
                onClick={handleGuardarOnClick}
              >
                Guardar
              </button>
            </div>
            <p>{respuesta}</p>
          </div>
        )}
      </ImageUploading>
    );
  }
}

export default AddMeme;
