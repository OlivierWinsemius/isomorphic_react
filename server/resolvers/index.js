export default {
    Query: {
        getAuthor: () => 1,
    },
    Book: {
        title: () => 'title',
    },
    Author: {
        name: () => 'name',
        books: () => [
            { title: 'title' },
            { title: 'title' },
            { title: 'title' },
        ],
    },
};
