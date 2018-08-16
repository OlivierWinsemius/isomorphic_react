import { parseString } from 'xml2js';

// eslint-disable-next-line import/prefer-default-export
export const parseStringAsync = xml =>
    new Promise((resolve, reject) =>
        parseString(xml, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        }));
