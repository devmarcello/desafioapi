import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #2980b9; 
  color: white; 
  border: none; 
  padding: 10px 20px; 
  border-radius: 5px; 
  margin: 5px; 
  width: 200px; 
  height: 50px; 
  margin: 5px; 
`;

const RegisterPeople = ({ onClick }) => {
  return (
    <div>
      <StyledButton onClick={onClick}>Cadastrar</StyledButton>
    </div>
  );
};

export default RegisterPeople;
