import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const MostrarAgenda = ({ agendas }) => {
    if (!agendas) return <Spinner />

    return (
        <div className="row">
            <div className="col-md-6 mb-4">
                <Link to="/agenda" className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i> Regresar a listado
                </Link>
            </div>
            <div className="col-md-6">
                <Link to={`/agenda/editar/${agendas.id}`} className="btn btn-primary float-right">
                    <i className="fas fa-pencil-alt"></i> Editar agenda
                </Link>
            </div>

            <hr className="mx-5 w-100" />

            <div className="col-12">
                <h2 className="mb-4">
                    {agendas.nombre}
                </h2>
                <p>
                    <span className="font-weight-bold">
                        Descripción:
                    </span>{' '}
                    {agendas.descripcion}
                </p>
                <p>
                    <span className="font-weight-bold">
                        Dia:
                    </span>{' '}
                    {agendas.dia}
                </p>
                <p>
                    <span className="font-weight-bold">
                        Mes:
                    </span>{' '}
                    {agendas.mes}
                </p>
                <p>
                    <span className="font-weight-bold">
                        Nota:
                    </span>{' '}
                    {agendas.nota}
                </p>
            </div>
        </div>
    );
}

MostrarAgenda.propTypes = {
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
)(MostrarAgenda)
