require("dotenv").config();

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  await apolloServer.start(); // recommended to start the apollo server first, before listening to the app on any port
  apolloServer.applyMiddleware({ app }); // default path is localhost:4000/graphql

  app.use((req, res) => res.send("Hello from express-apollo server"));

  await mongoose.connect(`${process.env.MONGO_DB_URL}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  console.log("Mongoose connected!");

  app.listen(`${process.env.PORT}`, () =>
    console.log("Server initialized on PORT 4000")
  );
}

startServer();
