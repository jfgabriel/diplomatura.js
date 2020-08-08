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
        <h1 className="display-4">Observer pattern</h1>
        <p className="lead">Este componente es el padre</p>
        <hr className="my-4" />
        <p>
          El componente hijo "broadcastea" o dispara eventos. Otros componentes
          hijos se subscribem, o disparan el evento.
        </p>
        <div className="row">
          <div className="col border border-primary">
            <Child />
          </div>
          <div className="col border border-primary">
            <Child />
          </div>
          <div className="col border border-primary">
            <Child />
          </div>
          <div className="col border border-primary">
            <Child />
          </div>
        </div>
      </div>
    );
  }
}
