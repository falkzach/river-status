import React, {} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Log from './Log.js';
import Status from './Status.js';

const App = () => 
    <BrowserRouter>
        <div>
        <Route exact path="/" component={Status}/>
        <Route path="/Log" component={Log}/>
        </div>
    </BrowserRouter>

export default App;
