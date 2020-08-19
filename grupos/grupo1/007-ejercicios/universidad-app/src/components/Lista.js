import React, { Component } from 'react';
import Elemento from './ElementoLista';
import AddElemento from './AddElemento';

export default class Lista extends Component {
	constructor(props) {
		super(props);
		this.state = { elementos: props.elementos, vistaActual: props.vistaActual };
	}
	componentDidUpdate(prev_props, prev_state) {
		if (prev_props.vistaActual !== this.props.vistaActual) {
			this.setState({
				elementos: this.props.elementos,
				vistaActual: this.props.vistaActual,
			});
		}
	}
	add = (elem) => {
		const { elementos, ...rest } = elem;
		const newElement = Object.assign(
			{ id: this.state.elementos.length + 1 },
			rest
		);

		this.setState({ elementos: this.state.elementos.concat(newElement) });
	};
	destroy = (i) => {
		const index = this.state.elementos.findIndex((elem, index) => index === i);
		if (index > -1) {
			const elementos = this.state.elementos;
			elementos.splice(index, 1);
			this.setState({ elementos });
		}
	};
	render() {
		return (
			<>
				<AddElemento
					addHandler={this.add}
					elementos={this.state.elementos}
					vistaActual={this.state.vistaActual}
				/>
				{this.state.elementos.map((elem, index) => (
					<div className="list-group-item" key={index}>
						<Elemento
							elementos={Object.values(elem)}
							borrar={this.destroy}
							ver={(id) =>
								this.props.setVistaActual(this.state.vistaActual, id)
							}
							index={index}
							vistaActual={this.state.vistaActual}
						/>
					</div>
				))}
			</>
		);
	}
}
