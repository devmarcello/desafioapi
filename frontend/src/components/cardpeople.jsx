import React from 'react';
import styled from 'styled-components';
import { PiGenderIntersexThin } from "react-icons/pi";
import { GiLinkedRings } from "react-icons/gi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdOutlineOtherHouses } from "react-icons/md";
import { RiPencilLine, RiCloseLine } from "react-icons/ri";

const Card = styled.div`
  background-color: #ccc;
  border: 2px solid black; 
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 300px;
  min-height: 80px;
`;

const Name = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  color: #333;
  text-align: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between; 
  margin-top: 10px; 
`;


const Button = styled.button`
  background-color: #2980b9;
  color: white;
  border: 1px solid black;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
  width: 100px; 
  margin: 0 3px;
`;

const MoreButton = styled(Button)`
  width: 80px; 
`;

const EditButton = styled(Button)`
  width: 70px; 
`;

const DeleteButton = styled(Button)`
  width: 70px; 
`;

const AddAddressButton = styled(Button)`
  width: 100px; 
`;
const EditAddressIconButton = styled.button` 
  background-color: transparent;
  color: #2980b9;
  border: none;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
`;

const DeleteAddressIconButton = styled.button` 
  background-color: transparent;
  color: red;
  border: none;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
`;

const CardContent = styled.div`
  display: ${props => (props.isExpanded ? 'block' : 'none')};
  color: #333;
`;

const CardPeople = ({ name, gender, birthdayDate, status, addresses, isExpanded, onExpand, onEdit, onDelete, onEditAddress, onDeleteAddress, onAddAddress }) => {
  return (
    <Card>
      <Name>{name}</Name>
      <CardContent isExpanded={isExpanded}>
        <div>
          <p><PiGenderIntersexThin /> Gênero: {gender}</p>
          <p><LiaBirthdayCakeSolid /> Data de Nascimento: {birthdayDate}</p>
          <p><GiLinkedRings /> Estado civil: {status}</p>
          {addresses && addresses.length > 0 && (
            <>
              <p><MdOutlineOtherHouses /> Endereços:</p>
              <ul>
                {addresses.map((address, index) => (
                  <li key={index}>
                    {address.address}, {address.number} - {address.complement}, {address.neighborhood}, {address.city}, {address.state} - {address.zipcode}
                    <EditAddressIconButton onClick={() => onEditAddress(index, address._id)}><RiPencilLine /></EditAddressIconButton> 
                    <DeleteAddressIconButton onClick={() => onDeleteAddress(address._id)}><RiCloseLine style={{ color: 'red' }} /></DeleteAddressIconButton>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </CardContent>
      <ButtonContainer>
      <MoreButton onClick={onExpand}>{isExpanded ? 'Fechar' : 'Visualizar'}</MoreButton>
        <EditButton onClick={onEdit}>Editar</EditButton>
        <AddAddressButton onClick={onAddAddress}>+Endereço</AddAddressButton>
        <DeleteButton onClick={onDelete}>Excluir</DeleteButton>
      </ButtonContainer>
    </Card>
  );
};

export default CardPeople;
