import { isWindows } from '../../../utils/environment';

export default () => ({
    form: {
        position: 'relative',
        width: 400,
        padding: 6,
        backgroundColor: '#f2f2f2',
        margin: '20px auto',
    },
    banner: {
        background: '#2f2f2f',
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        width: 20,
        height: 20,
        backgroundColor: '#f2f2f2',
        left: !isWindows() ? 0 : undefined,
        right: isWindows() ? 0 : undefined,
        border: 'none',
    },
    submitButton: {
        border: 'none',
        backgroundColor: '#366031',
        color: '#f2f2f2',
    },
    fieldsWrapper: {
        margin: [20, 0],
    },
    title: {
        color: '#f2f2f2',
        margin: 0,
        '-webkit-background-clip': 'text',
        backgroundClip: 'text',
        fontSize: 50,
        fontWeight: 500,
        fontFamily: 'Oswald',
        textAlign: 'center',
    },
});
