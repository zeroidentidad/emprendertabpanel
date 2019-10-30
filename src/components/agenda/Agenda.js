import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Agenda = ({ agenda, firestore }) => {

    if (!agenda) return <Spinner />;

    // Eliminar agenda
    const eliminarAgenda = id => {
        // eliminar
        firestore.delete({
            collection: 'agenda',
            doc: id
        });//.then(() => history.push('/agenda'));
    }

    return (
        <div className="row">
            <div className="col-md-12 mb-4">
                <Link to={`/agenda/nuevo`} className="btn btn-primary">
                    <i className="fas fa-plus"></i> Nueva en agenda
                </Link>
            </div>
            <div className="col-md-8">
                <i className="fas fa-calendar"></i> Agenda
            </div>
            <table className="table table-striped mt-4 table-bordered">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Dia</th>
                        <th>Mes</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {agenda.map(agenda => (
                        <tr key={agenda.id}>
                            <td>{agenda.nombre}</td>
                            <td>{agenda.descripcion}</td>
                            <td>{agenda.dia}</td>
                            <td>{agenda.mes}</td>
                            <td>
                                <Link to={`/agenda/mostrar/${agenda.id}`}
                                    className="btn btn-success  btn-block"
                                >
                                <i className="fas fa-angle-double-right"></i> Más info...
                                </Link>

                                <button
                                    type="button"
                                    className="btn btn-danger btn-block"
                                    onClick={() => eliminarAgenda(agenda.id)}
                                >
                                <i className="fas fa-trash-alt"></i> Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

Agenda.propTypes = {
    firestore: PropTypes.object.isRequired,
    agenda: PropTypes.array
}

export default compose(
    firestoreConnect([{ collection: 'agenda' }]),
    connect((state, props) => ({
        agenda: state.firestore.ordered.agenda
    }))
)(Agenda)