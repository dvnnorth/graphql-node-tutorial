# graphql-node-tutorial

Application build following howtographql.com's GraphQL + Node back-end tutorial.

## How To Build and Run

Aside from the normal `yarn install` / `npm install`, you'll need to set-up the
Prisma API. Now, because I don't yet know what the best practices are for hiding
or obscuring Prisma API endpoints is, I just .gitignored all Prisma related
files that contained the plaintext endpoint. You'll, therefore, need to set up
your own Prisma server and database which you can do so via the same
howtographql.com instructions that I used.

First, you'll need to create your `prisma.yml` file in your prisma/ directory:

```bash
touch ./prisma/prisma.yml
```

Then, add the following contents to your `prisma.yml` file:

```yml
# The HTTP endpoint for your Prisma API
endpoint: ""

# Points to the file that contains your datamodel
datamodel: datamodel.prisma

# Specifies language & location for the generated Prisma client
generate:
  - generator: javascript-client
    output: ../src/generated/prisma-client

# Specify a hook to run prisma generate after every deploy
hooks:
  post-deploy:
    - prisma generate
```

If the Prisma CLI is not already installed, install it via

```bash
yarn global add prisma
```

or

```bash
npm install prisma -g
```

Now run `prisma deploy` and follow the prompts to deploy your Prisma server. I
used the demo database. Here are the instructions to do the same from
howtographql.com's tutorial:

```text
The prisma deploy command starts an interactive process:

First select the Demo server. When the browser opens, register with Prisma Cloud
and go back to your terminal.

Then you need to select the region for your Demo server. Once that’s done, you
can just hit enter twice to use the suggested values for service and stage.

Note: Prisma is open-source. You can deploy it with Docker to a cloud provider
of your choice (such as Digital Ocean, AWS, Google Cloud, …).

Once the command has finished running, the CLI writes the endpoint for theu
Prisma API to your prisma.yml.
It will look similar to this: https://eu1.prisma.sh/john-doe/hackernews-node/dev.
```

Now run `prisma generate` and you're cooking with grease.

### Utils (and APP_SECRET)

You will need to create a file `utils.js` in your src/ directory. This file will
contain your `APP_SECRET` that you will use when generating JSON Web Tokens for
authentication. The file should look like this:

```javascript
const jwt = require("jsonwebtoken");
const APP_SECRET = "Your-Secret-Here";

const getUserId = context => {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error("Not authenticated");
};

module.exports = {
  APP_SECRET,
  getUserId
};
```

Just be sure to replace the string `Your-Secret-Here` with a new secret.

## A Note About bcrypt

This app uses bcrypt to hash passwords. If you are on a Windows machine, the
process to build bcrypt is something else. You've got two options:

1. Just use `bcrypt-nodejs`. To do that, delete the line `"bcrypt": "^3.0.6",`
   in your `package.json` file and then run `yarn add bcrypt-nodejs` or
   `npm install bcrypt-nodejs`.

2. Click [here](https://www.npmjs.com/package/bcrypt) to go to the NPM
   page for bcrypt, look at the **Dependencies** section, make sure you have all of
   those dependencies installed (which includes the node-gyp dependencies which you
   can find on their Github repo page [here](https://github.com/nodejs/node-gyp) in
   the **Dependencies** section). Then, install bcrypt as a project dependency.
   Good luck! (And use a \*nix system next time ;) )
