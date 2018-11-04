import React from 'react';

export default class Form extends React.Component {
    constructor(props) {
        super(props);

        const inputValues = {};
        React.Children.forEach(props.children, (input) => {
            input.props.name && (inputValues[input.props.name] = input.props.value);
        });

        this.state = {
            inputValues,
        };
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

    getInputFields = (inputs) => {
        const { inputValues } = this.state;
        const fields = [];

        React.Children.map(inputs, (input) => {
            const { field } = input.props;
            const newInput = {
                field,
                input: React.cloneElement(input, {
                    key: input.props.name,
                    value: inputValues[input.props.name] || input.props.value || '',
                    onChange: this.onChange,
                }),
            };

            const matchingField = fields.find(({ fieldName }) => fieldName === input.props.field);

            if (!matchingField) {
                fields.push({
                    fieldName: newInput.field,
                    inputs: [newInput.input],
                });
            } else {
                matchingField.inputs.push(newInput.input);
            }
        });

        return fields;
    };

    render() {
        const { children, classes } = this.props;
        const fields = this.getInputFields(children);
        return (
            <form onSubmit={this.onSubmit} className={classes.form}>
                {fields.map(({ fieldName, inputs }) => (
                    <fieldset key={fieldName}>
                        {typeof fieldName === 'string'
                            && fieldName !== 'undefined' && <legend>{fieldName}</legend>}
                        {inputs}
                    </fieldset>
                ))}
            </form>
        );
    }
}
