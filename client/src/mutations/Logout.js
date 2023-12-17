import { gql } from 'graphql-tag';

const mutation = gql`
  mutation {
    logout {
      id
      email
      name
    }
  }
`;

export default mutation;
