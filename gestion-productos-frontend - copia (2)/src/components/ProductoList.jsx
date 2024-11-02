import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditarProducto from './EditarProducto';
import AgregarProducto from './AgregarProducto'; // Importa AgregarProducto aquí
import { List, ListItem, ListItemText, Button, Typography, Box, Paper } from '@mui/material';

function ProductoList() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    axios.get('http://localhost:8080/api/productos')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => console.error('Hubo un error al obtener los productos:', error));
  };

  const eliminarProducto = (id) => {
    axios.delete(`http://localhost:8080/api/productos/${id}`)
      .then(() => {
        setProductos(productos.filter(producto => producto.id !== id));
      })
      .catch(error => console.error('Hubo un error al eliminar el producto:', error));
  };

  const handleEditSuccess = () => {
    setProductoSeleccionado(null);
    cargarProductos(); // Recargar la lista después de la edición
  };

  const handleAgregarProducto = () => {
    cargarProductos(); // Recargar la lista cuando se agrega un nuevo producto
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 5 }}>
      <AgregarProducto onProductoAgregado={handleAgregarProducto} /> {/* Pasamos la función aquí */}
<br></br>
      <Typography variant="h4" gutterBottom align="center">
        Lista de Productos
      </Typography>
      <List>
        {productos.map((producto) => (
          <ListItem 
            key={producto.id} 
            sx={{
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              paddingY: 2,
            }}
          >
            <Paper
              sx={{
                padding: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 6,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                flexGrow: 1,
                marginRight: 2,
              }}
            >
              <ListItemText 
                primary={producto.nombre} 
                secondary={`$${producto.precio} (Stock: ${producto.stock})`} 
                primaryTypographyProps={{
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  color: '#ffffff',
                }}
                secondaryTypographyProps={{
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: '#000080',
                }}
              />
            </Paper>
            
            <Box>
              <Button 
                variant="contained" 
                onClick={() => setProductoSeleccionado(producto)}
                sx={{
                  color: '#ffffff',
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#115293',
                  },
                  marginRight: 1,
                }}
              >
                Editar
              </Button>
              <Button 
                variant="contained" 
                onClick={() => eliminarProducto(producto.id)}
                sx={{
                  color: '#ffffff',
                  backgroundColor: '#d32f2f',
                  '&:hover': {
                    backgroundColor: '#9a0007',
                  },
                }}
              >
                Eliminar
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>

      {productoSeleccionado && (
        <EditarProducto
          producto={productoSeleccionado}
          onEditSuccess={handleEditSuccess}
        />
      )}
    </Box>
  );
}

export default ProductoList;
