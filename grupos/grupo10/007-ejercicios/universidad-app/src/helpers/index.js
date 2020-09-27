export const helpers = {
  getElementoById: (id, tabla) => {
    return tabla.find((elemento) => elemento.id === id);
  },
  getLastId: (tabla) => {
    return tabla[tabla.length - 1].id;
  }
};
