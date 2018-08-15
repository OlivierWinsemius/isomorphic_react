import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../../client/components/environments/App';

const SSR = ({ store }) => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default SSR;

if (typeof window !== 'undefined') {
    ReactDOM.hydrate(
        <BrowserRouter>
            <SSR />
        </BrowserRouter>,
        document.getElementById('root')
    );
}
