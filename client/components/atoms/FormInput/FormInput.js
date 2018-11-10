export default ({ label, classes, ...props }) => (
    <React.Fragment>
        <span className={classes.label}>{label}</span>
        <input className={classes.input} {...props} />
    </React.Fragment>
);
