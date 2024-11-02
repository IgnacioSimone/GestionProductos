import React from 'react';
import ProductoList from './components/ProductoList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestión de Productos</h1>
        <ProductoList />
      </header>
    </div>
  );
}

export default App;
