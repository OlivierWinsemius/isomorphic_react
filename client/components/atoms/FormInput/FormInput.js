import React from 'react';

export default ({ label, classes, ...props }) => (
    <div className={classes.inputWrapper}>
        <span className={classes.label}>{label}</span>
        <input className={classes.input} {...props} />
    </div>
);
