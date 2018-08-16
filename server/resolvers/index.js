import { fetchAuthor, fetchBook } from '../utils/goodreads';

export default {
    Query: {
        getAuthor(_, { id }) {
            return fetchAuthor(id);
        },
    },
    Book: {
        title: xml => xml.GoodreadsResponse.book[0].title[0],
        authors: xml =>
            xml.GoodreadsResponse.book[0].authors[0].author
                .map(author => author.id[0])
                .map(fetchAuthor),
    },
    Author: {
        name: xml => xml.GoodreadsResponse.author[0].name[0],
        books: xml =>
            xml.GoodreadsResponse.author[0].books[0].book
                .map(book => book.id[0]._)
                .map(fetchBook),
    },
};
