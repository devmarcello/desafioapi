import React, { useState, useEffect } from "react";
import axios from 'axios';
import CardPeople from "../components/cardpeople";
import BackButton from "../components/backbutton";
import RegisterPeopleButton from "../components/registerpeoplebutton";
import { useNavigate } from 'react-router-dom';

const ListPage = () => {
  const [people, setPeople] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/people/people');
        setPeople(response.data);
      } catch (error) {
        console.error('Erro ao buscar pessoas:', error);
      }
    };

    fetchData();
  }, []);

  const [expandedPersonId, setExpandedPersonId] = useState(null);

  const handleExpand = (id) => {
    setExpandedPersonId(id === expandedPersonId ? null : id);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleAddAddress = (id) => {
    navigate(`/addaddress/${id}`); 
  };

  const handleEditAddress = (id, addressIndex) => {
    navigate(`/editaddress/${id}/${addressIndex}`); 
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/people/${id}`);
      setPeople(people.filter(people => people._id !== id));
    } catch (error) {
      console.error('Erro ao excluir pessoa:', error);
    }
  };

  const handleDeleteAddress = async (personId, addressId) => {
    try {
      await axios.delete(`http://localhost:4000/people/${personId}/addresses/${addressId}`);
      const updatedPeople = people.map(person => {
        if (person._id === personId) {
          const updatedAddresses = person.addresses.filter(address => address._id !== addressId);
          return { ...person, addresses: updatedAddresses };
        }
        return person;
      });
      setPeople(updatedPeople);
    } catch (error) {
      console.error('Erro ao excluir endereço:', error);
    }
  };

  return (
    <div>
        <BackButton to="/">Voltar</BackButton>
        <RegisterPeopleButton/>
      {people.map((people) => (
        <CardPeople
          key={people._id}
          name={people.name}
          gender={people.gender}
          birthdayDate={new Date(people.birthdayDate).toLocaleDateString('pt-BR')}
          status={people.status}
          addresses={people.addresses}
          isExpanded={people._id === expandedPersonId}
          onExpand={() => handleExpand(people._id)}
          onEdit={() => handleEdit(people._id)}
          onEditAddress={(addressIndex) => handleEditAddress(people._id, addressIndex)}
          onDelete={() => handleDelete(people._id)}
          onDeleteAddress={(addressId) => handleDeleteAddress(people._id, addressId)}
          onAddAddress={() => handleAddAddress(people._id)}
          
        />
      ))}
    </div>
  );
};

export default ListPage;
