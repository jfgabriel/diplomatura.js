import React, { Component } from "react";
import Meme from "../components/Meme.js";
import "./styles/Home.css";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: props.userName,
            memes: [
                {
                    _id: 456654654,
                    titulo: "Meme loquito",
                    imagen:
                        "https://images7.memedroid.com/images/UPLOADED724/5b3628ba99ca0.jpeg",
                    categoria: "Informática",
                    usuario: "pepe@hotmail.com",
                    fecha: "2020-08-20",
                    cantVotosUp: 15,
                    cantVotosDown: 2,
                    cantComentarios: 3,
                },
                {
                    _id: 456654654,
                    titulo: "Cuarentena infinita",
                    imagen:
                        "https://www.generadormemes.com/media/created/xml8cflng4bvy9ghn83pat4pi7btiogq47siqnryw3298qurhuyz3erz3czxi09a.jpg.pagespeed.ic.imagenes-memes-fotos-frases-graciosas-chistosas-divertidas-risa-chida-espa%C3%B1ol-whatsapp-facebook.jpg",
                    categoria: "Sociedad",
                    usuario: "juan@hotmail.com",
                    fecha: "2020-07-20",
                    cantVotosUp: 3,
                    cantVotosDown: 100,
                    cantComentarios: 99,
                },
                {
                    _id: 456654654,
                    titulo: "Que alivio",
                    imagen:
                        "https://i.pinimg.com/originals/fb/ad/f4/fbadf4b74c67d3685b5a967e60899157.jpg",
                    categoria: "Escatologico",
                    usuario: "pop@gmail.com",
                    fecha: "2020-07-20",
                    cantVotosUp: 3448,
                    cantVotosDown: 1,
                    cantComentarios: 54654,
                },
                {
                    _id: 456654654,
                    titulo: "Que hacen esas manitas",
                    imagen:
                        "https://statics.memondo.com/p/s1/ccs/2018/05/CC_2691829_990f3fc391c74284b05c0f5cedf5fb13_meme_otros_y_esta_es_mi_mejor_tecnica.jpg?cb=142181",
                    categoria: "Amor",
                    usuario: "pop@gmail.com",
                    fecha: "2020-07-20",
                    cantVotosUp: 44,
                    cantVotosDown: 1,
                    cantComentarios: 54654,
                },
            ],
        };
    }

    render() {
        return (
            <div className="Home">
                <div className="container">
                    <div class="row">
                        <div class="col-xs-12 col-md-10">
                            {/* <div className="container p-2">
                </div> */}
                            {this.state.memes.map((m) => (
                                <Meme meme={m}></Meme>
                            ))}
                        </div>
                        <div class="col-md-2 d-none d-md-block">
                            <ul>
                                <li>Categoria 1</li>
                                <li>Categoria 2</li>
                                <li>Categoria 3</li>
                                <li>Categoria 4</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
