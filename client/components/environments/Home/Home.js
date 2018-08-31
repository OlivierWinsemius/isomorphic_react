import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

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
            return (
                <div>
                    <Link to="/bla">bla</Link>
                    <br />
                    {loading && 'loading...'}
                </div>
            );
        }}
    </Query>
);
