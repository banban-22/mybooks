const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = graphql;
const User = require('../models/User');
const Book = require('../models/Book');
const AuthService = require('../services/auth');
const GraphQLDate = require('../scalar/Date');

// User Type
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

// Book Type
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    summary: { type: GraphQLString },
    description: { type: GraphQLString },
    author: { type: GraphQLString },
    created_at: { type: GraphQLDate },
    status: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parent, args, req) {
        return req.user;
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find();
      },
    },
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Book.findById(args.id);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args, req) {
        const { name, email, password } = args;
        return AuthService.signup({ name, email, password, req });
      },
    },
    logout: {
      type: UserType,
      resolve(parent, args, req) {
        return new Promise((resolve, reject) => {
          if (!req.isAuthenticated()) {
            throw new Error('User is not authenticated!');
          }
          const currentUser = req.user;
          req.logout((err) => {
            if (err) {
              console.error('Error during logout: ', err);
              throw new Error('Logout Failed');
            }
          });

          req.session.regenerate((regenerateErr) => {
            if (regenerateErr) {
              console.error('Error regenerating session: ', regenerateErr);
            }
            resolve(currentUser);
          });
        });
      },
    },

    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args, req) {
        try {
          const { email, password } = args;
          const user = AuthService.login({ email, password, req });
          return user;
        } catch (err) {
          console.error('Login Error: ', err);
          throw err;
        }
      },
    },

    addBook: {
      type: BookType,
      args: {
        title: { type: GraphQLString },
        summary: { type: GraphQLString },
        description: { type: GraphQLString },
        author: { type: GraphQLString },
        created_at: { type: GraphQLDate },
        status: {
          type: new GraphQLEnumType({
            name: 'BookStatus',
            values: {
              new: { value: 'Want to read' },
              progress: { value: 'Reading' },
              completed: { value: 'Completed' },
            },
          }),
        },
        userId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args, req) {
        if (!req.isAuthenticated()) {
          throw new Error('User is not authenticated');
        }
        const defaultCreatedAt = new Date();
        const book = new Book({
          title: args.title,
          summary: args.summary,
          description: args.description,
          author: args.author,
          created_at: args.created_at || defaultCreatedAt,
          status: args.status,
          userId: req.user.id,
        });
        return book.save();
      },
    },

    deleteBook: {
      type: BookType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Book.findByIdAndDelete(args.id);
      },
    },

    updateBook: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        summary: { type: GraphQLString },
        description: { type: GraphQLString },
        author: { type: GraphQLString },
        created_at: { type: GraphQLDate },
        status: {
          type: new GraphQLEnumType({
            name: 'BookStatusUpdate',
            values: {
              new: { value: 'Want to read' },
              progress: { value: 'Reading' },
              completed: { value: 'Completed' },
            },
          }),
        },
      },

      resolve(parent, args) {
        return Book.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.title,
              summary: args.summary,
              description: args.description,
              author: args.author,
              created_at: args.created_at,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation });
