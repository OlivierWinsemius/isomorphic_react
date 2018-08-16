import fetch from 'node-fetch';
import { parseStringAsync } from './xml';

export const fetchEntity = entity => id =>
    fetch(
        `https://www.goodreads.com/${entity}/show.xml?id=${id}&key=${
            process.env.GOODREADS_API_KEY
        }`
    )
        .then(response => response.text())
        .then(parseStringAsync);

export const fetchAuthor = fetchEntity('author');
export const fetchBook = fetchEntity('book');
