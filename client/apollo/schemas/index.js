import gql from 'graphql-tag';

export default gql`
    type Activity {
        title: String!
        description: String!
        type: String!
        distance: Int!
        time: Int!
    }

    type Query {
        currentActivity: Activity
        activities: [Activity]
    }
`;
