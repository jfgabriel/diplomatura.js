import React from 'react';

/**
 * InstanceMethodChild o Hijo con metodo de la instancia.
 */
export default class BubblingChild extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  render() {
    return (
      <div className="border border-primary">
        <h3>Bubbling Child</h3>
        <p>El boton envia estado al padre.</p>
        <input
          className="m-2 p-2"
          onKeyUp={(e) => {
            console.log('KeyUp!');
            e.customData = 'Mensaje Oculto:' + e.target.value;
          }}
        />
      </div>
    );
  }
}
