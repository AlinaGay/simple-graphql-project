const users = require('./datasources/user');

const resolvers = {
  Query: {
    me: () => {
        return users[0];
    }
  }
};

module.exports = resolvers;