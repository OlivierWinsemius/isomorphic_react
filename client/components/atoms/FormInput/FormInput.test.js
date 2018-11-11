import FormInput from './index';
import { shallow } from 'enzyme';

describe('<FormInput />', () => {
    it('matches snapshot', () => {
        const Component = shallow(FormInput);
        expect(Component).toMatchSnapshot();
    })
});
