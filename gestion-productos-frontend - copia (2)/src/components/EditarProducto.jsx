import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Alert } from '@mui/material';

function EditarProducto({ producto, onEditSuccess }) {
  const [nombre, setNombre] = useState(producto.nombre);
  const [precio, setPrecio] = useState(producto.precio);
  const [stock, setStock] = useState(producto.stock);
  const [error, setError] = useState(null); // Estado para el mensaje de error

  const handleEdit = (e) => {
    e.preventDefault();

    // Validaciones
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

    // Si las validaciones pasan, actualiza el producto
    const productoActualizado = { nombre, precio, stock };

    axios.put(`http://localhost:8080/api/productos/${producto.id}`, productoActualizado)
      .then(response => {
        console.log('Producto actualizado:', response.data);
        setError(null); // Limpia los errores si se actualiza correctamente
        onEditSuccess();
      })
      .catch(error => {
        console.error('Hubo un error al actualizar el producto:', error);
        setError("Error al actualizar el producto");
      });
  };

  return (
    <form onSubmit={handleEdit}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>} {/* Mensaje de error */}
      <div>
        <TextField 
          label="Nombre" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          required 
          fullWidth 
          margin="normal"
        />
      </div>
      <div>
        <TextField 
          label="Precio" 
          type="number" 
          value={precio} 
          onChange={(e) => setPrecio(e.target.value)} 
          required 
          fullWidth 
          margin="normal"
        />
      </div>
      <div>
        <TextField 
          label="Stock" 
          type="number" 
          value={stock} 
          onChange={(e) => setStock(e.target.value)} 
          required 
          fullWidth 
          margin="normal"
        />
      </div>
      
      <Button 
        type="submit" 
        variant="contained" 
        sx={{
          color: '#ffffff',
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#115293',
          },
          mt: 2,
        }}
        fullWidth
      >
        Guardar Cambios
      </Button>
    </form>
  );
}

export default EditarProducto;
