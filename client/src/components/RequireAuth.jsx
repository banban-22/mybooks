import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CURRENT_USER } from '../queries/CurrentUser';
import Loader from './Loader';

const RequireAuth = ({ children }) => {
  const { loading, error, data } = useQuery(CURRENT_USER);
  const navigate = useNavigate();

  if (loading) return <Loader />;

  if (error || !data?.user) {
    console.log('User not authenticated. Redirecting to login...');
    navigate('/login');
    return null;
  }

  return <>{children}</>;
};
export default RequireAuth;
