import { Button, Grid } from '@mui/material'
import Container from '@mui/material/Container'
//import Typography from '@mui/material/Typography'
import recycleaf_logo from '../../assets/recycleaf_slogan.jpg';


export function Home () {
  return (
    <Container sx={{ padding: 3, padingBottom:0 ,backgroundColor: '#29524a', marginBottom:2}} >
     <Grid item xs={12} sx={{  padding: 2,  display: 'flex',  justifyContent: 'center', alignItems: 'center', }} >
            <img 
              src={recycleaf_logo}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
             </Grid>
     
      <Grid  item xs={12} sx={{  padding: 2, paddingTop:0, display: 'flex',  justifyContent: 'center', alignItems: 'center' }}>
        <Button type='submit'
              variant='contained'
              color='secondary'
              sx={{ m: 1 }}>
                Registrate
        </Button>
        <Button type='submit'
              variant='contained'
              color='secondary'
              sx={{ m: 1 }}>
                Iniciar sesión 
        </Button>
    </Grid>
   
    </Container>
  
  )
}                                 