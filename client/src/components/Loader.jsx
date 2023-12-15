import loader from '../assets/loader.svg';

const Loader = () => {
  return (
    <div role="status">
      <img src={loader} alt="Loading...." />
    </div>
  );
};
export default Loader;
