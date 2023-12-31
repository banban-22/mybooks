import { gql } from 'graphql-tag';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      image
      summary
      description
      author
      rating
      created_at
      status
      user {
        id
        name
      }
    }
  }
`;

const GET_BOOK = gql`
  query getBook($id: ID!) {
    book(id: $id) {
      id
      title
      image
      summary
      description
      author
      rating
      status
      user {
        id
        name
        email
      }
    }
  }
`;

const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $image: String!
    $summary: String!
    $description: String!
    $author: String!
    $rating: Float!
    $status: BookStatus!
    $userId: ID!
  ) {
    addBook(
      title: $title
      image: $image
      summary: $summary
      description: $description
      author: $author
      rating: $rating
      status: $status
      userId: $userId
    ) {
      title
      image
      summary
      description
      author
      rating
      status
      user {
        id
        name
      }
    }
  }
`;

const DELETE_BOOK = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
      title
      author
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation updateBook(
    $id: ID!
    $title: String!
    $image: String!
    $summary: String!
    $description: String!
    $author: String!
    $rating: Float!
    $status: BookStatusUpdate
  ) {
    updateBook(
      id: $id
      title: $title
      image: $image
      summary: $summary
      description: $description
      author: $author
      rating: $rating
      status: $status
    ) {
      id
      title
      image
      summary
      description
      author
      rating
      status
      user {
        id
        name
        email
      }
    }
  }
`;

export { GET_BOOKS, GET_BOOK, ADD_BOOK, DELETE_BOOK, UPDATE_BOOK };
