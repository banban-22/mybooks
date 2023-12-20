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
    // status.trim() === 'Want to read' && (
    <div className="gap-10 border p-5 h-72 rounded-xl">
      {/* <div className="bg-primary-light rounded-full px-5 py-2 w-1/3 mt-5 text-center mx-auto text-xs">
        {status}
      </div> */}
      <img src={image} alt={title} />
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="text-xl text-gray-500">{author}</div>
      <div className="text-sm" dangerouslySetInnerHTML={renderDescription()} />
      <button onClick={() => setModalShow(true)}>Show More</button>

      {modalShow && (
        <Modal onClose={() => setModalShow(false)}>
          <MyBooksDetails onClose={() => setModalShow(false)} />
        </Modal>
      )}
    </div>
  );
};

export default MyBookCard;

{
  /* <div>{summary}</div>
      <div>{created_at}</div> */
}
