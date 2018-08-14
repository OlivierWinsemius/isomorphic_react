import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

export default () => (
    <Switch>
        <Route path="/" render={() => <Link to="/bla">bla</Link>} exact />
        <Route path="/bla" render={() => <Link to="/">root</Link>} exact />
        <Route render={() => <h1>404!</h1>} />
    </Switch>
);
