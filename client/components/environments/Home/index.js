import { compose, graphql } from 'react-apollo';
import { getCurrentActivity } from '../../../apollo/actions/activities';
import Home from './Home';

export default compose(
    graphql(getCurrentActivity, {
        props: ({ data: { currentActivity } }) => ({ currentActivity }),
    })
)(Home);
