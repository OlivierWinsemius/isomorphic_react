import React from 'react';
import { shallow } from 'enzyme';
import FormInput from './FormInput';

describe('<FormInput />', () => {
    it('matches snapshot', () => {
        const Component = shallow(<FormInput classes={{}} label="label" />);
        expect(Component).toMatchSnapshot();
    });
});
