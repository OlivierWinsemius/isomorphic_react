import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

if (typeof require.ensure !== 'function') {
    require.ensure = (d, c) => c(require);
}

const loading = () => <div>Loading...</div>;

const Home = Loadable({
    loader: () =>
        import(/* webpackChunkName: "Home" */ '../../4_environments/Home'),
    loading,
});

export default () => (
    <Switch>
        <Route path="/" component={Home} exact />
    </Switch>
);
