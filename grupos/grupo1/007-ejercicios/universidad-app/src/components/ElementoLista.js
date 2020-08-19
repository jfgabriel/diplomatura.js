import React from 'react';
import { Link } from 'react-router-dom';

export default function Elemento({
	elementos,
	index,
	ver,
	borrar,
	vistaActual,
}) {
	return (
		<Link to={`/${vistaActual}/${index}`}>
			<div key={index} onClick={() => ver(index)}>
				{elementos.map((elem, id) => (
					<span
						key={id}
						//onChange={(e) => this.setState(new Object(elem, e.target.value))}
					>
						{elem}
					</span>
				))}
				<button
					className="btn btn-outline-dark"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						borrar(index);
					}}
				>
					Delete
				</button>
			</div>
		</Link>
	);
}
