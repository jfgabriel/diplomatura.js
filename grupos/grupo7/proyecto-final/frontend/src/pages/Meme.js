import React, { Component } from "react";
import { Meme } from "./componentes/Meme.js";
import "./styles/Home.css";

export default class MemePage extends Component {
    render() {
        return (
            <>
                <Meme
                    userName={this.props.userName}
                    meme={this.state.memes[0]}
                ></Meme>
                <MemeComs userName={this.props.userName}></MemeComs>
            </>
        );
    }
}
