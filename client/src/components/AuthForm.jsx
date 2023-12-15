import { useState } from 'react';

const AuthForm = () => {
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return <div>AuthForm</div>;
};
export default AuthForm;
