import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Form from '../../molecules/Form';
import FormInput from '../../atoms/FormInput';

export default ({ currentActivity }) => (
    <React.Fragment>
        <Form
            onSubmit={(values) => {
                console.log(currentActivity, values);
            }}
        >
            <FormInput
                field="general"
                type="text"
                name="title"
                label="title"
                value={currentActivity.title}
            />
            <FormInput
                field="general"
                type="text"
                name="description"
                label="description"
                value={currentActivity.description}
            />
            <FormInput
                field="general"
                type="datetime-local"
                name="date"
                label="date"
                value={moment(currentActivity.date).format('YYYY-MM-DDTHH:MM')}
            />
            <FormInput
                field="data"
                type="number"
                name="distance"
                label="distance"
                value={currentActivity.distance}
            />
            <FormInput
                field="data"
                type="time"
                name="time"
                label="time"
                value={currentActivity.time}
            />
            <FormInput
                field="submit"
                type="submit"
                name="submit"
                value="submit"
            />
        </Form>

        <Link to="/bla">bla</Link>
    </React.Fragment>
);
