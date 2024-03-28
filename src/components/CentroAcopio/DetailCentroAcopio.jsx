import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CentroAcopio from '../../services/CentroAcopioService';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { Grid, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import centro from '../../assets/centro_acopio.jpg'

export function DetailCentroAcopio() {
  const routeParams= useParams();
  console.log(routeParams)

   //Resultado de consumo del API, respuesta
 const[data,setData]=useState(null);
 //Error del API
 const[error,setError]=useState('');
 //Booleano para establecer sí se ha recibido respuesta
 const[loaded,setLoaded]=useState(false);
  useEffect(()=>{
    //Llamar al API y obtener una pelicula
    CentroAcopio.getCentroAcopioById(routeParams.id)
    .then( response=>{
      setData(response.data.results)
      console.log(response.data)
      setError(response.error)
      setLoaded(true)
    }
    ).catch( error=>{
      console.log(error) 
      setError(error)
      throw new Error("Respuesta no válida del servidor")
    }      
    )
  },[routeParams.id])

  if(!loaded) return <p>Cargando...</p>
  if(error) return <p>Error: {error.message}</p>
  return (
    <Container component='main' sx={{ mt: 2, mb: 2 }} >
    {data && ( 
        <Grid container spacing={2} sx={{bgcolor: 'background.paper'}}>
          
          <Grid item={true} xs={5} >  
          <Box component='img'
           sx={{
            borderRadius:'4%',
            maxWidth:'100%',
            height: 'auto',
          }}
          alt="RenovaGreen"
          src={centro}/>  
            
          </Grid>
          <Grid item={true} xs={7}>
            <Grid bgcolor={'#29524a'} paddingLeft={2} paddingTop={1} xs={11} sx={{ mb: 2 }}>
              <Typography color={'#ffff'} variant='h4' component='h1' gutterBottom>
               {data.Nombre_centro_acopio}
              </Typography>
              
              <Typography color={'#ffff'} component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                  Provincia: {data.Provincia}
                </Box>{' '}
              </Typography>
              <Typography color={'#ffff'} component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                  Cantón:
                </Box>{' '}
                {data.Cantón}
              </Typography>
              <Typography color={'#ffff'} component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                  Dirección:
                </Box>{' '}
                {data.Dirección}
              </Typography>
              <Typography color={'#ffff'} component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                  Teléfono:
                </Box>{' '}
                {data.Teléfono}
              </Typography>
              <Typography color={'#ffff'} component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                  Horario de atención:
                </Box>{' '}
                {data.Horario_atención}
              </Typography>
               <Typography color={'#ffff'} component='span' variant='subtitle1' display='block'> 
                <Box fontWeight='bold' display='inline'>
                  Administrador:
                </Box>{' '}
                  {data.Nombre} 
              </Typography> 
              <Typography color={'#ffff'} component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                  Estado:
                </Box>{' '}
                {data.Estado }
              </Typography>
              <Typography color={'#ffff'} component='span' variant='subtitle1'>
                <Box fontWeight='bold'>Materiales:</Box>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 1000,
                    bgcolor: '#29524a',
                  }}
                >
                 {data.material.map((item)=>(
                  <ListItemButton key={item.id}>
                    <ListItemIcon>
                      <LocalActivityIcon />
                    </ListItemIcon>
                    <ListItemText color={'#ffff'} primary={item.nombre} />
                  </ListItemButton> 
                 ))}
                </List>
              </Typography>
              </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
