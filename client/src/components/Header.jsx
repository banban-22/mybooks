// import Link from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { IoIosArrowDown } from 'react-icons/io';
import { CURRENT_USER } from '../queries/CurrentUser';

const Header = ({}) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { data } = useQuery(CURRENT_USER);
  const handleClick = () => {
    console.log('clicked');
  };

  const handleClickMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <>
      <div className="w-full h-full flex justify-between items-center mx-auto py-5 bg-primary-light">
        <p className="px-10 text-4xl font-bold tracking-widest">MyBooks</p>
        <div>
          <div className="px-10 flex gap-3 items-center">
            {data.user.name}
            <IoIosArrowDown onClick={handleClickMenu} />
          </div>
        </div>
      </div>
      {toggleMenu && (
        <div className="absolute right-6 top-16 border rounded bg-white">
          <ul className="">
            <li className="hover:bg-slate-100 cursor-pointer px-5 py-2">
              Setting
            </li>
            <li className="hover:bg-slate-100 cursor-pointer px-5 py-2">
              Sign Out
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
export default Header;
