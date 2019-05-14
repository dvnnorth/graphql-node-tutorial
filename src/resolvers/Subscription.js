const newLinkSubscribe = (root, args, context) =>
  context.prisma.$subscribe.link({ mutation_in: ["CREATED"] }).node();

const newVoteSubscribe = (root, args, context) =>
  context.prisma.$subscribe.vote({ mutation_in: ["CREATED"] }).node();

module.exports = {
  newLink: {
    subscribe: newLinkSubscribe,
    resolve: payload => payload
  },
  newVote: {
    subscribe: newVoteSubscribe,
    resolve: payload => payload
  }
};
