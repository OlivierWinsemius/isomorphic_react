import * as activityTypes from '../../utils/activityTypes';

export const defaults = {
    currentActivity: {
        __typename: 'Activity',
        title: 'Title',
        description: 'Description',
        type: activityTypes.RUNNING,
        date: Date.now(),
        distance: 0,
        time: 0,
    },
    activities: [],
};

export const resolvers = {};
