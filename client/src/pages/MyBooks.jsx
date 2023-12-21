import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../mutations/bookQueries';
import { CURRENT_USER } from '../queries/CurrentUser';
import Loader from '../components/Loader';
import Header from '../components/Header';
import MyBookCard from '../components/MyBookCard';

const MyBooks = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const { loading, error, data } = useQuery(GET_BOOKS);
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(CURRENT_USER);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData.user) {
      const initialStatusFilter = 'Want to read';
      setStatusFilter(initialStatusFilter);
      navigate(`/mybooks/${userData.user.id}`);
    }
  }, [userData, navigate]);

  if (loading || userLoading) return <Loader />;
  if (error || userError) return <div>{error.message}</div>;

  const currentUser = userData.user;
  const userBooks = data.books.filter(
    (book) => book.user && book.user.name === currentUser.name
  );
  const filteredBooks =
    statusFilter === ''
      ? userBooks
      : userBooks.filter((book) => book.status === statusFilter);

  const handleStatusFilter = (status) => setStatusFilter(status);

  return (
    <>
      <Header handleStatusFilter={handleStatusFilter} />
      {statusFilter === 'Want to read' && (
        <h2 className="w-full flex justify-center mt-5 text-2xl font-bold uppercase">
          Want to Read
        </h2>
      )}
      {statusFilter === 'Reading' && (
        <h2 className="w-full flex justify-center mt-5 text-2xl font-bold uppercase">
          Reading
        </h2>
      )}
      {statusFilter === 'Completed' && (
        <h2 className="w-full flex justify-center mt-5 text-2xl font-bold uppercase">
          Completed
        </h2>
      )}
      {filteredBooks.length > 0 ? (
        <div className="w-4/5 justify-center items-center mx-auto mt-10 grid grid-cols-3 gap-3">
          {filteredBooks.map((book) => (
            <MyBookCard book={book} key={book.id} />
          ))}
        </div>
      ) : (
        <div className="w-full h-screen flex items-center mx-auto justify-center text-5xl">
          No Books on Your List
        </div>
      )}
    </>
  );
};

export default MyBooks;
