import * as activityTypes from '../../utils/activityTypes';

export const defaults = {
    currentActivity: {
        __typename: 'Activity',
        title: '',
        description: '',
        type: activityTypes.RUNNING,
        distance: 0,
        time: 0,
    },
    activities: [],
};

export const resolvers = {};
