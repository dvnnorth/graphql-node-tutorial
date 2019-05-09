const { GraphQLServer } = require("graphql-yoga");
const resolvers = require("./resolvers");

// 1
// Turns out you don't need fs, Prisma handles it if you give the path
const typeDefs = __dirname + "/schema.graphql";

// 2
// I decided to make it a separate module, see line 3

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers
});
/* eslint-disable-next-line */
server.start(() => console.log("Server is running on http://localhost:4000"));
