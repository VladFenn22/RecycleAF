import { useEffect, useState } from "react";
import CentroAcopioService from "../../services/CentroAcopioService";
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export function ListCentroAcopio (){
    const[data,setData]=useState(null);

    const[error,setError]=useState('');

    const[loaded,setLoaded]=useState(false);
    useEffect(()=>{
        CentroAcopioService.getCentroAcopio()
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
    },[])

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
                title={item.Nombre_centro_acopio}
              
                />
                <CardContent>
                    <Typography variant='body2' color='text.secondary'>
                        <PhoneIcon/>Teléfono: {item.Teléfono}
                    </Typography>
                    <Typography  variant='body2' color='text.secondary'>
                      <PlaceIcon/> Ubicación: {item.Provincia}
                    </Typography>
                    <Typography  variant='body2' color='text.secondary'>
                      <PlaceIcon/> Horario de atención: {item.Horario_atención}
                    </Typography>
                </CardContent >
                <CardActions 
                disableSpacing
                sx={{
                  color: (theme) => theme.palette.common.white,
                  backgroundColor: '#004d40' 
                }}
                >
                  <Button size="small" component={Link} to={`/centroacopio/${item.id}` }>
                    <Typography color={'#ffff'}>
                      DETALLE
                      </Typography>
                      </Button>
              
                 
                </CardActions> 
            </Card>
        </Grid>
       ))}
      </Grid>
    )
}
