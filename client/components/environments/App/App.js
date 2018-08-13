import React from 'react';

export default () => <h1>hoi!!!</h1>;

fetch('/api/bla')
    .then(response => response.text())
    // eslint-disable-next-line no-console
    .then(text => console.log(text));
