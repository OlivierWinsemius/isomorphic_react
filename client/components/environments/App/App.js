import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Routes from '../../ecosystems/Routes';

export default () => (
    <Query
        query={gql`
            {
                getAuthor(id: 15305) {
                    name
                    books {
                        title
                    }
                }
            }
        `}
    >
        {({ loading, error, data }) => {
            console.log(loading, error, data);
            return <div>{loading}</div>;
        }}
    </Query>
);
