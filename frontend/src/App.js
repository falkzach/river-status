import React, {} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';

import Log from './logbook/Log.js';
import Nav from './Nav.js';
import Status from './status/Status.js';
import Authenticate from './auth/Authenticate.js';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

const BACKEND_API = '' + process.env.REACT_APP_API_URL + ':' + process.env.REACT_APP_API_PORT;

const App = () => 
    <BrowserRouter>
        <Container fluid className="river-log wrapper">
            <Container fluid>
                <Header className='main-head'>River Status and Logbook</Header>
                <Nav />
            </Container>

            <Route exact path="/" component={() => <Status backend_api={BACKEND_API} />} />
            <Route path="/Log" component={() => <Log backend_api={BACKEND_API} />} />
            <Route path="/authenticate" component={() => <Authenticate backend_api={BACKEND_API} />} />
        </Container>
    </BrowserRouter>

export default App;
