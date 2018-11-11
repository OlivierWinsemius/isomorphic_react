export default class Fields extends React.Component {
    /* eslint-disable-next-line react/destructuring-assignment */
    onChange = this.props.onInputChanged;

    getFieldsFromInputs = (inputs, values) =>
        React.Children.toArray(inputs).reduce((fields, input) => {
            const { field } = input.props;

            const inputValue = values[input.props.name]
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

            const matchingField = field && fields.find(
                ({ fieldName }) => fieldName === field
            );

            if (matchingField) {
                matchingField.fieldInputs.push(newInput.input);
            } else {
                fields.push({
                    fieldName: field,
                    fieldInputs: [newInput.input],
                });
            }
            return fields;
        }, []);

    render = () => {
        const { inputs, values, classes } = this.props;
        const fields = this.getFieldsFromInputs(inputs, values);

        return fields.map(({ fieldName, fieldInputs }, key) => (
            <fieldset className={classes.field} key={fieldName || key}>
                {fieldName && <legend>{fieldName}</legend>}
                {fieldInputs}
            </fieldset>
        ));
    }
}
