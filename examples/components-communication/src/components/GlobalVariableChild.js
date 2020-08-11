import React from 'react';

export default class GlobalChild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mensaje: '',
    };
  }
  render() {
    return (
      <div className="border border-primary p-4">
        <h3>Global Variable Child</h3>
        <button
          onClick={() => {
            const mensaje = window.miVariable;
            this.setState({ mensaje });
          }}
        >
          Leer
        </button>
        <p>Recibido: [{this.state.mensaje}].</p>
        <p>Setea variable global.</p>
        <input
          onKeyUp={(e) => {
            console.log('KeyUp!');
            window.miVariable = e.target.value;
          }}
        />
      </div>
    );
  }
}
