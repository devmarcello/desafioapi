// HomePage.js
import React from 'react';
import styled from 'styled-components';
import ButtonGroup from '../components/buttongroup';
import RegisterPeopleButton from '../components/registerpeoplebutton';
import ShowPeople from '../components/showpeople';


const PageContainer = styled.div`
  background-color: #1e3c72; 
  color: white; 
  padding: 20px; 
  min-height: 100vh; 
  display: flex;
  justify-content: center; 
  align-items: center; 
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px; 
`;

const HomePage = ({ showButtons, hideButtons }) => {
  return (
    <PageContainer>
      <ButtonGroup>
        <ButtonContainer>
          {showButtons && ( 
            <>
              <RegisterPeopleButton onClick={hideButtons}>Cadastrar</RegisterPeopleButton>
              <ShowPeople>Listar</ShowPeople>
              
            </>
          )}
        </ButtonContainer>
      </ButtonGroup>
    </PageContainer>
  );
};

export default HomePage;
