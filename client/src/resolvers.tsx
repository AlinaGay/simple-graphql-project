import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
  me: User
}
`;

export const resolvers = {};