import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditarProducto from './EditarProducto';
import AgregarProducto from './AgregarProducto';
import { Grid, Card, CardContent, CardActions, IconButton, Typography, Box, TextField, InputAdornment } from '@mui/material';
import { Edit, Delete, Inventory2, MonetizationOn, Search } from '@mui/icons-material';

function ProductoList() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");

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
    cargarProductos();
  };

  const handleAgregarProducto = () => {
    cargarProductos();
  };

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 5 }}>
      <AgregarProducto onProductoAgregado={handleAgregarProducto} />
      <Typography variant="h4" gutterBottom align="center">
        <br /><br />
        Lista de Productos
      </Typography>
      <br />

      {/* Barra de búsqueda con ícono de lupa dentro del campo */}
      <TextField
        label="Buscar Producto"
        variant="outlined"
        fullWidth
        sx={{ maxWidth: 600, mb: 3 }}
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search style={{ color: '#454545' }} /> {/* Ajusta el color del ícono */}
            </InputAdornment>
          ),
        }}
      />
      <br />

      <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
        {productosFiltrados.map((producto) => (
          <Grid item key={producto.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                maxWidth: 345,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: '#fff',
                borderRadius: 3,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.4)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {producto.nombre}
                </Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <MonetizationOn sx={{ color: '#21be12', mr: 1 }} />
                  <Typography variant="body2" color="inherit">
                    ${producto.precio.toFixed(2)}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Inventory2 sx={{ color: '#8d8d8d', mr: 1 }} />
                  <Typography variant="body2" color="inherit">
                    Stock: {producto.stock}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <IconButton 
                  onClick={() => setProductoSeleccionado(producto)}
                  sx={{
                    color: '#1976d2',
                    '&:hover': { 
                      color: '#115293',
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      transform: 'scale(1.1)',
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    },
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton 
                  onClick={() => eliminarProducto(producto.id)}
                  sx={{
                    color: '#d32f2f',
                    '&:hover': { 
                      color: '#9a0007',
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      transform: 'scale(1.1)',
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    },
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

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
