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

const translate = (lang, str) =>
    fetch(
        `https://www.googleapis.com/language/translate/v2?key=${
            process.env.GOOGLE_API_KEY
        }&source=en&target=${lang}&q=${encodeURIComponent(str)}`
    )
        .then(response => response.json())
        .then(json => json.data.translations[0].translatedText);

const parseXML = promisify(parseString);

const BookType = new GraphQLObjectType({
    name: "Book",
    description: "...",
    fields: () => ({
        title: {
            type: GraphQLString,
            args: {
                lang: {
                    type: GraphQLString,
                },
            },
            resolve: (xml, { lang }) => {
                const title = xml.GoodreadsResponse.book[0].title[0];
                return lang ? translate(title, lang) : title;
            },
        },
        isbn: {
            type: GraphQLString,
            resolve: xml => xml.GoodreadsResponse.book[0].isbn[0],
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
            resolve: xml => {
                const ids = xml.GoodreadsResponse.author[0].books[0].book.map(
                    book => book.id[0]._
                );
                return Promise.all(
                    ids.map(id =>
                        fetch(
                            `https://www.goodreads.com/book/show/${id}.xml?key=${
                                process.env.GOODREADS_API_KEY
                            }`
                        )
                            .then(response => response.text())
                            .then(parseXML)
                    )
                );
            },
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
