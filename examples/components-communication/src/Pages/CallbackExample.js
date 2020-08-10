import React from 'react';

import Child from '../components/CallbackChild';

export default class CallbackExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      respuesta: '',
    };
  }
  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">Hijo llamando callback</h1>
        <p className="lead">Este componente es el padre</p>
        <hr className="my-4" />
        <p>
          El componente hijo llama al padre, a traves de un callback. Valor que
          envio el hijo: {this.state.respuesta}
        </p>
        <div className="row">
          <div className="col">
            <Child
              onCallback={({ respuesta }) => {
                this.setState({ respuesta });
              }}
            />
          </div>
          <div className="col">
            <Child
              onCallback={({ respuesta }) => {
                this.setState({ respuesta });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
