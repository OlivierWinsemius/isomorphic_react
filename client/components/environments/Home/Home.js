import React from 'react';
import { Link } from 'react-router-dom';
import { capitalize } from 'lodash';

export default ({ currentActivity }) =>
    (currentActivity ? (
        <React.Fragment>
            <span>
                title:
                {currentActivity.title}
            </span>
            <br />
            <span>
                description:
                {currentActivity.description}
            </span>
            <br />
            <span>
                type:
                {capitalize(currentActivity.type)}
            </span>
            <br />
            <span>
                distance:
                {currentActivity.distance}
                km
            </span>
            <br />
            <span>
                time:
                {currentActivity.time}
            </span>
            <br />
            <Link to="/bla">bla</Link>
        </React.Fragment>
    ) : (
        <Link to="/bla">bla</Link>
    ));
