import React from 'react';

import Child from '../components/GlobalVariableChild';

export default class GlobalVariableExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      respuesta: '',
    };
  }
  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">Global Variable pattern</h1>
        <p className="lead">Este componente es el padre</p>
        <hr className="my-4" />
        <p>
          El componente hijo "setea" una variable global. Otros componentes
          pueden leerla.
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
