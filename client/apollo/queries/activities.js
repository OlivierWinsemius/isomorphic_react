/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const getCurrentActivity = gql`
    {
        currentActivity @client {
            title
            description
            type
            date
            distance
            time
        }
    }
`;
