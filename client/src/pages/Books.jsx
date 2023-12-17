import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../queries/CurrentUser';
import Header from '../components/Header';
import Input from '../components/Input';
import { RiSearchLine } from 'react-icons/ri';

const Books = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(CURRENT_USER);
  console.log(data);
  const [bookData, setBookData] = useState([]);
  const [title, setTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const API_ENDPOINT = `https://www.googleapis.com/books/v1/volumes?q=${title}&startIndex=${
    (currentPage - 1) * itemsPerPage
  }&maxResults=${itemsPerPage}`;

  const fetchBook = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      setBookData(data.items || []);
      setTotalItems(data.totalItems || 0);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(totalItems);

  // Waiting 500ms for searching
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const debounceFetchBook = debounce(fetchBook, 1000);

  useEffect(() => {
    if (data.user) navigate('/books');
  }, [data.user, navigate]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setCurrentPage(1);
    debounceFetchBook();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    debounceFetchBook();
  };

  return (
    <div>
      <Header />
      <form className="flex flex-col items-center aligns-center w-full mx-auto justify-center bg-primary-bg-light gap-4">
        <Input
          icon={<RiSearchLine />}
          type="text"
          placeholder="Search"
          name=""
          value={title}
          onChange={(e) => handleTitleChange(e, 'title')}
          className=" border mt-5"
        />
      </form>

      <div className="grid grid-cols-5 grid-flow-row gap-4 w-4/5 mx-auto">
        {bookData.map((item) => (
          <div key={item.id} className="border max-w-sm py-4 px-5 rounded-lg">
            <div className="flex flex-col items-center text-center">
              <img src={item.volumeInfo.imageLinks?.smallThumbnail} alt="" />
              <p className="text-lg font-bold">{item.volumeInfo.title}</p>
              <p>{item.volumeInfo.authors || 'NA'}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(totalItems / itemsPerPage) },
          (_, index) => (
            <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};
export default Books;
