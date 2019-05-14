module.exports = {
  postedBy: async (parent, args, context) =>
    await context.prisma.link({ id: parent.id }).postedBy(),
  votes: (parent, args, context) =>
    context.prisma.link({ id: parent.id }).votes()
};
