import React from 'react';

/**
 * InstanceMethodChild o Hijo con metodo de la instancia.
 */
export default class InstanceMethodChild extends React.Component {
  myFunc() {
    return 'Hola mundo';
  }

  render() {
    return (
      <div>
        <h3>{this.myFunc()}</h3>
        <p>Instance method child.</p>
      </div>
    );
  }
}
