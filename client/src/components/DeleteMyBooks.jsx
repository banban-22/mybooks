import { useMutation } from '@apollo/client';
import { DELETE_BOOK } from '../mutations/bookQueries';
import { GET_BOOKS } from '../mutations/bookQueries';
import { RxCross2 } from 'react-icons/rx';

const DeleteMyBooks = ({ bookId }) => {
  const [deleteBook] = useMutation(DELETE_BOOK, {
    variables: { id: bookId },
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure to delete this books?');

    if (confirmDelete) {
      deleteBook();
    }
  };

  return (
    <>
      <button
        onClick={handleDelete}
        className="absolute top-5 right-5 text-xl text-gray-400"
      >
        <RxCross2 />
      </button>
    </>
  );
};
export default DeleteMyBooks;
