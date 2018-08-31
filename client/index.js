import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import App from 'components/environments/App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient();

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Component />
                </BrowserRouter>
            </ApolloProvider>
        </AppContainer>,
        document.getElementById('root')
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./components/environments/App', () => {
        // eslint-disable-next-line global-require
        render(require('./components/environments/App').default);
    });
}

export default render;
