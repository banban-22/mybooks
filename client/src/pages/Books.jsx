import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../queries/CurrentUser';

const Books = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(CURRENT_USER);
  console.log(data);

  useEffect(() => {
    if (data.user) navigate('/books');
  }, [data.user, navigate]);
  return <div>Books</div>;
};
export default Books;
