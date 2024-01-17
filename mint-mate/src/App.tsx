import React from 'react';
import './App.css';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Router from './router/router';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router></Router>
    </ChakraProvider>
  );
}

export default App;
