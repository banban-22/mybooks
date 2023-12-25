import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ReactPaginate from 'react-paginate';
import { CURRENT_USER } from '../queries/CurrentUser';
import Header from '../components/Header';
import Input from '../components/Input';
import { RiSearchLine } from 'react-icons/ri';

const Books = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(CURRENT_USER);
  const [bookData, setBookData] = useState([]);
  const [title, setTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const startIndex = Math.max(0, (currentPage - 1) * itemsPerPage);
  const API_ENDPOINT = `https://www.googleapis.com/books/v1/volumes?q=${title}&startIndex=${startIndex}&maxResults=${itemsPerPage}`;

  const fetchBook = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      setBookData((prevData) => [...prevData, ...(data.items || [])]);
      setTotalItems(data.totalItems || 0);

      if (data.items && data.items.length === itemsPerPage) {
        setCurrentPage((prevPage) => prevPage + 1);
        debounceFetchBook();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Waiting 1000ms for searching
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const debounceFetchBook = debounce(fetchBook, 1000);

  useEffect(() => {
    if (data.user) navigate(`/books/${data.user.id}`);
  }, [data.user, navigate]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setCurrentPage(1);
    debounceFetchBook();
  };

  const handlePageClick = (data) => {
    // const selectedPage = (data.selected * itemsPerPage) % totalItems;
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
    debounceFetchBook();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    debounceFetchBook();
  };

  return (
    <div>
      <Header />
      <form
        className="flex flex-col items-center aligns-center w-full mx-auto justify-center bg-primary-bg-light gap-4"
        onSubmit={handleFormSubmit}
      >
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
        {bookData.map((item, index) => (
          <Link
            key={`${item.id}-${index}`}
            to={`/books/${data.user?.id}/${item.id}`}
            className="border max-w-sm py-4 px-5 rounded-lg"
          >
            <div className="flex flex-col items-center text-center">
              <img src={item.volumeInfo.imageLinks?.smallThumbnail} alt="" />
              <p className="text-lg font-bold">{item.volumeInfo.title}</p>
              <p>{item.volumeInfo.authors || 'NA'}</p>
            </div>
          </Link>
        ))}
      </div>
      {totalItems > 10 && (
        <div className="flex justify-center mt-4">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            pageCount={Math.ceil(totalItems / itemsPerPage)}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName="pagination flex gap-3 items-center"
            pageClassName="border p-3 w-10 h-10 rounded-full flex items-center justify-center hover:cursor-pointer"
            activeClassName="active bg-primary text-white"
          />
        </div>
      )}
    </div>
  );
};
export default Books;
