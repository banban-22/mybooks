import { gql } from 'graphql-tag';

const mutation = gql`
  mutation {
    logout {
      id
      email
    }
  }
`;

export default mutation;
