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
    feed: () => links,
    link: (_, args) => links.filter(link => link.id === args.id)[0]
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
    },
    updateLink: (parent, args) => {
      // Signature updateLink(id: ID!, url: String, description: String): Link
      if (args.id === null || typeof args.id === undefined) {
        return null;
      }

      // Use a filter to grab the link to be updated
      const oldLink = links.filter(link => link.id === args.id)[0] || {};

      // Build updated link with args and oldLink information
      const updatedLink = {
        id: args.id || oldLink.id,
        url: args.url || oldLink.url,
        description: args.description || oldLink.description
      };

      // Create new links by mapping links and replacing link to be updated
      // by matching the id
      links = links.map(link => {
        if (link.id === args.id) {
          return { ...updatedLink };
        } else {
          return link;
        }
      });

      // Send back the updated link or null if updated link is missing info
      // updatedLink will only have a falsy property if an incorrect ID was
      // provided
      return updatedLink.id && updatedLink.url && updatedLink.description
        ? { ...updatedLink }
        : null;
    },
    // Signature deleteLink(id: ID!): Link
    deleteLink: (parent, args) => {
      // Remove link from links by id or null if not found (bad ID)
      const deletedLink = links.filter(link => link.id === args.id)[0] || null;
      links = links.filter(link => link.id !== args.id);
      return deletedLink;
    }
  }
  // Link resolvers are not needed, assumed by Prisma because they're simply the
  // properties, id, description, and url
  // From the tut: First off, note that you’re entirely removing the Link
  // resolvers (as explained before). They are not needed because the GraphQL
  // server infers what they look like.
};
