import { IResolvers, gql } from "apollo-server-express";
import { myDataSource } from "./app-data-source";
import { Blog } from "./entity/Blog";
import { User } from "./entity/User";

export const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    blogs: [Blog!]
  }

  type Blog {
    id: ID!
    title: String!
    content: String!
    createdAt: String
    updatedAt: String
    user: User!
  }

  type Query {
    blogs: [Blog!]
    blog(id: ID!): Blog
    users: [User!]
    user(id: ID!): User
    me: User
  }

  type Mutation {
    addBlog(blog: AddBlog): Blog
    updateBlog(updateBlog: UpdateBlog): Blog
    addUser(user: AddUser): User
    updateUser(updatedUser: UpdateUser): User
    assignBlog(assignedBlog: AssignBlog): User
    unassignBlog(unassignedBlog: AssignBlog): User
  }

  input AddBlog {
    title: String!
    content: String!
    userId: ID!
  }

  input UpdateBlog {
    blogId: ID!
    blog: AddBlog!
  }

  input AddUser {
    firstName: String!
    lastName: String!
  }

  input UpdateUser {
    id: ID!
    user: AddUser!
  }

  input AssignBlog {
    userId: ID!
    blogId: ID!
  }
`;
 