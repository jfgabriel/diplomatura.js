import axios from "axios";

export default class MemeService {
  static async getMemes(pagina, categoria) {
    if (!categoria) categoria = "";
    if (!pagina) pagina = 1;
    const options = {
      url: "http://localhost:8000/memes",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      params: {
        pagina,
        categoria,
      },
    };
    console.log(
      "GET Memes: pagina: " +
        options.params.pagina +
        " cat: " +
        options.params.categoria
    );
    try {
      const response = await axios(options);
      if (response.status === 200) {
        return {
          result: true,
          memes: response.data,
          paginas: response.data.length > 0 ? 100 : 0,
          mensaje: "",
        };
      } else {
        return {
          result: false,
          memes: [],
          paginas: 0,
          mensaje: "Error en API",
        };
      }
    } catch (error) {
      return {
        result: false,
        memes: [],
        paginas: 0,
        mensaje: "Error en API",
      };
    }
  }
}
