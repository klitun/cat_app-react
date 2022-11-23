const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    catCount: Int
    saveCats: [Book]
  }

  type Cat {
    _id: ID!
    description: String
    kind: String!
    image: String
    link: String
    name: [String]
  }
   
  input newBook {
    bookId: String
    authors: [String]
    title: String
    description: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
 
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth 
    saveCat(newBook: newCat ): User
    removeCat(bookId: ID!): User
   
  }
`;

module.exports = typeDefs;