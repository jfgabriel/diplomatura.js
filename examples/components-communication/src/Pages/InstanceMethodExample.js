import React from 'react';

import Child from '../components/InstanceMethodChild';

export default class InstanceMethodExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      respuesta: '',
    };
  }
  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">Llamando metodos en el hijo</h1>
        <p className="lead">Este componente es el padre</p>
        <hr className="my-4" />
        <p>
          Llama a metodos en el hijo para comunicarse. Valor de ejecutar metodo
          del hijo:{this.state.respuesta}
        </p>
        <div className="row">
          <div className="col border border-primary">
            <Child
              ref={(foo) => {
                this.foo = foo;
              }}
            />
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    // Antes seteamos la referencia this.foo al hijo, al pasar la funcion ref, y que el hijo al crearse llama
    let respuesta = this.foo.myFunc();
    this.setState({ respuesta });
  }
}
