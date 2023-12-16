import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HomeImage from '../assets/homepage.svg';

const Home = () => {
  return (
    <div className="h-screen w-full flex gap-4">
      <img src={HomeImage} alt="" className="w-[50%] object-cover" />
      <motion.div
        className="my-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1 }}
        variants={{
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <div className="flex flex-col before:content-logotext items-center">
          <p className="text-3xl w-[90%]">
            Welcome to our online haven for book enthusiasts, where literature
            comes to life!
          </p>
          <p className="w-[90%] mt-2">
            Discover a diverse collection of books, seamlessly organize your
            reading list, and unveil a universe of literary wonders at your
            fingertips. From tracking your completed reads to managing your
            ongoing literary journeys, our platform is designed to elevate your
            reading experience. Join us on this literary adventure, where every
            page turned brings new stories and endless possibilities. Happy
            reading!
          </p>
          <Link to="signup">
            <button className="mt-10 bg-primary py-3 px-5 shadow-md rounded-full text-lg">
              Sign Up
            </button>
          </Link>
          <div className="flex gap-4 mt-5">
            <p className="">Already have an account?</p>
            <Link to="/login">
              <button className="underline cursor-pointer">login</button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default Home;
