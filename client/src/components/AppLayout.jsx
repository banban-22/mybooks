import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';
import Header from './Header';

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <>
      {isLoading && <Loader />}

      <div>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};
export default AppLayout;
