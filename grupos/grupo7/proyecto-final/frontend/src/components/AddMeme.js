import React, { useState } from "react";
import ImageUploading from "react-images-uploading";

const maxNumber = 10;
const maxMbFileSize = 5 * 1024 * 1024; // 5Mb

function AddMeme({ categorias, handleSave }) {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [images, setImages] = useState([]);
  const [imagen, setImagen] = useState(null);

  const handleGuardarOnClick = () => {
    const meme = { titulo, categoria, imagen };
    console.log(meme);
    // handleSave(meme);
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
    const formData = new FormData();
    imageList.forEach((file, i) => {
      formData.append(i, file);
      console.log(i, file);
    });
    setImagen(formData);
  };
  const onImageError = (errors, files) => {
    console.log(errors, files);
  };

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
              <button onClick={onImageUpload} {...dragProps}>
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
                <button onClick={() => onImageUpdate(index)}>Actualizar</button>
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
            <button type="submit" onClick={handleGuardarOnClick}>
              Guardar
            </button>
          </div>
        </div>
      )}
    </ImageUploading>
  );
}

export default AddMeme;
