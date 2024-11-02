import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

function AgregarProducto({ onProductoAgregado }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const soloNumeros = /^\d+$/;

    if (nombre.length < 2 || nombre.length > 50) {
      setError("El nombre debe tener entre 2 y 50 caracteres");
      return;
    }
    if (soloNumeros.test(nombre)) {
      setError("El nombre no puede contener solo números");
      return;
    }
    if (precio < 0) {
      setError("El precio debe ser mayor o igual a 0");
      return;
    }
    if (stock < 0) {
      setError("El stock debe ser mayor o igual a 0");
      return;
    }

    const nuevoProducto = {
      nombre: nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock)
    };

    axios.post('http://localhost:8080/api/productos', nuevoProducto)
      .then(response => {
        setNombre('');
        setPrecio('');
        setStock('');
        setError(null);
        onProductoAgregado(); // Llamamos a la función para actualizar la lista
      })
      .catch(error => {
        setError("Error al agregar el producto");
      });
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Agregar Nuevo Producto
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <TextField
          label="Precio"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
        <TextField
          label="Stock"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <Button 
          type="submit" 
          variant="contained" 
          sx={{
            color: '#ffffff',
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo negro con 70% de transparencia
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.9)', // Fondo más oscuro al hacer hover
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', // Sombra al hacer hover
              transform: 'scale(1.05)', // Escala ligera para dar efecto de expansión
            },
            marginRight: 1,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease', // Suaviza la animación
          }}
          fullWidth
        >
          Agregar Producto
        </Button>
      </Box>
    </Container>
  );
}

export default AgregarProducto;
