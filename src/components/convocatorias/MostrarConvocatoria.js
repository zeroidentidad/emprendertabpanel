import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const MostrarConvocatoria = ({ convocatoria }) => {
    if (!convocatoria) return <Spinner />

    return (
        <div className="row">
            <div className="col-md-6 mb-4">
                <Link to="/" className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i> Regresar a listado
                </Link>
            </div>
            <div className="col-md-6">
                <Link to={`/convocatorias/editar/${convocatoria.id}`} className="btn btn-primary float-right">
                    <i className="fas fa-pencil-alt"></i> Editar convocatoria
                </Link>
            </div>

            <hr className="mx-5 w-100" />

            <div className="col-12">
                <h2 className="mb-4">
                    {convocatoria.nombre}
                </h2>
                <p>
                    <span className="font-weight-bold">
                        Descripción:
                    </span>{' '} 
                    {convocatoria.descripcion}
                </p>
                <p>
                    <span className="font-weight-bold">
                        Dia:
                    </span>{' '} 
                    {convocatoria.dia}
                </p>
                <p>
                    <span className="font-weight-bold">
                        Mes:
                    </span>{' '}
                    {convocatoria.mes}
                </p>
                <p>
                    <span className="font-weight-bold">
                        Nota:
                    </span>{' '}
                    {convocatoria.nota}
                </p>                                
            </div>
        </div>
    );
}

MostrarConvocatoria.propTypes = {
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
)(MostrarConvocatoria)
