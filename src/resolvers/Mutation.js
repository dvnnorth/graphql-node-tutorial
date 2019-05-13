// Require bcrypt and jwt for authentication
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  post: async (root, args, context) =>
    await context.prisma.createLink({
      ...args
    }),
  updateLink: async (root, args, context) =>
    await context.prisma.updateLink({
      data: {
        description: args.description,
        url: args.url
      },
      where: {
        id: args.id
      }
    }),
  // Signature deleteLink(id: ID!): Link
  deleteLink: async (root, args, context) =>
    await context.prisma.deleteLink({
      id: args.id
    }),
  signup: async (root, args, context) => {
    // Use bcrypt to hash the plaintext password
    const password = await bcrypt.hash(args.password, 10);

    // Create a user using the args but overwriting the plaintext password from
    // args with the hashed password
    const user = await context.prisma.createUser({
      ...args,
      password
    });

    // Get our token to return to the client
    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    // Return our AuthPayload
    return {
      token,
      user
    };
  },
  login: async (root, args, context) => {
    // Get our user
    const user = context.prisma.user({
      email: args.email
    });
    // Error handling if there is no user found with email sent via args
    if (!user) {
      throw new Error("No such user found with email " + args.email);
    }

    // Check if the user is valid or not. Handle error if password is invalid
    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    // Generate token for AuthPayload
    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    // Return AuthPayload
    return {
      token,
      user
    };
  }
};
