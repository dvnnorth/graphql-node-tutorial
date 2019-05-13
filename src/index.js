const { GraphQLServer } = require("graphql-yoga");
const resolvers = require("./resolvers");
const { prisma } = require("./generated/prisma-client");

// 1
// Turns out you don't need fs, Prisma handles it if you give the path
const typeDefs = __dirname + "/schema.graphql";

// 2
// I decided to make it a separate module, see line 3

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  // Having context be a function that returns the context rather than just an
  // object allows graphql-yoga to pass the HTTP request along with the context
  // which gives us access to headers that we can user for 
  // authentication/authorization
  context: request => ({
    ...request,
    prisma
  })
});
/* eslint-disable-next-line */
server.start(() => console.log("Server is running on http://localhost:4000"));
