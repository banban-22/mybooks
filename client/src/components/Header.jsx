import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { IoIosArrowDown } from 'react-icons/io';
import { CURRENT_USER } from '../queries/CurrentUser';
import mutation from '../mutations/Logout';

const Header = () => {
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);
  const { data } = useQuery(CURRENT_USER);
  const [logoutMutation] = useMutation(mutation, {
    refetchQueries: [{ CURRENT_USER }],
  });

  const handleClickLogout = async () => {
    try {
      const { data } = await logoutMutation();
      console.log(data?.user);
      if (data && data.logout) {
        navigate('/login');
      } else {
        console.error('Logout Failed');
      }
    } catch (error) {
      console.error('Logout Error: ', error);
    }
  };

  const handleClickMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  if (!data || !data.user) {
    return null;
  }

  return (
    <>
      <div className="w-full h-full flex justify-between items-center mx-auto py-5 bg-primary-light">
        <p className="px-10 text-4xl font-bold tracking-widest">MyBooks</p>
        <div>
          <div
            className="px-10 flex gap-3 items-center cursor-pointer"
            onClick={handleClickMenu}
          >
            {data?.user?.name}
            <IoIosArrowDown />
          </div>
        </div>
      </div>

      {toggleMenu && (
        <div className="absolute right-6 top-16 border rounded bg-white">
          <ul className="">
            <li className="hover:bg-slate-100 cursor-pointer px-5 py-2">
              Setting
            </li>
            <li
              className="hover:bg-slate-100 cursor-pointer px-5 py-2"
              onClick={handleClickLogout}
            >
              LogOut
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
export default Header;
