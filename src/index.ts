import express from "express";
import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { myDataSource } from "./app-data-source";
import { typeDefs } from "./shema";
import { resolvers } from "./resolvers";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

const PORT = process.env.SERVER_PORT || 4000;

app.listen(PORT, () => {
  console.log(
    `Server running at http://localhost:${PORT}${server.graphqlPath}`
  );
});
