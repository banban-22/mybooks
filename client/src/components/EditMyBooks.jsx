import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_BOOK, UPDATE_BOOK } from '../mutations/bookQueries';
import StarRating from './StarRating';

const EditMyBooks = ({ book }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState(book.title || '');
  const [author, setAuthor] = useState(book.author || '');
  const [description, setDescription] = useState(book.description || '');
  const [summary, setSummary] = useState(book.summary || '');
  const [rating, setRating] = useState(book.rating || 0);
  const [image, setImage] = useState(book.image || '');
  const [createdAt, setCreatedAt] = useState(book.created_at || '');
  const [status, setStatus] = useState(() => {
    switch (book.status) {
      case 'Want to read':
        return 'new';
      case 'Reading':
        return 'progress';
      case 'Completed':
        return 'completed';
      default:
        throw new Error(`Unknown status: ${book.status}`);
    }
  });

  const [updateBook] = useMutation(UPDATE_BOOK, {
    variables: {
      id: book.id,
      author,
      title,
      image,
      description,
      status,
      rating,
      summary,
      createdAt,
    },
    refetchQueries: [{ query: GET_BOOK, variables: { id: book.id } }],
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log('Mutation Variables:', {
      id: book.id,
      author,
      title,
      image,
      description,
      status,
      rating,
      summary,
      createdAt,
    });

    // const formattedDate = new Date(createdAt).toISOString().split('T')[0];
    const timestamp = 1703463927955;
    const date = new Date(timestamp);

    const formattedDate = date
      .toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\//g, '-');

    console.log(formattedDate);

    try {
      const result = await updateBook({
        variables: {
          id: book.id,
          author,
          title,
          image,
          description,
          summary,
          rating,
          status,
          createdAt: formattedDate,
        },
      });
      console.log(result);
    } catch (error) {
      console.error('Update error:', error);
    }

    setIsFormOpen(false);
  };

  const handleFormOpen = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div>
      <button
        onClick={handleFormOpen}
        className="bg-primary-bg-light px-5 py-3 mt-5 rounded-full shadow-md"
      >
        Update Details
      </button>

      {isFormOpen && (
        <div className="flex flex-col justify-ceneter gap-5 mt-5 rounded-lg w-full">
          <form onSubmit={onSubmit}>
            {/* Input Rating */}
            <div className="mb-3 flex items-center justify-start">
              <label htmlFor="" className="pr-10">
                Rating
              </label>
              <input
                type="number"
                id="rating"
                value={rating}
                className="border-2 border-gray-200 p-3 rounded-lg outline-none w-4/5"
                onChange={(e) => setRating(parseFloat(e.target.value))}
                max={5}
              />
            </div>
            {/* Input Title */}
            <div className="mb-3 flex items-center justify-between">
              <label htmlFor="" className="pr-10">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                className="border-2 border-gray-200 p-3 rounded-lg outline-none w-4/5"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Input Author */}
            <div className="mb-3 flex items-center justify-between">
              <label htmlFor="" className="">
                Author
              </label>
              <input
                type="text"
                id="author"
                value={author}
                className="border-2 border-gray-200 p-3 rounded-lg outline-none w-4/5"
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            {/* Input Image */}
            <div className="mb-3 flex items-center justify-between">
              <label htmlFor="" className="text-sm">
                Image URL
              </label>
              <input
                type="text"
                id="image"
                value={image}
                className="border-2 border-gray-200 p-3 rounded-lg outline-none w-4/5"
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            {/* Input Description */}
            <div className="mb-3 flex items-center justify-between">
              <label htmlFor="" className="text-sm">
                Description
              </label>
              <textarea
                type="text"
                id="description"
                value={description}
                className="border-2 border-gray-200 p-3 rounded-lg outline-none w-4/5"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Input Summary */}
            <div className="mb-3 flex items-center justify-between">
              <label
                htmlFor=""
                className="pr-6 items-center align-center h-auto"
              >
                Note
              </label>
              <textarea
                type="text"
                id="summary"
                value={summary}
                className="border-2 border-gray-200 p-3 rounded-lg outline-none w-4/5"
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>

            {/* Input Status */}
            <div className="mb-3 flex items-center justify-between">
              <label htmlFor="" className="">
                Status
              </label>
              <select
                className="border-2 border-gray-200 p-3 rounded-lg outline-none w-4/5"
                name="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="new">Want to read</option>
                <option value="progress">Reading</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Input Created_at */}
            <div className="mb-3 flex items-center justify-between">
              <label htmlFor="" className="flex">
                Create At
              </label>
              <input
                type="date"
                id="createdAt"
                value={createdAt}
                className="border-2 border-gray-200 p-3 rounded-lg outline-none w-4/5"
                onChange={(e) => setCreatedAt(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="py-3 px-5 border border-orange-400 rounded-xl shadow-xl hover:bg-primary-bg-light hover:text-white transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default EditMyBooks;
