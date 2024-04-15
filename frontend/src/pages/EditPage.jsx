import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import BackButton from '../components/backbutton';
import { useNavigate, useParams } from 'react-router-dom';

const EditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    birthdayDate: '',
    status: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/people/${id}`);
        const { name, gender, birthdayDate, status } = response.data;
        const formattedBirthdayDate = new Date(birthdayDate).toISOString().slice(0, 10);
        setFormData({ name, gender, birthdayDate: formattedBirthdayDate, status });
      } catch (error) {
        console.error('Erro ao buscar dados da pessoa:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleBackButtonClick = () => {
    navigate('/list');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:4000/people/${id}`, {
        name: formData.name,
        gender: formData.gender,
        birthdayDate: formData.birthdayDate,
        status: formData.status
      });

      alert('Dados atualizados com sucesso!');
      navigate('/list');
    } catch (error) {
      console.error('Erro ao atualizar dados da pessoa:', error);
    }
  };

  return (
    <FormContainer>
      <BackButton to="/list" onClick={handleBackButtonClick}>
        Voltar
      </BackButton>
      <h1 style={{ color: 'black' }}>Editar Pessoa</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Nome:</FormLabel>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Sexo:</FormLabel>
          <select
            name="gender"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          >
            <option value="">Selecione</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
        </FormGroup>
        <FormGroup>
          <FormLabel>Data de Nascimento:</FormLabel>
          <input
            type="date"
            name="birthdayDate"
            value={formData.birthdayDate}
            onChange={(e) => setFormData({ ...formData, birthdayDate: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Estado civil:</FormLabel>
          <select
            name="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="">Selecione</option>
            <option value="Solteiro(a)">Solteiro(a)</option>
            <option value="Casado(a)">Casado(a)</option>
            <option value="Divorciado(a)">Divorciado(a)</option>
            <option value="Separado(a)">Separado(a)</option>
            <option value="Viúvo(a)">Viúvo(a)</option>
          </select>
        </FormGroup>
        <SubmitButton type="submit">Salvar Alterações</SubmitButton>
      </Form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  background-color: #ccc;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 300px;
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

export default EditPage;
