import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { authorList, bookList, libraryList } from "./_db.js";
import { connect } from "./db.js";
import Book from "./models/book.model.js";
import Author from "./models/author.model.js";
import Library from "./models/library.model.js";


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
		bookDelete(id: String): Book,
		bookCreate(title: String): Book
	}
`;

const resolvers = {
	Query: {
		bookList: async (parent, arg, contextValue, info) => {
			const { title } = arg ?? {};
			console.log(await Book.find());
			console.log(await Author.find());
			console.log(await Library.find());
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
		bookCreate: async (_, arg) => {
			const { title } = arg ?? {};
				const x = await Book.create({ title }, { });
				
			console.log(x);
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

connect();
console.log(`server ready at ${url}`);
