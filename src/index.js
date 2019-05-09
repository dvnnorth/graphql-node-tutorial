const fs = require("fs");
const { GraphQLServer } = require("graphql-yoga");
const resolvers = require("./resolvers");

// 1
// Decided to define my schema in a .gql file. Trying this out (blocking)
const typeDefs = fs.readFileSync(__dirname + "/schema.gql").toString();

// 2
// I decided to make it a separate module, see line 3

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers
});
/* eslint-disable-next-line */
server.start(() => console.log("Server is running on http://localhost:4000"));
