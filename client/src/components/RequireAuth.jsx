import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CURRENT_USER } from '../queries/CurrentUser';
import Loader from './Loader';
import { useEffect } from 'react';

const RequireAuth = ({ children }) => {
  const { loading, error, data } = useQuery(CURRENT_USER);
  const navigate = useNavigate();

  useEffect(() => {
    if (error || !data?.user) {
      console.log('User not authenticated. Redirecting to login...');
      navigate('/login');
    }
  }, [error, data, navigate]);

  if (loading) return <Loader />;
  if (error || !data?.user) return null;

  return <>{children}</>;
};

export default RequireAuth;
