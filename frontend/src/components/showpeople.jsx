import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled.button`
  background-color: #2980b9; 
  color: white; 
  border: none; 
  padding: 10px 20px; 
  border-radius: 5px; 
  width: 200px; 
  height: 50px; 
  margin: 5px; 
`;

const ShowPeople = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/list'); 
  };

  return (
    <div>
      <StyledButton onClick={handleNavigate}>Listar</StyledButton>
    </div>
  );
};

export default ShowPeople;