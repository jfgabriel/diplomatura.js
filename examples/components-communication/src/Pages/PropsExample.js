import React from 'react';

import PropsChildren from '../components/PropsChildren';

export default class PropsExample extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">Pasando Props</h1>
        <p className="lead">Este componente es el padre</p>
        <hr className="my-4" />
        <p>Utiliza props para comunicarse con sus hijos.</p>
        <div className="row">
          <div className="col">
            <PropsChildren
              name="Calavera"
              data={{
                mensaje: 'Booo!',
              }}
              img="http://files.softicons.com/download/holidays-icons/halloween-icons-by-arrioch/png/256/skull.png"
            />
          </div>
          <div className="col">
            <PropsChildren
              name="El perro"
              img="https://image.shutterstock.com/image-photo/image-450w-697992694.jpg"
            />
          </div>
          <div className="col">
            <PropsChildren
              name="El sapo Pepe"
              data={{
                mensaje: 'Le digo Pepe vení!, y el salta, salta.',
              }}
              img="https://hcommons.org/app/uploads/sites/1000648/2018/02/pepe-300x300.jpg"
            />
          </div>
        </div>
      </div>
    );
  }
}
