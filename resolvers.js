const Post = require("./models/Post");

const resolvers = {
  Query: {
    hello: () => "Hello world",
    getAllPosts: async () => {
      try {
        return await Post.find();
      } catch (error) {
        "Error in getAllPosts resolver: ", error;
      }
    },
  },

  Mutation: {
    createPost: async (parent, args, context, info) => {
      const { title, description } = args.post;
      const newPost = new Post({ title, description });

      try {
        const savedPost = newPost.save();
        return savedPost;
      } catch (error) {
        console.log("error:", error);
        "Error in createPost resolver: ", error;
      }
    },
  },
};

module.exports = resolvers;
