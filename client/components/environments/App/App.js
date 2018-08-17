import React from 'react';
import Routes from '../../ecosystems/Routes';

export default ({ count, increment, subtract }) => (
    <div>
        <p>
            <button type="submit" onClick={() => subtract(4)}>
                -
            </button>
            {count}
            <button type="submit" onClick={() => increment(10)}>
                +
            </button>
        </p>
        <p>
            <Routes />
        </p>
    </div>
);
