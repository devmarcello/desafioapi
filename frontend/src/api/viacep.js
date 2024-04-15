import axios from 'axios';

const completeAddress = async (cep) => {
  try {
    const response = await axios.get(`http://localhost:4000/${cep}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar endereço:', error);
    return null;
  }
};

export default completeAddress;
