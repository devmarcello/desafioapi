import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import BackButton from '../components/backbutton';
import { useNavigate, useParams } from 'react-router-dom';
import completeAddress from '../api/viacep';

const AddAddressPage = () => {
  const states = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  const navigate = useNavigate();
  const { id } = useParams();

  
  const [addressData, setAddressData] = useState({
    zipcode: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    state: '',
    city: ''
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'zipcode') {
      autoCompleteAddress(value); 
    }
  };

 
  const autoCompleteAddress = async (cep) => {
    if (cep.length === 8) { 
      try {
        const address = await completeAddress(cep); 
        if (address) { 
          setAddressData(prevState => ({
            ...prevState,
            address: address.logradouro,
            neighborhood: address.bairro,
            city: address.localidade,
            state: address.uf
          }));
        }
      } catch (error) {
        console.error('Erro ao completar o endereço:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const addressDataToSend = {
      ...addressData,
      zipcode: Number(addressData.zipcode),
      number: Number(addressData.number)
    };
  
    try {
      await axios.post(`http://localhost:4000/people/${id}/addresses`, addressDataToSend);
      alert('Endereço adicionado com sucesso!');
      navigate(`/list`); 
    } catch (error) {
      console.error('Erro ao adicionar endereço:', error);
    }
  };

  return (
    <FormContainer>
      <BackButton to="/list">Voltar</BackButton>
      <h1 style={{ color: 'black' }}>Adicionar Endereço</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>CEP:</FormLabel>
          <input type="text" name="zipcode" value={addressData.zipcode} onChange={handleAddressChange} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Endereço:</FormLabel>
          <input type="text" name="address" value={addressData.address} onChange={handleAddressChange} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Número:</FormLabel>
          <input type="text" name="number" value={addressData.number} onChange={handleAddressChange} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Complemento:</FormLabel>
          <input type="text" name="complement" value={addressData.complement} onChange={handleAddressChange} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Bairro:</FormLabel>
          <input type="text" name="neighborhood" value={addressData.neighborhood} onChange={handleAddressChange} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Cidade:</FormLabel>
          <input type="text" name="city" value={addressData.city} onChange={handleAddressChange} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Estado:</FormLabel>
          <select name="state" value={addressData.state} onChange={handleAddressChange}>
            <option value="">Selecione</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </FormGroup>
        <SubmitButton type="submit">Adicionar</SubmitButton>
      </Form>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  background-color: #ccc;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  color: black; /* Cor do texto preto */
`;

const SubmitButton = styled.button`
  background-color: #1e3c72;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #142841;
  }
`;

export default AddAddressPage;
