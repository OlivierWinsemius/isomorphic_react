import Fields from './Fields';

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

    getInputValuesFromChildren = children => React.Children.toArray(children).reduce(
        (inputs, input) => ({
            ...inputs,
            [input.props.name]: input.props.value,
        }),
        {},
    );

    render() {
        const { children, classes } = this.props;
        const { inputValues } = this.state;

        return (
            <form onSubmit={this.onSubmit} className={classes.form}>
                <Fields inputs={children} values={inputValues} onInputChanged={this.onChange} />
            </form>
        );
    }
}
