import React from 'react';

/**
 * InstanceMethodChild o Hijo con metodo de la instancia.
 */
export default class CallbackChild extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  render() {
    return (
      <div>
        <h3>Callback Child</h3>
        <p>El boton envia estado al padre.</p>
        <button
          onClick={() => {
            this.props.onCallback({
              respuesta: 'Clickeaste! ' + this.state.count,
            });
            this.setState({ count: this.state.count + 1 });
          }}
        >
          Click!
        </button>
      </div>
    );
  }
}
