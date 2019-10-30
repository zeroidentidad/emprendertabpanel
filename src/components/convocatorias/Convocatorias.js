import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Convocatorias = ({convocatorias, firestore}) => {

    if (!convocatorias) return <Spinner/>;

    // Eliminar convocatorias
    const eliminarConvocatoria = id => {
        // eliminar
        firestore.delete({
            collection: 'convocatorias',
            doc: id
        });//.then(() => history.push('/'));
    }    

    return (
        <div className="row">
            <div className="col-md-12 mb-4">
                <Link to={`/convocatorias/nuevo`} className="btn btn-primary">
                    <i className="fas fa-plus"></i> Nueva convocatoria
                </Link>
            </div>
            <div className="col-md-8">
                <i className="fas fa-calendar"></i> Convocatorias
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
                    {convocatorias.map(convocatoria => (
                        <tr key={convocatoria.id}>
                            <td>{convocatoria.nombre}</td>
                            <td>{convocatoria.descripcion}</td>
                            <td>{convocatoria.dia}</td>
                            <td>{convocatoria.mes}</td>
                            <td>
                                <Link to={`/convocatorias/mostrar/${convocatoria.id}`}
                                className="btn btn-success  btn-block"
                                >
                                <i className="fas fa-angle-double-right"></i> Más info...
                                </Link>

                                <button
                                    type="button"
                                    className="btn btn-danger btn-block"
                                    onClick={() => eliminarConvocatoria(convocatoria.id)}
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

Convocatorias.propTypes = {
    firestore: PropTypes.object.isRequired,
    convocatorias: PropTypes.array
}

export default compose(
    firestoreConnect([{collection: 'convocatorias'}]),
    connect((state, props)=>({
        convocatorias: state.firestore.ordered.convocatorias
    }))
)(Convocatorias)