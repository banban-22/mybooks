import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_BOOK, UPDATE_BOOK } from '../mutations/bookQueries';

const EditMyBooks = ({ book }) => {
  console.log(book.id);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState(book.title || '');
  const [author, setAuthor] = useState(book.author || '');
  const [description, setDescription] = useState(book.description || '');
  const [summary, setSummary] = useState(book.summary || '');
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
      summary,
      createdAt,
    });

    const formattedDate = new Date(createdAt).toISOString().split('T')[0];
    try {
      console.log('Before calling updateBook');
      const result = await updateBook({
        variables: {
          id: book.id,
          author,
          title,
          image,
          description,
          summary,
          status,
          createdAt: formattedDate,
        },
      });
      console.log('After calling updateBook');
      console.log(result); // Check the result in the console
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
        <div className="flex flex-col items-center justify-ceneter gap-5 mt-5 rounded-lg w-full mx-auto p-x-5">
          <form onSubmit={onSubmit}>
            {/* Input Title */}
            <div className="mb-3">
              <label htmlFor="" className="pr-14">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                className="border-2 border-gray-200 p-3 rounded outline-none"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Input Author */}
            <div className="mb-3 flex items-center">
              <label
                htmlFor=""
                className="pr-6 items-center align-center h-auto"
              >
                Author
              </label>
              <input
                type="text"
                id="author"
                value={author}
                className="border-2 border-gray-200 p-3 rounded outline-none"
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            {/* Input Image */}
            <div className="mb-3 flex items-center">
              <label
                htmlFor=""
                className="pr-6 items-center align-center h-auto"
              >
                Image URL
              </label>
              <input
                type="text"
                id="image"
                value={image}
                className="border-2 border-gray-200 p-3 rounded outline-none"
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            {/* Input Description */}
            <div className="mb-3 flex items-center">
              <label
                htmlFor=""
                className="pr-6 items-center align-center h-auto"
              >
                Description
              </label>
              <textarea
                type="text"
                id="description"
                value={description}
                className="border-2 border-gray-200 p-3 rounded outline-none"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Input Summary */}
            <div className="mb-3 flex items-center">
              <label
                htmlFor=""
                className="pr-6 items-center align-center h-auto"
              >
                Summary Note
              </label>
              <textarea
                type="text"
                id="summary"
                value={summary}
                className="border-2 border-gray-200 p-3 rounded outline-none"
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>

            {/* Input Status */}
            <div className="mb-3 flex items-center">
              <label htmlFor="" className="pr-5 mr-10">
                Status
              </label>
              <select
                className="border-2 border-gray-200 p-3 outline-none rounded-xl"
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
            <div className="mb-3 flex items-center">
              <label
                htmlFor=""
                className="pr-6 items-center align-center h-auto"
              >
                Create Date
              </label>
              <input
                type="date"
                id="createdAt"
                value={createdAt}
                className="border-2 border-gray-200 p-3 rounded outline-none"
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

//   const { author, title, image, description, status, summary, created_at } =
//     book;

// http://books.google.com/books/publisher/content?id=urbSDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE70xiP1UDVjmeXr8sZgsUlPWVdibUKPwtLpgbsoGVWqIj-5hd8rk34n3jxWSOSfWYBWHicpbaMgECRuENStBjvhmSu_J3EwLiN7WZK1gyEhHyxcio21JSp_EAUzq0voPalVNBK4p&source=gbs_api
