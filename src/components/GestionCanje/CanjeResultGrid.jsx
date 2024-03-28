import React from 'react';
import recycleaf_logo from '../../assets/recycleaf_slogan.jpg';
import PropTypes from 'prop-types';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

export function CanjeResultGrid({ nombreCentroAcopio, selectedUserName, selectedUserIdentificacion, selectedUserCorreo, currentDate, total, watchedMaterials, getMaterialName, getMaterialMedida, getMaterialPrice, getMaterialSubtotal }) {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Grid container spacing={0}>
        <Grid tem xs={10} sx={{ backgroundColor:'#29524a'}} padding={2}>

<Typography variant="h6" gutterBottom color={'white'}>


  <strong>Nombre del centro de acopio: </strong> {' '}{nombreCentroAcopio}

</Typography>


<Typography variant="h6" gutterBottom color={'white'}>
  <strong>Nombre del cliente: </strong> {' '} {selectedUserName}
</Typography>
<Typography variant="h6" gutterBottom color={'white'}>
  <strong>Identificación del cliente: </strong> {' '} {selectedUserIdentificacion}
</Typography>
<Typography variant="h6" gutterBottom color={'white'}>
 <strong>Correo electrónico: </strong> {' '} {selectedUserCorreo}
</Typography>
<Typography variant="h6" gutterBottom color={'white'}>
  <strong>Fecha de canje: </strong> {' '} {currentDate}
 </Typography>

</Grid>
<Grid item xs={2} sx={{ backgroundColor:'#29524a', padding: 2, display: 'flex', justifyContent: 'flex-top', alignItems: 'center'  }} >
<img 
  src={recycleaf_logo}
  style={{ maxWidth: '100px', height: 'auto', marginRight: '10px', }}
/>
 </Grid>
</Grid>

<Grid item xs={12} sx={{ paddingTop: 2 }}>
<TableContainer sx={{ backgroundColor: '#29524a' }}>
 <Table sx={{ minWidth: 100 }} aria-label="spanning table">
   <TableHead>
     <TableRow>
       <TableCell>
         <Typography color={'white'} variant="h6">Material</Typography>
       </TableCell>
       <TableCell>
         <Typography color={'white'} variant="h6">Cantidad</Typography>
       </TableCell>
       <TableCell>
         <Typography color={'white'} variant="h6">Unidad de Medida</Typography>
       </TableCell>
       <TableCell>
         <Typography color={'white'} variant="h6">Precio</Typography>
       </TableCell>
       <TableCell align='right'>
         <Typography color={'white'} variant="h6">Sub total de monedas</Typography>
       </TableCell>
     </TableRow>
   </TableHead>
   <TableBody>
     {watchedMaterials.map((row, index) => (
       <TableRow key={index}>
         <TableCell sx={{ color: 'white' }}>{getMaterialName(row.idMaterial)}</TableCell>
         <TableCell sx={{ color: 'white' }}>{row.cantidad}</TableCell>
         <TableCell sx={{ color: 'white' }}>{getMaterialMedida(row.idMaterial)}</TableCell>
         <TableCell sx={{ color: 'white' }}>{getMaterialPrice(row.idMaterial)}</TableCell>
         <TableCell sx={{ color: 'white' }} align="right">{getMaterialSubtotal(row.idMaterial, row.cantidad)}</TableCell>
       </TableRow>
     ))}
     <TableRow>
       <TableCell rowSpan={3} />
       <TableCell align='right' colSpan={9}>
         <Typography color={'white'} variant="h5">Total de monedas: {total}</Typography>
       </TableCell>
       <TableCell align="right">
         <Typography color={'white'} variant="h5">{}</Typography>
       </TableCell>
     </TableRow>
   </TableBody>
 </Table>
</TableContainer>
</Grid>
        </Grid>
      </Grid>
  );
}

CanjeResultGrid.propTypes = {
    nombreCentroAcopio: PropTypes.string.isRequired,
    selectedUserName: PropTypes.string.isRequired,
    selectedUserIdentificacion: PropTypes.string.isRequired,
    selectedUserCorreo: PropTypes.string.isRequired,
    currentDate: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    watchedMaterials: PropTypes.array.isRequired,
    getMaterialName: PropTypes.func.isRequired,
    getMaterialMedida: PropTypes.func.isRequired,
    getMaterialPrice: PropTypes.func.isRequired,
    getMaterialSubtotal: PropTypes.func.isRequired,
  };