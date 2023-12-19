import { useMutation, useApolloClient } from '@apollo/client';
import { ADD_BOOK, GET_BOOKS } from '../mutations/bookQueries';
import { useParams } from 'react-router-dom';

const AddBooks = ({ bookDetails }) => {
  const { userId } = useParams();
  const client = useApolloClient();
  const [addBookMutation] = useMutation(ADD_BOOK, {
    update(cache, { data: { addBook } }) {
      const { books } = cache.readQuery({ query: GET_BOOKS });

      cache.writeQuery({
        query: GET_BOOKS,
        data: { books: [...books, addBook] },
      });
    },
  });

  const handleAddToMyBooks = async () => {
    try {
      const { data } = await addBookMutation({
        variables: {
          title: bookDetails.volumeInfo.title || '',
          summary: '',
          description: bookDetails.volumeInfo.description || '',
          author: bookDetails.volumeInfo.authors?.join(', '),
          status: 'completed',
          userId: userId,
        },
        refetchQueries: [{ query: GET_BOOKS }],
      });

      const cachedData = client.readQuery({ query: GET_BOOKS });
      const books = cachedData?.books || [];
      console.log(books);

      client.writeQuery({
        query: GET_BOOKS,
        data: { books: [...books, data.addBook] },
      });

      alert(`${data.addBook.title} added to your collection!`);
    } catch (error) {
      console.error('Error in handleAddToMyBooks:', error);
    }
  };

  return <button onClick={handleAddToMyBooks}>Add To My Books</button>;
};
export default AddBooks;
