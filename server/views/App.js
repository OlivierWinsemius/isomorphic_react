import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../../client/components/environments/App';

const ConnectedApp = ({ store }) => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default ConnectedApp;

if (typeof window !== 'undefined') {
    ReactDOM.hydrate(
        <BrowserRouter>
            <ConnectedApp />
        </BrowserRouter>,
        document.getElementById('root')
    );
}
