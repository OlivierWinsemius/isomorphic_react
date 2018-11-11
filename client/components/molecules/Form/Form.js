export default class Form extends React.Component {
    constructor(props) {
        super(props);
        const inputValues = this.getInputValuesFromChildren(props.children);
        this.state = { inputValues };
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        const { inputValues } = this.state;
        onSubmit(inputValues);
    };

    onChange = ({ target }) => {
        const { inputValues } = this.state;
        this.setState({
            inputValues: {
                ...inputValues,
                [target.name]: target.value,
            },
        });
    };

    getInputValuesFromChildren = children => React.Children.reduce(
        children,
        (inputs, input) => ({
            ...inputs,
            [input.props.name]: input.props.value,
        }),
        {},
    );

    getFieldsFromInputs = (inputs, inputValues) =>
        React.Children.reduce(inputs, (fields, input) => {
            const { field } = input.props;

            const inputValue = inputValues[input.props.name]
                || input.props.value
                || '';

            const newInput = {
                field,
                input: React.cloneElement(input, {
                    value: inputValue,
                    onChange: this.onChange,
                    key: input.props.name,
                }),
            };

            const matchingField = fields.find(
                ({ fieldName }) => fieldName === input.props.field
            );

            if (matchingField) {
                matchingField.inputs.push(newInput.input);
            } else {
                fields.push({
                    fieldName: field,
                    inputs: [newInput.input],
                });
            }
            return fields;
        }, []);

    render() {
        const { children, classes } = this.props;
        const { inputValues } = this.state;

        const fields = this.getFieldsFromInputs(children, inputValues);
        return (
            <form onSubmit={this.onSubmit} className={classes.form}>
                {fields.map(({ fieldName, inputs }) => (
                    <fieldset key={fieldName}>
                        {fieldName && <legend>{fieldName}</legend>}
                        {inputs}
                    </fieldset>
                ))}
            </form>
        );
    }
}
