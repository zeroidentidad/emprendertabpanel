import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

class EditarConvocatoria extends Component {

    // crear los refs
    nombreInput = React.createRef();
    descripcionInput = React.createRef();
    diaInput = React.createRef();
    mesInput = React.createRef();
    notaInput = React.createRef();

    // Edita el convocatoria en la base de datos
    editarConvocatoria = e => {
        e.preventDefault();

        // crear el objeto que va a actualizar
        const convocatoriaActualizada = {
            nombre: this.nombreInput.current.value,
            descripcion: this.descripcionInput.current.value,
            dia: this.diaInput.current.value,
            mes: this.mesInput.current.value,
            nota: this.notaInput.current.value,
        }
        // extraer firestore, e history de props
        const { convocatoria, firestore, history } = this.props;

        // almacenar en base de datos con firestore
        firestore.update({
            collection: 'convocatorias',
            doc: convocatoria.id
        }, convocatoriaActualizada).then(history.push('/'));

    }

    render() {

        const { convocatoria } = this.props;

        if (!convocatoria) return <Spinner />

        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={'/'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> Regresar a listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-calendar"></i> Editar convocatoria
                    </h2>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.editarConvocatoria} >
                                <div className="form-group">
                                    <label><b>Nombre:</b></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        placeholder="Nombre convocatoria"
                                        required
                                        ref={this.nombreInput}
                                        defaultValue={convocatoria.nombre}
                                    />
                                </div>

                                <div className="form-group">
                                    <label><b>Descripcion:</b></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="descripcion"
                                        placeholder="Descripcion convocatoria"
                                        required
                                        ref={this.descripcionInput}
                                        defaultValue={convocatoria.descripcion}
                                    />
                                </div>

                                <div className="form-group">
                                    <label><b>Dia:</b></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="dia"
                                        placeholder="Dia(s) convocatoria"
                                        required
                                        ref={this.diaInput}
                                        defaultValue={convocatoria.dia}
                                    />
                                </div>

                                <div className="form-group">
                                    <label><b>Mes:</b></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="mes"
                                        placeholder="Mes convocatoria"
                                        required
                                        ref={this.mesInput}
                                        defaultValue={convocatoria.mes}
                                    />
                                </div>

                                <div className="form-group">
                                    <label><b>Nota:</b></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nota"
                                        placeholder="Notas convocatoria"
                                        required
                                        ref={this.notaInput}
                                        defaultValue={convocatoria.nota}
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

EditarConvocatoria.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        {
            collection: 'convocatorias',
            storeAs: 'convocatoria',
            doc: props.match.params.id
        }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        convocatoria: ordered.convocatoria && ordered.convocatoria[0]
    }))
)(EditarConvocatoria)