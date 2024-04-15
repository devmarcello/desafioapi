import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledBackButton = styled(Link)`
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: #2980b9;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
`;

const BackButton = ({ to, children }) => {
  return (
    <StyledBackButton to={to}>
      {children}
    </StyledBackButton>
  );
};

export default BackButton;
