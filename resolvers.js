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
    getPost: async (parent, args, context, info) => {
      const { id } = args;

      try {
        return await Post.findById(id);
      } catch (error) {
        "Error in getPost resolver: ", error;
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
        "Error in createPost resolver: ", error;
      }
    },
    deletePost: async (parent, args, context, info) => {
      const { id } = args;

      try {
        await Post.findByIdAndDelete(id);
        return `Post with id ${id} deleted`;
      } catch (error) {
        "Error in createPost resolver: ", error;
      }
    },
    updatePost: async (parent, args, context, info) => {
      const { id } = args;
      const { title, description } = args.post;

      try {
        const post = Post.findByIdAndUpdate(
          id,
          { title, description },
          { new: true }
        );
        return post;
      } catch (error) {
        "Error in update post resolver: ", error;
      }
    },
  },
};

module.exports = resolvers;
