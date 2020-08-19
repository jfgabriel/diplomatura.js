import React, { Component } from 'react';
import { firstToUpperCase } from '../assets/js/Helpers';

const NOT_SHOW_TOADD = ['id'];
export default class AddElemento extends Component {
	constructor(props) {
		super(props);
		this.state = {
			elementos: props.elementos,
			vistaActual: props.vistaActua,
			inputData: '',
		};
	}

	componentDidUpdate(prev_props, prev_state) {
		if (prev_props.vistaActual !== this.props.vistaActual) {
			this.setState({
				elementos: this.props.elementos,
				vistaActual: this.props.vistaActual,
			});
		}
	}
	onChange = (e) => {
		const key = e.target.id;
		const value = e.target.value;

		const elementoToAdd = {};
		elementoToAdd[key] = value;

		this.setState(elementoToAdd);
	};
	agregar = (e) => {
		this.props.addHandler(this.state);
		//limpiar campos
		Array.from(e.target.parentNode.children).forEach((elemento) => {
			if (elemento.tagName === 'input'.toUpperCase()) elemento.value = '';
		});
	};
	render() {
		const firstElement = this.state.elementos[0];
		const inputs = Object.keys(firstElement).filter(
			(elem) => !NOT_SHOW_TOADD.includes(elem)
		);
		for (var i = 0; i < inputs.length; i++) {
			const elem = inputs[i];
			inputs[i] = (
				<span key={i}>
					&nbsp;{firstToUpperCase(elem)}{' '}
					<input id={elem + this.state.vistaActual} onChange={this.onChange} />
				</span>
			);
		}

		return (
			<div>
				{inputs}
				<button onClick={this.agregar} className="btn btn-primary">
					Add
				</button>
			</div>
		);
	}
}
