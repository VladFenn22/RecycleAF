import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import MaterialService from '../../services/MaterialServices';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ScaleIcon from '@mui/icons-material/Scale';
import MaterialServices from '../../services/MaterialServices';

export function DetailMaterial() {
  const routeParams= useParams();

   //Resultado de consumo del API, respuesta
 const[data,setData]=useState(null);
 //Error del API
 const[error,setError]=useState('');
 //Booleano para establecer sí se ha recibido respuesta
 const[loaded,setLoaded]=useState(false);
 const [image, setImage] = useState(null);
 
  useEffect(()=>{
    //Llamar al API y obtener una pelicula
    MaterialService.getMaterialById(routeParams.id)
    .then( response=>{
      setData(response.data.results)
      console.log(response.data)
      setError(response.error)
      setLoaded(true)
      fetchImage(response.data.results.linkImagen);
    }
    ).catch( error=>{
      console.log(error)
      setError(error)
      throw new Error("Respuesta no válida del servidor")
    }      
    )
  },[routeParams.id])

  const fetchImage = async (imageName) => {
    try {
        const response = await MaterialServices.getImage(imageName);
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const imageUrl = URL.createObjectURL(blob);
        setImage(imageUrl);
    } catch (error) {
        console.error('Error fetching image:', error);
    }
};

  if(!loaded) return <p>Cargando...</p>
  if(error) return <p>Error: {error.message}</p>
  return (
    <Container component='main' sx={{ mt: 2, mb: 2 }} >
    {data && ( 
        <Grid container spacing={2} sx={{bgcolor:data.color}}>
          
          <Grid item={true} xs={5} sx={{ mb: 2}} >  
          <Box component='img'
           sx={{
            borderRadius:'4%',
            maxWidth:'100%',
            height: 'auto',
          }}
          alt="Img Material"
          src={image}/>  
            
          </Grid>
          <Grid item={true} xs={7}>
            
              <Typography color={'#ffff'} variant='h4' component='h1' gutterBottom>
               {data.nombre}
              </Typography>
              <Typography color={'#ffff'} variant='subtitle1' component='h1' gutterBottom>
               {data.descripcion}
              </Typography>
              <Typography color={'#ffff'} component='span' variant='subtitle1' display='block'>
                <Box display='inline'>
                <CurrencyExchangeIcon /> Precio: ₡{data.precio} 
                </Box>{' '}
              </Typography>
              <Typography  component='span' variant='subtitle1' display='block' color={'#ffff'}>
                <Box  display='inline' color={'#ffff'}>
                <ScaleIcon /> Unidad de Medida:
                </Box >{' '}
                {data.unidad_medida}
              </Typography>
          
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
