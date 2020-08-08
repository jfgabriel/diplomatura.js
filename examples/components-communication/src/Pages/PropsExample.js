import React from 'react';

import Container from '../components/Container';

export default class PropsExample extends React.Component {
  render() {
    const data = {
      mensaje: 'Hola!',
    };

    return (
      <Container>
        <h1>Parent component</h1>
        <div>
          <ChildrenComponent name="Componente hijo 1" data={data} />
        </div>
        <div>
          <ChildrenComponent name="Componente hijo 2" />
        </div>
      </Container>
    );
  }
}

function ChildrenComponent({ name, data }) {
  let extra = '';
  if (data) {
    extra = data.mensaje;
  }
  return (
    <Container>
      <h2>{name}</h2>
      <div>Im a child! {extra}</div>
    </Container>
  );
}
