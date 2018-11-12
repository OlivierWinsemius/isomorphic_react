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
        const { children, title, onSubmit, classes } = this.props;
        const { inputValues } = this.state;

        return (
            <form onSubmit={this.onSubmit} className={classes.form}>
                <button type="button" className={classes.closeButton}>x</button>
                {title && (
                    <div className={classes.banner}>
                        <h2 className={classes.title}>{title}</h2>
                    </div>
                )}
                <div className={classes.fieldsWrapper}>
                    <Fields inputs={children} values={inputValues} onInputChanged={this.onChange} />
                </div>
                {onSubmit && (
                    <button type="submit" className={classes.submitButton}>SUBMIT</button>
                )}
            </form>
        );
    }
}
