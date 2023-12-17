import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CURRENT_USER } from '../queries/CurrentUser';
import Loader from './Loader';

const RequireAuth = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const { loading, error, data } = useQuery(CURRENT_USER);
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialized) {
      return;
    }

    if (error || !data?.user) {
      console.log('User not authenticated. Redirecting to login...');
      console.log(data.user);
      navigate('/login');
    }
  }, [error, data, navigate, initialized]);

  useEffect(() => {
    if (!loading) {
      setInitialized(true);
    }
  }, [loading]);

  if (loading) return <Loader />;
  if (error || !data?.user) return null;

  return <>{children}</>;
};

export default RequireAuth;
