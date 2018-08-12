import fetch from "node-fetch";
import { promisify } from "util";
import { parseString } from "xml2js";
import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
} from "graphql";

const parseXML = promisify(parseString);

const BookType = new GraphQLObjectType({
    name: "Book",
    description: "...",
    fields: () => ({
        title: {
            type: GraphQLString,
            resolve: xml => xml.title[0],
        },
        isbn: {
            type: GraphQLString,
            resolve: xml => xml.isbn[0],
        },
    }),
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    description: "...",
    fields: () => ({
        name: {
            type: GraphQLString,
            resolve: xml => xml.GoodreadsResponse.author[0].name[0],
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: xml => xml.GoodreadsResponse.author[0].books[0].book,
        },
    }),
});

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        description: "...",
        fields: () => ({
            author: {
                type: AuthorType,
                args: {
                    id: { type: GraphQLInt },
                },
                resolve: (_, { id }) =>
                    fetch(
                        `https://www.goodreads.com/author/show.xml?id=${id}&key=${
                            process.env.GOODREADS_API_KEY
                        }`
                    )
                        .then(response => response.text())
                        .then(parseXML),
            },
        }),
    }),
});
