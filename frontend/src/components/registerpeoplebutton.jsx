import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterPeople from './registerpeople';

const RegisterPeopleButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/register');
  };

  return <RegisterPeople onClick={handleClick} />;
};

export default RegisterPeopleButton;
