module.exports = {
  link: (root, args, context) =>
    context.prisma.vote({ id: root.id }).link(),
  user: (root, args, context) =>
    context.prisma.vote({ id: root.id }).user()
};