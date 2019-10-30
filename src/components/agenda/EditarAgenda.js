import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

class EditarAgenda extends Component {

    // crear los refs
    nombreInput = React.createRef();
    descripcionInput = React.createRef();
    diaInput = React.createRef();
    mesInput = React.createRef();
    notaInput = React.createRef();

    // Edita el agenda en la base de datos
    editarAgenda = e => {
        e.preventDefault();

        // crear el objeto que va a actualizar
        const agendaActualizada = {
            nombre: this.nombreInput.current.value,
            descripcion: this.descripcionInput.current.value,
            dia: this.diaInput.current.value,
            mes: this.mesInput.current.value,
            nota: this.notaInput.current.value,
        }
        // extraer firestore, e history de props
        const { agendas, firestore, history } = this.props;

        // almacenar en base de datos con firestore
        firestore.update({
            collection: 'agenda',
            doc: agendas.id
        }, agendaActualizada).then(history.push('/agenda'));

    }

    render() {

        const { agendas } = this.props;

        if (!agendas) return <Spinner />

        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={'/agenda'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> Regresar a listado
                    </Link>
                </div>
                <div className="col-12">
                    <h3>
                        <i className="fas fa-calendar"></i> Editar agenda
                    </h3>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.editarAgenda} >
                                <div className="form-group">
                                    <label><b>Nombre:</b></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        placeholder="Nombre agenda"
                                        required
                                        ref={this.nombreInput}
                                        defaultValue={agendas.nombre}
                                    />
                                </div>

                                <div className="form-group">
                                    <label><b>Descripcion:</b></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="descripcion"
                                        placeholder="Descripcion agenda"
                                        required
                                        ref={this.descripcionInput}
                                        defaultValue={agendas.descripcion}
                                    />
                                </div>

                                <div className="form-group">
                                    <label><b>Dia:</b></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="dia"
                                        placeholder="Dia(s) agenda"
                                        required
                                        ref={this.diaInput}
                                        defaultValue={agendas.dia}
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
                                        ref={this.mesInput}
                                        defaultValue={agendas.mes}
                                    />
                                </div>

                                <div className="form-group">
                                    <label><b>Nota:</b></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nota"
                                        placeholder="Info extra"
                                        ref={this.notaInput}
                                        defaultValue={agendas.nota}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value="Editar"
                                    className="btn btn-success"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EditarAgenda.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        {
            collection: 'agenda',
            storeAs: 'agendas',
            doc: props.match.params.id
        }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        agendas: ordered.agendas && ordered.agendas[0]
    }))
)(EditarAgenda)