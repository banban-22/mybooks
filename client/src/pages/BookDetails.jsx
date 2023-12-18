import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import StarRating from '../components/StarRating';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState(null);
  const API_ENDPOINT = `https://www.googleapis.com/books/v1/volumes/${id}`;

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        setBookDetails(data || null);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const renderDescription = () => {
    return { __html: bookDetails.volumeInfo.description };
  };

  return (
    <div>
      <Header />
      <button
        className="mt-5 w-4/5 text-start mx-auto flex"
        onClick={handleGoBack}
      >
        {' '}
        &lt; Back
      </button>
      {bookDetails && (
        <div className="flex gap-10 w-4/5 justify-center items-center mx-auto mt-10 ">
          <div className="w-2/5 bg-[#F9F9F8]">
            <img
              src={bookDetails.volumeInfo.imageLinks.thumbnail}
              alt={bookDetails.volumeInfo.title}
              className="w-full p-10"
            />
          </div>
          <div className="w-3/5">
            <h2 className="text-4xl font-black">
              {bookDetails.volumeInfo.title}
            </h2>
            <p className="text-xl text-gray-400">
              {bookDetails.volumeInfo.authors.join(', ')}
            </p>
            {bookDetails.volumeInfo.averageRating ? (
              <div className="flex gap-2">
                <StarRating
                  max={5}
                  current={bookDetails.volumeInfo.averageRating}
                />
                <div className="text-gray-400">&#124;</div>
                <p className="text-gray-400">
                  {bookDetails.volumeInfo.publishedDate}
                </p>
              </div>
            ) : (
              <p className="text-gray-400">
                {bookDetails.volumeInfo.publishedDate}
              </p>
            )}
            <hr className="mt-5" />
            <div className="mt-5">
              <p className="text-lg font-semibold">Overview</p>
              <p dangerouslySetInnerHTML={renderDescription()} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BookDetails;
