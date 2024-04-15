import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import completeAddress from '../api/viacep';
import axios from 'axios';
import BackButton from '../components/backbutton';
import { useNavigate } from 'react-router-dom';

const RegisterPage = ({hideButtonsOff}) => {
const states = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
const navigate = useNavigate()

  useEffect(() => {
    hideButtonsOff();
  }, [hideButtonsOff]);
  const handleBackButtonClick = () => {
    hideButtonsOff(); 
  };
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    birthdayDate: '',
    status: '',
    addresses: [{ zipcode: '', address: '', number: '', complement: '', neighborhood: '', state: '', city: '' }]
  });


 // Função pra mudar o endereço
  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const newAddresses = [...formData.addresses];
    
   
    newAddresses[index][name] = name === 'number' ? parseInt(value, 10) : value;
    
    setFormData(prevState => ({
      ...prevState,
      addresses: newAddresses
    }));
  };
  




  // Função para adicionar novo endereço
  const addAddress = () => {
    setFormData({
      ...formData,
      addresses: [...formData.addresses, { zipcode: '', address: '', number: '', complement: '', neighborhood: '', state: '', city: '' }]
    });
  };

  // Função para excluir endereço
  const removeAddress = (index) => {
    const newAddresses = [...formData.addresses];
    newAddresses.splice(index, 1);
    setFormData({ ...formData, addresses: newAddresses });
  };

  // Função para enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Remover hífens dos CEPs
    const sanitizedAddresses = formData.addresses.map(address => ({
      ...address,
      zipcode: address.zipcode ? parseInt(address.zipcode.toString().replace(/-/g, ''), 10) : undefined
    }));
  
    // Verificar se todos os CEPs têm 8 dígitos
    const invalidCEPIndex = sanitizedAddresses.findIndex(address => address.zipcode && address.zipcode.toString().length !== 8);
    if (invalidCEPIndex !== -1) {
      alert('Por favor, insira um CEP válido');
      return;
    }

    console.log(formData)
  
    try {
      const response = await axios.post('http://localhost:4000/people', {
        name: formData.name,
        gender: formData.gender,
        birthdayDate: formData.birthdayDate,
        status: formData.status,
        addresses: sanitizedAddresses
      });
  
      console.log('Resposta da API:', response.data);

      navigate('/list')
  
    } catch (error) {
      console.error('Erro ao cadastrar pessoa:', error);
    } 
    
    const today = new Date();
    const birthday = new Date(formData.birthdayDate.replace(/-/g, '/')); //Função para corrigir problema de fuso
  
    const todayMonthDay = today.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
    const birthdayMonthDay = birthday.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
  
    if (todayMonthDay === birthdayMonthDay) {
      alert("🎉 Parabéns pelo seu aniversário! 🎉");
    } 

    let age = today.getFullYear() - birthday.getFullYear();
  
    if (today.getMonth() < birthday.getMonth() || (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate())) {
      age--;
    }
  
    const nextBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
    if (nextBirthday <= today) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
  
    const daysUntilNextBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
  
    alert(`Cadastro realizado com sucesso!\n\nIdade: ${age} anos\n🎉 Dias até o próximo aniversário: ${daysUntilNextBirthday}`);
  };
  

  const handleCEP = async (index) => {
    const cep = formData.addresses[index].zipcode;
    if (cep.length === 8 && /^[0-9]+$/.test(cep)) {
      try {
        const addressData = await completeAddress(cep);
        if (addressData) {
          const newAddresses = [...formData.addresses];
          newAddresses[index] = {
            zipcode: addressData.cep,
            address: addressData.logradouro,
            neighborhood: addressData.bairro,
            city: addressData.localidade,
            state: addressData.uf,
            number: '', 
            complement: '' 
          };
          setFormData(prevState => ({
            ...prevState,
            addresses: newAddresses
          }));
        } else {
          console.log('CEP inválido ou não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar endereço:', error);
      }
    }
  };

  return (
    <FormContainer>
      <BackButton to="/" onClick={handleBackButtonClick}>Voltar</BackButton>
      <h1 style={{ color: 'black' }}>Cadastro de pessoa</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Nome:</FormLabel>
          <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required  />
        </FormGroup>
        <FormGroup>
          <FormLabel>Sexo:</FormLabel>
          <select name="gender"  required value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
            <option value="">Selecione</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
        </FormGroup>
        <FormGroup>
          <FormLabel>Data de Nascimento:</FormLabel>
          <input type="date" max="2024-12-31" name="birthdayDate"  value={formData.birthdayDate} onChange={(e) => setFormData({ ...formData, birthdayDate: e.target.value })} required/>
        </FormGroup>
        <FormGroup>
          <FormLabel>Estado civil:</FormLabel>
          <select name="status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} required>
            <option value="">Selecione</option>
            <option value="Solteiro(a)">Solteiro(a)</option>
            <option value="Casado(a)">Casado(a)</option>
            <option value="Divorciado(a)">Divorciado(a)</option>
            <option value="Separado(a)">Separado(a)</option>
            <option value="Viúvo(a)">Viúvo(a)</option>         
          </select>
        </FormGroup>
        <h2 style={{ color: 'black' }}>Endereços:</h2>
        {formData.addresses.map((address, index) => (
          <div key={index}>
            <FormGroup>
              <FormLabel>CEP:</FormLabel>
              <input 
  type="text" 
  name="zipcode" 
  value={address.zipcode} 
  maxLength={8}
  required
  onChange={(e) => {
    const re = /^[0-9\b]+$/; 
    if (e.target.value === '' || re.test(e.target.value))  {
      handleAddressChange(index, e);
      handleCEP(index);
    }
  }} 
/>
            </FormGroup>
            <FormGroup>
              <FormLabel>Endereço:</FormLabel>
              <input type="text" name="address" value={address.address} onChange={(e) => handleAddressChange(index, e)} required />
            </FormGroup>
            <FormGroup>
              <FormLabel>Número:</FormLabel>
              <input type="text" name="number" value={address.number} onChange={(e) => handleAddressChange(index, e)} required />
            </FormGroup>
            <FormGroup>
              <FormLabel>Complemento:</FormLabel>
              <input type="text" name="complement" value={address.complement} onChange={(e) => handleAddressChange(index, e)}required />
            </FormGroup>
            <FormGroup>
              <FormLabel>Bairro:</FormLabel>
              <input type="text" name="neighborhood" value={address.neighborhood} onChange={(e) => handleAddressChange(index, e)} required/>
            </FormGroup>
            <FormGroup>
              <FormLabel>Cidade:</FormLabel>
              <input type="text" name="city" value={address.city} onChange={(e) => handleAddressChange(index, e)} required />
            </FormGroup>
            <FormGroup>
  <FormLabel>Estado:</FormLabel>
  <select name="state" value={formData.addresses[0].state} required onChange={(e) => handleAddressChange(0, e)}>
    <option value="">Selecione</option>
    {states.map(state => (
      <option key={state} value={state}>{state}</option>
    ))}
  </select>
</FormGroup>
            {formData.addresses.length > 1 && (
              <button type="button" onClick={() => removeAddress(index)}>Excluir Endereço</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addAddress}>Adicionar Endereço</button>
        <br />
        <SubmitButton type="submit">Cadastrar</SubmitButton>
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

export default RegisterPage;
