import React from 'react';
import Routes from '../../ecosystems/Routes';

export default () => <Routes />;

fetch('http://localhost:3000/api')
    .then(result => result.text())
    .then(console.log);
