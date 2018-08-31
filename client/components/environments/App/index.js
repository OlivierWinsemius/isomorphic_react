import injectSheet from 'react-jss';
import { withRouter } from 'react-router-dom';
import App from './App';
import styles from './App.styles';

export default withRouter(injectSheet(styles)(App));
