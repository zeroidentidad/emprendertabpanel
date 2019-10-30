import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class NuevaAgenda extends Component {

    state = {
        nombre: '',
        descripcion: '',
        dia: '',
        mes: '',
        nota: ''
    }

    // extrae valores del input y los coloca en el state
    leerDato = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // Agrega un nueva agenda base de datos
    agregarAgenda = e => {
        e.preventDefault();

        // extraer los valores del state
        const nuevaAgenda = this.state;

        // extraer firestore e historial rutas de props
        const { firestore, history } = this.props

        //Guardarlo en la base de datos
        firestore.add({ collection: 'agenda' }, nuevaAgenda).then(() => history.push('/agenda'));
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12 mb-4">
                    <Link to="/agenda" className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> Regresar a listado
                </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-calendar"></i> Nueva agenda
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.agregarAgenda}>
                                <div className="form-group">
                                    <label><b>Nombre:</b></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        placeholder="Nombre agenda"
                                        required
                                        onChange={this.leerDato}
                                        value={this.state.nombre}
                                    />
                                </div>

                                <div className="form-group">
                                    <label><b>Descripción:</b></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="descripcion"
                                        placeholder="Descripcion agenda"
                                        required
                                        onChange={this.leerDato}
                                        value={this.state.descripcion}
                                    />
                                </div>

                                <div className="form-group">
                                    <label><b>Día:</b></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="dia"
                                        placeholder="Dia(s) agenda"
                                        required
                                        onChange={this.leerDato}
                                        value={this.state.dia}
                                    />
                                </div>

                                <div className="form-group">
                                    <label><b>Mes:</b></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="mes"
                                        placeholder="Mes agenda"
                                        required
                                        onChange={this.leerDato}
                                        value={this.state.mes}
                                    />
                                </div>

                                <div className="form-group">
                                    <label><b>Nota:</b></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nota"
                                        placeholder="Info extra"
                                        onChange={this.leerDato}
                                        value={this.state.nota}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Agregar"
                                    className="btn btn-success"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

NuevaAgenda.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(NuevaAgenda);