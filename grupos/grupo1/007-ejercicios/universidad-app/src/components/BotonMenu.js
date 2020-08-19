import React from 'react';
import { firstToUpperCase } from '../assets/js/Helpers';

//const firstToUpperCase = (word) => word[0].toUpperCase() + word.substring(1);

const BotonMenu = ({ nombre, id, setVistaActual }) => {
	return (
		<button
			id={id}
			className="btn btn-outline-info"
			onClick={() => setVistaActual(nombre)}
		>
			{firstToUpperCase(nombre)}
		</button>
	);
};

export default BotonMenu;
