import { useEffect, useState } from "react";
import HistorialCanjeMaterialesService from "../../services/HistorialMaterialClServices";
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link, useParams } from "react-router-dom";
import { Info } from '@mui/icons-material'

export function ListHistorialCanjeMaterial (){
  const routeParams= useParams();
  console.log(routeParams)
    const[data,setData]=useState(null);

    const[error,setError]=useState('');

    const[loaded,setLoaded]=useState(false);
    useEffect(()=>{
        HistorialCanjeMaterialesService.getHistorialMaterialByIdCliente(routeParams.id)
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
        })
    },[routeParams.id])

    if(!loaded) return<p>Cargando...</p>
    if(error) return <p> Error: {error.message}</p>

    return(
        <Grid container sx={{ p: 2}} spacing={3}>
            {data && data.map((item)=>(
              <Grid item xs={4} key={item.id} >
            <Card>
                <CardHeader sx={{
                    p: 0,
                    backgroundColor: (theme) => theme.palette.secondary.main,
                    color: (theme) => theme.palette.common.white
                }}
                style={{ textAlign: 'center' }}
                title={item.nombre_cliente}
                subheader={item.nombre_centro_acopio}
                />
                <CardContent>
                <Typography variant='body2' color='text.secondary'>
                        <PhoneIcon/>Fecha de canje: {item.fecha_canje}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        <PhoneIcon/>Material: {item.nombre_material}
                    </Typography>
                    <Typography  variant='body2' color='text.secondary'>
                      <PlaceIcon/> Cantidad: {item.cantidad}
                    </Typography>
                </CardContent>
                <CardActions
                disableSpacing
                sx={{
                  backgroundColor: (theme) => theme.palette.action.focus, 
                  color: (theme) => theme.palette.common.white
                }}
                >
                  <IconButton component={Link} to={`/historialmaterial/${item.id}`} aria-label='Detatlle' sx={{ ml: 'auto' }}>
                    <Info/>
                  </IconButton>
                </CardActions>
            </Card>
        </Grid>
       ))}
      </Grid>
    )
}
