module.exports = {
  Query: {
    info: () => "This is the API of a Hackernews Clone",
    feed: (root, args, context, info) => context.prisma.links(),
    link: (_, args) => links.filter(link => link.id === args.id)[0]
  },
  Mutation: {
    post: (root, args, context) =>
      context.prisma.createLink({
        ...args
      }),
    updateLink: (root, args, context) =>
      context.prisma.updateLink({
        data: {
          description: args.description,
          url: args.url
        },
        where: {
          id: args.id
        }
      }),
    // Signature deleteLink(id: ID!): Link
    deleteLink: (root, args, context) =>
      context.prisma.deleteLink({
        id: args.id
      })
  }
  // Link resolvers are not needed, assumed by Prisma because they're simply the
  // properties, id, description, and url
  // From the tut: First off, note that you’re entirely removing the Link
  // resolvers (as explained before). They are not needed because the GraphQL
  // server infers what they look like.
};
