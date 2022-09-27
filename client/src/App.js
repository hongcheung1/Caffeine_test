import React from 'react';
import Container from '@mui/material/Container';
import DrinksTable from './components/DrinksTable';
import CustomerInput from './components/CustomerInput';
import './App.css';

function App() {
  return (
    <Container maxWidth="md" className='container'>
      <DrinksTable />
      <CustomerInput />
    </Container>
  );
}

export default App;
