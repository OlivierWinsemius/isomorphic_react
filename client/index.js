import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from 'components/environments/App';
import store from 'redux/store';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient();

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <ApolloProvider client={client}>
                    <BrowserRouter>
                        <Component />
                    </BrowserRouter>
                </ApolloProvider>
            </Provider>
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
