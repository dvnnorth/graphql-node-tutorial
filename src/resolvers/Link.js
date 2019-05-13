module.exports = {
  postedBy: async (parent, args, context) =>
    await context.prisma.link({ id: parent.id }).postedBy()
};
