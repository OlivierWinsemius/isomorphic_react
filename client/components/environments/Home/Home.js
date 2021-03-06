import { Link } from 'react-router-dom';
import Form from '../../molecules/Form';
import FormInput from '../../atoms/FormInput';

export default () => (
    <div>
        <Form title="FORM" onSubmit={values => console.log(values)}>
            <FormInput label="bla" name="bla" value={10} />
            <FormInput label="bla2" name="bla2" value={10} />
            <FormInput label="bla3" name="bla3" value={10} />
            <FormInput label="bla4" name="bla4" value={10} />
        </Form>
        <Link to="/bla">bla</Link>
    </div>
);
