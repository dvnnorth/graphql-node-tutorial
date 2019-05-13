module.exports = {
  links: async (parent, args, context) =>
    await context.prisma.user({ id: parent.id }).links()
};
