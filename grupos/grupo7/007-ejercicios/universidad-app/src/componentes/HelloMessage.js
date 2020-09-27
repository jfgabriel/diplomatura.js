import React from "react";
import MostrarAmigos from "./HijoHelloMessage";

class HelloMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edad: 1,
      amigos: [
        { id: 1, nombre: "javier" },
        { id: 2, nombre: "santiago" },
        { id: 3, nombre: "jeff" },
      ],
      inputNuevoAmigo: "",
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormChange(event) {
    this.setState({ inputNuevoAmigo: event.target.value });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const nuevoAmigo = {
      id: this.state.amigos.length + 1,
      nombre: this.state.inputNuevoAmigo,
    };
    const newState = { amigos: this.state.amigos, inputNuevoAmigo: "" };
    newState.amigos.push(nuevoAmigo);
    this.setState(newState);
  }

  pasoUnAnio() {
    const newState = { edad: this.state.edad + 1 };
    if (newState.edad % 5 === 0) {
      newState.amigos = [];
      for (let i = 0; i < this.state.amigos.length - 1; i++) {
        newState.amigos.push(this.state.amigos[i]);
      }
    }
    this.setState(newState);
  }

  mostrarAmigo(amigo) {
    return <li key={amigo.id}>{amigo.nombre}</li>;
  }

  mostrarAmigos() {
    return <ul>{this.state.amigos.map((a) => this.mostrarAmigo(a))}</ul>;
  }

  render() {
    let aniversario = "";
    if (this.state.edad % 10 === 0) {
      aniversario = <div>Que increible pasaron 10 años</div>;
    } else {
      aniversario = <div />;
    }

    return (
      <>
        <div>
          Hello {this.props.name}, Now you are {this.state.edad} years old
        </div>
        {aniversario}
        <div>
          <button onClick={this.pasoUnAnio.bind(this)}>Paso un año</button>
        </div>
        <div>
          <MostrarAmigos amigos={this.state.amigos} />
        </div>
        <div>
          <form onSubmit={this.handleFormSubmit}>
            <label>
              Nombre:
              <input
                type="text"
                value={this.state.inputNuevoAmigo}
                onChange={this.handleFormChange}
              />
            </label>
            <input type="submit" value="submit" />
          </form>
        </div>
      </>
    );
  }
}

export default HelloMessage;
