import { gql } from '@apollo/client';

const CURRENT_USER = gql`
user{
    id
    name
    email
}
`;

export { CURRENT_USER };
