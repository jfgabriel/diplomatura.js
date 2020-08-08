import React from 'react';

export default function PropsChildren({ name, data, img }) {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={img} className="card-img-top" alt={name + 'image'} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{data?.mensaje}</p>
      </div>
    </div>
  );
}
