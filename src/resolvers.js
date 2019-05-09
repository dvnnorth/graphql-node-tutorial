// Writing some dummy data to be returned
let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  },
  {
    id: "link-1",
    url: "www.graphql.org",
    description: "The GraphQL website"
  }
];

module.exports = {
  Query: {
    info: () => "This is the API of a Hackernews Clone",
    feed: () => links
  },
  Mutation: {
    post: (parent, args) => {
      const post = {
        id: "link-" + links.length,
        url: args.url,
        description: args.description
      };
      links.push(post);
      return post;
    }
  },
  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url
  }
};
