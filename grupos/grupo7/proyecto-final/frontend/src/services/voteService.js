import axios from "axios";

export default class VoteService {
  static ultimoError;
  static async postVoto(userName, tipo, idMeme) {
    try {
      const token = localStorage.getItem("mymemejs_jwt");
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "memes/" + idMeme + "/vote",
        {
          usuario: userName,
          tipo,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      if (response.data.result) {
        return true;
      } else {
        this.ultimoError = response.data.message;
        return false;
      }
    } catch (error) {
      this.ultimoError = error;
      return false;
    }
  }

  static async deleteVoto(userName, idMeme) {
    const token = localStorage.getItem("mymemejs_jwt");
    const url = process.env.REACT_APP_API_URL + "memes/" + idMeme + "/vote";
    const headers = { Authorization: "Bearer " + token };
    const data = { usuario: userName };
    //console.log(data);

    try {
      const response = await axios.delete(url, { headers, data });
      if (response.data.result) {
        //console.log("voto eliminado");
        return true;
      } else {
        //console.log("voto NO eliminado: " + response.data.message);
        this.ultimoError = "Error eliminando el voto: " + response.data.message;
        return false;
      }
    } catch (error) {
      console.log("Error elimiando el voto: " + error);
      this.ultimoError = "Error eliminando el voto";
      return false;
    }

    // const deleteMethod = {
    //   method: "DELETE",
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    //   data: { usuario: userName },
    // };
    // console.log(data);

    // fetch(url, deleteMethod)
    //   .then((res) => res.json())
    //   .then((response) => {
    //     if (response.data.result) {
    //       console.log("voto eliminado");
    //       return true;
    //     } else {
    //       console.log("voto NO eliminado" + response.data.message);
    //       this.ultimoError = response.data.message;
    //       return false;
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("catch " + error);
    //     this.ultimoError = error;
    //     return false;
    //   });
  }
}
