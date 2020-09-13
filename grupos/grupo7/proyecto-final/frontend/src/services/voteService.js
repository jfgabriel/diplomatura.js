import axios from "axios";

const TIPO_UPVOTE = "upvote";
const TIPO_DOWNVOTE = "downvote";

export default class VoteService {
  static ultimoError;
  static async votar(meme, userName, votoActual, votoSolicitado) {
    // Veo si hay que borrar el voto actual
    if (votoActual) {
      //console.log("Elimianndo voto actual: " + votoActual);
      if (await this.deleteVoto(userName, meme._id)) {
        if (votoActual === TIPO_UPVOTE) {
          meme.cantVotosUp -= 1;
        } else if (votoActual === TIPO_DOWNVOTE) {
          meme.cantVotosDown -= 1;
        }
      } else {
        // Fallo la eliminacion
        return false;
      }
    }
    // Hago el post del voto
    if (votoSolicitado !== votoActual) {
      //console.log("Generando voto nuevo: " + votoSolicitado);
      if (await this.postVoto(userName, votoSolicitado, meme._id)) {
        if (votoSolicitado === TIPO_UPVOTE) {
          meme.cantVotosUp += 1;
        } else if (votoActual === TIPO_DOWNVOTE) {
          meme.cantVotosDown += 1;
        }
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

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
    const url =
      process.env.REACT_APP_API_URL + "memes/" + idMeme + "/vote/" + userName;
    const headers = { Authorization: "Bearer " + token };

    try {
      const response = await axios.delete(url, { headers });

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
