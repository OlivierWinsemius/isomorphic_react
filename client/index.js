import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import App from 'components/4_environments/App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { defaults, resolvers } from 'apollo/resolvers';
import typeDefs from 'apollo/schemas';
import { ThemeProvider } from 'react-jss';
import theme from './index.theme';
import { isProduction } from './utils/environment';

const client = new ApolloClient({
    // cache: new InMemoryCache(),
    clientState: {
        defaults,
        resolvers,
        typeDefs,
    },
});

const renderApp = isProduction ? ReactDOM.hydrate : ReactDOM.render;

const render = Component =>
    renderApp(
        <AppContainer>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <Component />
                    </ThemeProvider>
                </BrowserRouter>
            </ApolloProvider>
        </AppContainer>,
        document.getElementById('root')
    );

render(App);

if (!isProduction && module.hot) {
    module.hot.accept('./components/4_environments/App', () => {
        // eslint-disable-next-line global-require
        render(require('./components/4_environments/App').default);
    });
}

export default render;
