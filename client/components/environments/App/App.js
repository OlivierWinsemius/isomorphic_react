import React from 'react';
import Routes from '../../ecosystems/Routes';

export default class App extends React.Component {
    fetchStateProps = () => fetch('http://localhost:3000/api');

    render() {
        const { data } = this.props;
        return (
            <div>
                {data}
                <Routes />
            </div>
        );
    }
}
