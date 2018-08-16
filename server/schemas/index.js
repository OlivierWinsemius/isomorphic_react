export default `
    type Book {
        title: String
        authors: [Author]
    }

    type Author {
        name: String
        books: [Book]
    }

    type Query {
        getAuthor(id: Int!): Author
    }
`;
