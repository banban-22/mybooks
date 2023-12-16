// import Link from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../queries/CurrentUser';

const Header = ({}) => {
  const { data } = useQuery(CURRENT_USER);

  return (
    <div className="w-full h-full flex justify-between items-center mx-auto py-5 bg-primary-light">
      <p className="px-10 text-4xl font-bold tracking-widest">MyBooks</p>
      <div>
        <ul className="px-10 flex gap-5">
          <li>{data.user.name}</li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
