import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from'./store';
import {Provider} from 'react-redux';

import NavBar from './components/layout/Navbar';

import Convocatorias from './components/convocatorias/Convocatorias';
import MostrarConvocatoria from './components/convocatorias/MostrarConvocatoria';
import EditarConvocatoria from './components/convocatorias/EditarConvocatoria';
import NuevaConvocatoria from './components/convocatorias/NuevaConvocatoria';

import Agenda from './components/agenda/Agenda';
import EditarAgenda from './components/agenda/EditarAgenda';
import MostrarAgenda from './components/agenda/MostrarAgenda';
import NuevaAgenda from './components/agenda/NuevaAgenda';

import Login from './components/auth/Login';

import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <div className="container">
          <Switch>            
            <Route exact path="/" component={UserIsAuthenticated(Convocatorias)}></Route>
            <Route exact path="/convocatorias/nuevo" component={UserIsAuthenticated(NuevaConvocatoria)}></Route>
            <Route exact path="/convocatorias/mostrar/:id" component={UserIsAuthenticated(MostrarConvocatoria)}></Route>
            <Route exact path="/convocatorias/editar/:id" component={UserIsAuthenticated(EditarConvocatoria)}></Route>
            
            <Route exact path="/agenda" component={UserIsAuthenticated(Agenda)}></Route>
            <Route exact path="/agenda/nuevo" component={UserIsAuthenticated(NuevaAgenda)}></Route>
            <Route exact path="/agenda/mostrar/:id" component={UserIsAuthenticated(MostrarAgenda)}></Route>
            <Route exact path="/agenda/editar/:id" component={UserIsAuthenticated(EditarAgenda)}></Route>

            <Route exact path="/admin" component={UserIsNotAuthenticated(Login)}></Route>
          </Switch>
        </div>
      </Router>      
    </Provider>
  );
}

export default App;