import gql from 'graphql-tag';

export default gql`
    type Example {
        id: String!
    }

    type Query {
        examples: [Example]
    }
`;
