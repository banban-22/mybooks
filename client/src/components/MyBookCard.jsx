import { useState } from 'react';
import Modal from './Modal';
import MyBooksDetails from './MyBooksDetails';

const MyBookCard = ({ book }) => {
  const [modalShow, setModalShow] = useState(false);
  const { author, title, image, description, status, summary, created_at } =
    book;

  const renderDescription = () => {
    const originalDescription = description;
    const words = originalDescription.split(' ');
    const maxWords = 20;
    const truncatedDescription = words.slice(0, maxWords).join(' ') + '...';

    return { __html: truncatedDescription };
  };

  return (
    <div className="border p-5 h-auto rounded-xl items-center justify-center flex flex-col text-center">
      <img src={image} alt={title} />
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="text-sm text-gray-500">{author}</div>
      {/* <div className="text-sm" dangerouslySetInnerHTML={renderDescription()} /> */}
      <button
        onClick={() => setModalShow(true)}
        className="w-full bg-primary-bg-light rounded-full mt-3 py-2 shadow-md"
      >
        Show More
      </button>

      {modalShow && (
        <Modal onClose={() => setModalShow(false)}>
          <MyBooksDetails onClose={() => setModalShow(false)} book={book} />
        </Modal>
      )}
    </div>
  );
};

export default MyBookCard;
