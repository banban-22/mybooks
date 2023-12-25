import { useState } from 'react';
import Star from './Star';
import EditMyBooks from './EditMyBooks';

const MyBooksDetails = ({ book }) => {
  const {
    author,
    title,
    image,
    description,
    rating,
    status,
    summary,
    created_at,
  } = book;

  console.log(book);

  const renderDescription = () => {
    return { __html: description };
  };

  const createdDate = new Date(created_at);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formatDate = createdDate.toLocaleDateString('en-US', options);

  return (
    <>
      <div className="flex gap-10 w-4/5 justify-center items-center mx-auto mt-10 ">
        <div className="w-2/5 bg-[#F9F9F8]">
          <img src={image} alt={title} className="w-full p-10" />
        </div>
        <div className="w-3/5">
          <h2 className="text-4xl font-black">{title}</h2>
          <p className="text-xl text-gray-400">{author}</p>
          <div className="flex gap-2 w-[17rem] items-center ">
            <Star
              max={1}
              current={rating || 'No Rate'}
              style={{
                color: rating ? 'gold' : '#cfcfcf',
                width: '2rem',
              }}
            />
            <p className="font-bold">{rating || 'No Rate'}</p>
            <p className="text-gray-400">&#124;</p>
            {/* <p className="text-gray-400">{formatDate}</p> */}
          </div>

          <hr className="mt-5" />
          <div className="mt-5">
            <p className="text-lg font-semibold">Overview</p>
            <p dangerouslySetInnerHTML={renderDescription()} />
          </div>
          <p className="text-gray-400">Added at: {formatDate}</p>
          {/* <AddBooks book={book} userId={userId} /> */}
          <EditMyBooks book={book} />
        </div>
      </div>
    </>
  );
};
export default MyBooksDetails;
