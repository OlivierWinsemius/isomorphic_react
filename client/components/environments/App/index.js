import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { increment, subtract } from 'redux/actions/exampleActions';
import App from './App';
import styles from './App.styles';

const mapStateToProps = state => ({
    count: state.example.count,
});

const mapDispatchToProps = dispatch => ({
    increment: value => dispatch(increment(value)),
    subtract: value => dispatch(subtract(value)),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(injectSheet(styles)(App))
);
