import React from 'react';
import './App.css';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Router from './router/router';
import { PanelServiceProvider } from './providers/service';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <PanelServiceProvider>
        <Router></Router>
      </PanelServiceProvider>
    </ChakraProvider>
  );
}

export default App;
