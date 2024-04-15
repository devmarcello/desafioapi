// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ListPage from './pages/listPage';
import EditPage from './pages/EditPage';
import EditAdressPage from './pages/EditAddressPage'
import AddAddressPage from './pages/AddAddressPage'
import './globalStyles.css'

const App = () => {
  
  const [showButtons, setShowButtons] = useState(true);

  const hideButtons = () => {
    setShowButtons(false);
  };

  const hideButtonsOff = () => {
    setShowButtons(true);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage showButtons={showButtons} hideButtons={hideButtons} />} />
        <Route path="/register" element={<RegisterPage hideButtonsOff={hideButtonsOff}/>} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/editaddress/:id/:addressIndex" element={<EditAdressPage />} />
        <Route path="/addaddress/:id" element={<AddAddressPage />} />
      </Routes>
    </Router>
  );
};

export default App;
