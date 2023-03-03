import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { store, persistor } from './redux/store.js';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { createStandaloneToast } from '@chakra-ui/toast'
const { ToastContainer } = createStandaloneToast()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <ChakraProvider>
            <App />
            <ToastContainer />
          </ChakraProvider>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
