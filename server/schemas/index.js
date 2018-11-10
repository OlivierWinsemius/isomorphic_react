export default `
    type Book {
        title: String
    }

    type Author { 
        name: String
        books: [Book]
    }

    type Query {
        getAuthor(id: Int!): Author
    }
`;
