import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({
  icon,
  type,
  value,
  placeholder,
  onChange,
  name,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleToggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <label htmlFor={name}>{name}</label>
      <div className="flex gap-3 items-center justify-start border rounded-lg px-5 py-4 mb-5 bg-white border-none">
        <div className="icon">{icon && <div>{icon}</div>}</div>
        <input
          type={showPassword ? 'text' : type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          id={name}
          className="outline-none"
        />
        {type === 'password' && (
          <div className="" onClick={handleToggleShowPassword}>
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        )}
      </div>
    </>
  );
};
export default Input;
