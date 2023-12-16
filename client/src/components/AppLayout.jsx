import { useQuery } from '@apollo/client';
import { Outlet, useNavigation } from 'react-router-dom';
import { CURRENT_USER } from '../queries/CurrentUser';
// import RequireAuth from './RequireAuth';
import Loader from './Loader';
import Header from './Header';

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const { data } = useQuery(CURRENT_USER);

  return (
    <>
      {isLoading && <Loader />}

      <div>
        {data?.user && <Header />}
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};
export default AppLayout;
