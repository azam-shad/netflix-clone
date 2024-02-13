import React from 'react'
import { BrowserRouter } from 'react-router-dom';
// import Content from './pages/utils/Content';
import Content from './pages/utils/Content';
import { AuthProvider } from './pages/Context/AuthContext';

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Content />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
