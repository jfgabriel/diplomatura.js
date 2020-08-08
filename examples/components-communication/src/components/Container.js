import React from 'react';

export default function Container({ color, children }) {
  let colorClass = getColorClass(color);

  return <div className={`border ${colorClass} rounded`}>{children}</div>;
}

function getColorClass(color) {
  switch (color) {
    case 'red':
      return 'border-danger';
    case 'green':
      return 'border-success';
    case 'blue':
      return 'border-primary';
    case 'yellow':
      return 'border-warning';
    default:
      return 'border-dark';
  }
}
