import React from 'react';
import './assets/css/App.css';
import datos from './datos';
import Lista from './components/Lista';
import BotonMenu from './components/BotonMenu';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from 'react-router-dom';
import { firstToUpperCase } from './assets/js/Helpers';

const TABLAS = ['alumnos', 'profesores', 'materias', 'calificaciones'];

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			vistaActual: 'alumnos',
			idDetalleSeleccionado: -1,
			alumnos: datos.alumnos,
			profesores: datos.profesores,
			materias: datos.materias,
			calificaciones: datos.calificaciones,
		};
	}
	/**
	 * Se utiliza para disparar el cambio de vista.
	 * Si viene un id seleccionado, se setea como el detalle actual.
	 * @param {*} vista
	 * @param {*} idSeleccionado
	 */
	setVistaActual(vista, idSeleccionado) {
		const newState = { vistaActual: vista };
		if (idSeleccionado > -1 && typeof idSeleccionado == 'number') {
			newState.idDetalleSeleccionado = idSeleccionado;
		} else {
			newState.idDetalleSeleccionado = -1;
		}
		this.setState(newState);
	}
	render() {
		return (
			<div className="App">
				<header className="alert alert-info">Diplomatura JS</header>
				<Router>
					<div id="botonera">
						{TABLAS.map((nombre, id) => (
							<Link key={nombre} to={`/${nombre}`}>
								<BotonMenu
									id={id}
									nombre={nombre}
									setVistaActual={(vista) => this.setVistaActual(vista)}
								/>
							</Link>
						))}
					</div>
					<div className="mainView">
						<Switch>
							{this.state.idDetalleSeleccionado === -1 ? (
								<Route
									path={`/${this.state.vistaActual}`}
									component={() => (
										<>
											<h2>{firstToUpperCase(this.state.vistaActual)}</h2>
											<Lista
												vistaActual={this.state.vistaActual}
												elementos={this.state[this.state.vistaActual]}
												setVistaActual={(vista, id) =>
													this.setVistaActual(vista, id)
												}
											/>
										</>
									)}
								/>
							) : (
								<Route
									path={`/${this.state.vistaActual}/:${this.state.idDetalleSeleccionado}`}
									component={(props) => {
										return (
											<p>
												{JSON.stringify(
													this.state[this.state.vistaActual][
														this.state.idDetalleSeleccionado
													]
												)}
											</p>
										);
									}}
								/>
							)}
							<Route path="/">
								<h1>Welcome to the supersistema</h1>
							</Route>
							<Redirect to="/" />
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
