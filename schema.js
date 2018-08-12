import fetch from "node-fetch";
import DataLoader from "dataloader";
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

const fetchEntity = entity => id =>
    fetch(
        `https://www.goodreads.com/${entity}/show.xml?id=${id}&key=${
            process.env.GOODREADS_API_KEY
        }`
    )
        .then(response => response.text())
        .then(parseXML);

const fetchAuthor = fetchEntity("author");
const fetchBook = fetchEntity("book");

const authorLoader = new DataLoader(keys => Promise.all(keys.map(fetchAuthor)));
const bookLoader = new DataLoader(keys => Promise.all(keys.map(fetchBook)));

const BookType = new GraphQLObjectType({
    name: "Book",
    description: "...",
    fields: () => ({
        authors: {
            type: new GraphQLList(AuthorType),
            resolve: xml => {
                const authors = xml.GoodreadsResponse.book[0].authors[0].author;
                const ids = authors.map(author => author.id[0]);
                return authorLoader.loadMany(ids);
            },
        },
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
                return bookLoader.loadMany(ids);
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
                resolve: (_, { id }) => authorLoader.load(id),
            },
        }),
    }),
});
