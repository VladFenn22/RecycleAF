import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Button, CardMedia } from "@mui/material";
import CuponService from "../../services/CuponService";
import TollTwoToneIcon from '@mui/icons-material/TollTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import EventBusyTwoToneIcon from '@mui/icons-material/EventBusyTwoTone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


export function ListCupon() {
  const [data, setData] = useState(null);

  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    CuponService.getCupon()
      .then((response) => {
        setData(response.data.results);
        console.log(response.data);
        setError(response.error);
        setLoaded(true);
        fetchImages(response.data.results);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, []);

  const fetchImages = async (items) => {
    try {
      const imageArray = await Promise.all(
        items.map(async (item) => {
          try {
            const response = await CuponService.getImages(item.linkImagen);
            if (response.status === 200) {
              const blob = new Blob([response.data], {
                type: response.headers["content-type"],
              });
              const imageUrl = URL.createObjectURL(blob);
              return imageUrl;
            } else {
              console.error(
                "Image request failed with status:",
                response.status
              );
              return null;
            }
          } catch (error) {
            console.error("Error fetching image:", error);
            return null;
          }
        })
      );

      // Log the image URLs
      console.log("Image URLs:", imageArray);

      // Remove null values (failed requests) from the array
      const filteredImages = imageArray.filter((imageUrl) => imageUrl !== null);

      setImages(filteredImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p> Error: {error.message}</p>;

  return (
    <Grid container sx={{ p:1 }} spacing={3}>
   <Grid item xs={12} sm={12} backgroundColor={'#48934C'}  sx={{ display: 'flex', borderBottomLeftRadius: '50px', borderBottomRightRadius: '50px' , justifyContent: 'start'  }}>
  <Typography variant='h5' gutterBottom color={'#ffff'} sx={{ fontFamily: 'monospace', fontWeight: 400, textDecoration: 'none', height: '100%', lineHeight: '100%', paddingLeft: 1, paddingRight: 1, paddingBottom: 2}}>
    Lista de cupones
  </Typography>
</Grid>
      <Grid item xs={12} display={'flex'} justifyContent={'center'}>
        <Button
          component={Link} to={`/create-cupon`}
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ m: 1 }} 
        >
          <AddCircleOutlineIcon sx={{ mr: 1 }} />
          Agregar un Nuevo cupón
        </Button>
      </Grid>
      {data &&
        data.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardHeader
                sx={{
                  p: 2,
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  color: (theme) => theme.palette.common.white,
                  textAlign: "center",
                }}
                titleTypographyProps={{ variant: 'h6' }}
                title={
                  <>
                    {item.nombre}
                    <TollTwoToneIcon sx={{ ml: 20 }} /> 
                    {' '+item.precio}
                  </>
                }
              />
              <CardMedia
                sx={{ height: 140 }}
                image={images[index]}
                title="Cupon"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  <DescriptionTwoToneIcon /> {item.descripcion}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <EventAvailableTwoToneIcon /> Fecha de emisión: {item.fecha_emision}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <EventBusyTwoToneIcon /> Fecha de expiración: {item.fecha_expiracion}
                </Typography>
              </CardContent>
              <CardActions
                disableSpacing
                sx={{
                  color: (theme) => theme.palette.common.white,
                  backgroundColor: "#004d40",
                  justifyContent: 'start',
                }}
              >
                <Button size="small" component={Link} to={`/cupon/update/${item.id}`}>
                  <Typography color={"#ffff"}>Modificar cupón</Typography>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}
