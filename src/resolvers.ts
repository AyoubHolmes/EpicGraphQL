import { IResolvers } from "apollo-server-express";
import { myDataSource } from "./app-data-source";
import { Blog } from "./entity/Blog";
import { User } from "./entity/User";

export const resolvers: IResolvers = {
  Query: {
    async blogs() {
      const blogRepository = myDataSource.getRepository(Blog);
      return await blogRepository.find({ relations: ["user"] });
    },
    async blog(_, args) {
      const blogRepository = myDataSource.getRepository(Blog);
      const blog = await blogRepository.findOne({
        where: {
          id: args.id,
        },
        relations: ["user"],
      });
      return blog;
    },
    async users() {
      const userRepository = myDataSource.getRepository(User);
      return await userRepository.find({
        relations: ["blogs"],
      });
    },
    async user(_, args) {
      const userRepository = myDataSource.getRepository(User);
      return await userRepository.findOne({
        where: {
          id: args.id,
        },
        relations: ["blogs"],
      });
    },
    me: (_, args) => {},
  },
  //   Blog: {
  //     user: (_, args) => {},
  //   },
  //   User: {
  //     blogs: (_, args) => {},
  //   },
  Mutation: {
    async addBlog(_, args) {
      const userRepository = myDataSource.getRepository(User);
      const blogRepository = myDataSource.getRepository(Blog);
      try {
        const user = await userRepository.findOne({
          where: { id: args.blog.userId },
        });
        if (!user) throw new Error("User not found");
        const savedBlog = await blogRepository.save({
          title: args.blog.title,
          content: args.blog.content,
          user,
        });
        const returnBlog = await blogRepository.findOne({
          where: { id: savedBlog.id },
          relations: ["user", "user.blogs"],
        });
        return returnBlog;
      } catch (error) {
        return error;
      }
    },
    async updateBlog(_, args) {
      const blogRepository = myDataSource.getRepository(Blog);
      try {
        const updatingBlog = await blogRepository.findOne({
          where: { id: args.updateBlog.blogId },
        });
        if (!updatingBlog) throw new Error("User not found");
        return await blogRepository.save({
          id: args.updateBlog.blogId,
          ...args.updateBlog.blog,
        });
      } catch (error) {
        return error;
      }
    },
    async addUser(_, args) {
      const userRepository = myDataSource.getRepository(User);
      return await userRepository.save({ ...args.user });
    },
    async updateUser(_, args) {
      const userRepository = myDataSource.getRepository(User);
      try {
        const updatingUser = userRepository.findOne({
          where: { id: args.updatedUser.id },
        });
        if (!updatingUser) throw new Error("User not found");
        return await userRepository.save({
          id: args.updatedUser.id,
          ...args.updatedUser.user,
        });
      } catch (error) {}
    },
  },
};
