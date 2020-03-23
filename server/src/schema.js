const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
  id: ID!
  name: String!
  patronymic: String!
  surname: String!
}

type Query {
  me: User
}
`;

module.exports = typeDefs;