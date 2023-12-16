import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import mutation from '../mutations/Signup';
import { CURRENT_USER } from '../queries/CurrentUser';

import Input from '../components/Input';
import { MdPerson, MdOutlineEmail, MdLock } from 'react-icons/md';

const Signup = ({ user }) => {
  const navigate = useNavigate();
  const [signupMutation] = useMutation(mutation, {
    refetchQueries: [{ CURRENT_USER }],
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  useEffect(() => {
    if (user) navigate('/books');
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(e);

    try {
      const { data } = await signupMutation({
        variables: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
      });
      console.log(data);
      console.log('User signed up:', data.signup);

      if (data.login) {
        navigate('/books');
      }
    } catch (error) {
      console.error('Signup failed: ', error);
    }
  };

  return (
    <div className="flex flex-col items-center aligns-center w-full h-screen mx-auto justify-center bg-primary-bg-light">
      <h1 className="text-2xl font-bold mb-5">SignUp</h1>
      <form className="">
        <Input
          icon={<MdPerson />}
          type="name"
          placeholder="Name"
          name="Name"
          value={formData.name}
          onChange={(e) => handleInputChange(e, 'name')}
        />
        <Input
          icon={<MdOutlineEmail />}
          type="email"
          placeholder="Email"
          name="Email"
          value={formData.email}
          onChange={(e) => handleInputChange(e, 'email')}
        />
        <Input
          icon={<MdLock />}
          type="password"
          placeholder="Password"
          name="Password"
          value={formData.password}
          onChange={(e) => handleInputChange(e, 'password')}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex items-center mx-auto px-5 py-3 bg-primary rounded-full shadow-md"
        >
          SignUp
        </button>
      </form>
    </div>
  );
};
export default Signup;
