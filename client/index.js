import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import App from 'components/environments/App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { defaults, resolvers } from 'apollo/resolvers';
import typeDefs from 'apollo/schemas';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    clientState: {
        defaults,
        resolvers,
        typeDefs,
    },
});

console.log('whatuuup!');

const render = (Component) => {
    console.log(Component);
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
