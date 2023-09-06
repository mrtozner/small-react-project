import React from "react";
import './App.css';
import { ToastContainer } from 'react-toastify';
import RoutesComponent from './Routes';

function App() {
  return (
      <div className="App">
          <ToastContainer />
          <RoutesComponent />
      </div>
  );
}

export default App;
