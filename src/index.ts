import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
 
const typeDefs = `#graphql
    type Book {
        id: ID!,
        title: String
        library: Library
        author: Author
    }

    type Author {
        id: ID!
        firstName: String,
        lastName: String,
        books: [Book!]
    }

    type Library {
        id: ID!,
        name: String
        books: [Book!]
    }

    type Query {
        bookList(title: String): [Book],
        authorList: [Author],
        libraryList: [Library]
    }
`;

const authorList = [
	{
		id: "author1",
		firstName: "Rayden",
		lastName: "Li",
		books: [],
	},
	{
		id: "author2",
		firstName: "Tim",
		lastName: "Li",
		books: [],
	},
];

const bookList = [
	{
		id: "book1",
		title: "Testing book 1",
		branch: "library1",
		author: "author2",
	},
	{
		id: "book2",
		title: "Testing book 2",
		branch: "library2",
		author: "author1",
	},
    {
		id: "book2",
		title: "Testing book 2",
		branch: "library2",
		author: "author1",
	},
];

const libraryList = [
	{
		id: "library1",
		name: "Hong Kong",
	},
	{
		id: "library2",
		name: "Taiwan",
	},
];

const resolvers = {
	Query: {
		bookList: (parent, arg, contextValue, info) => {
            console.log(info)
			const { title } = arg ?? {};
			return title
				? bookList?.filter((book) => book?.title === title)
				: bookList;
		},
		authorList: (parent, arg) => {
			return authorList;
		},
		libraryList: (parent, arg) => {
			return libraryList;
		},
	},
	Book: {
		async author(parent) {
			return await authorList?.find((author) => author?.id === parent?.author);
		},
		async library(parent) {
			return await libraryList?.find((lib) => lib?.id === parent?.branch);
		},
	},
	Author: {
		async books(parent) {
			return bookList?.filter((book) => book?.author?.includes(parent?.id));
		},
	},
    Library: {
        async books(parent) {
            return bookList?.filter((book) => book?.branch?.includes(parent?.id))
        }
    }
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
});

console.log(`server ready at ${url}`);
