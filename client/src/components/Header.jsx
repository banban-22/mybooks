// import Link from 'react-router-dom';

const Header = () => {
  return (
    <div className="w-full h-full flex justify-between items-center mx-auto bg-primary-light">
      <p className="px-10 text-4xl font-bold tracking-widest">MyBooks</p>
      <div>
        <ul className="px-10 flex gap-5">
          <li>Books</li>
          <li>Name</li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
