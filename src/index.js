import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Records from './Pages/records.tsx';
import Register from './Pages/register.tsx';
const root = ReactDOM.createRoot(document.getElementById('root'));

const Rotas = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Register />} path='/' />
          <Route element={<Records />} path='/records' />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

root.render(
  <React.StrictMode>
    <Rotas />
  </React.StrictMode>,
);
