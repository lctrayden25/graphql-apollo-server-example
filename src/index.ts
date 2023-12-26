import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { authorList, bookList, libraryList } from "./_db.js";

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

	type Mutation {
		bookDelete(id: String): Book
	}
`;


const resolvers = {
	Query: {
		bookList: (parent, arg, contextValue, info) => {
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
			return bookList?.filter((book) => book?.branch?.includes(parent?.id));
		},
	},
	Mutation: {
		async bookDelete(_, arg) {
			const { id } = arg ?? {};
			const deleteData = bookList?.find((book) => book?.id === id);
			if (!deleteData) return {};
			return deleteData;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
});

console.log(`server ready at ${url}`);
