import React from 'react';
import styled from 'styled-components';

const ButtonGroupContainer = styled.div`
  background-color: #ccc; 
  padding: 20px; 
  border-radius: 10px;
  
`;

const ButtonGroup = ({ children }) => {
  return (
    <ButtonGroupContainer>
      {children}
    </ButtonGroupContainer>
  );
}

export default ButtonGroup;
