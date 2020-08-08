import React from 'react';

import Child from '../components/ObserverChild';

export default class ObserverExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      respuesta: '',
    };
  }
  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">Hijo llamando con event bubbling</h1>
        <p className="lead">Este componente es el padre</p>
        <hr className="my-4" />
        <p>
          El componente hijo "llama" al padre, a traves de un evento que sube
          por el arbol. Valor que envio el hijo: {this.state.respuesta}
        </p>
        <form
          onKeyUp={(e) => {
            this.setState({ respuesta: e.customData });
          }}
        >
          <div className="row">
            <div className="col border border-primary">
              <Child />
            </div>
            <div className="col border border-primary">
              <Child />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
