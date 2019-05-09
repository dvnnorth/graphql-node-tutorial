const fs = require("fs");
const { GraphQLServer } = require("graphql-yoga");

// 1
const typeDefs = fs.readFileSync(__dirname + "/schema.gql").toString();

//2
const resolvers = {
  Query: {
    info: () => "This is the API of a Hackernews Clone"
  }
};

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers
});
/* eslint-disable-next-line */
server.start(() => console.log("Server is running on http://localhost:4000"));
