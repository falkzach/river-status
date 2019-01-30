import React, {} from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Log from './logbook/Log.js';
import Nav from './Nav.js';
import Status from './status/Status.js';
import {} from 'semantic-ui-react';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

const App = () => 
    <BrowserRouter>
        <div className="river-log wrapper">
            <header className='main-head'>River Status and Logbook</header>
            <Nav />

            <Route exact path="/" component={Status}/>
            <Route path="/Log" component={Log}/>
        </div>
    </BrowserRouter>

export default App;
