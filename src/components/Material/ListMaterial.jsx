import { useEffect, useState } from "react";
import MaterialService from "../../services/MaterialServices";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DescriptionIcon from "@mui/icons-material/Description";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Link } from "react-router-dom";
import { Button, CardMedia } from "@mui/material";

export function ListMaterial() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    MaterialService.getMaterial()
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
            const response = await MaterialService.getImages(item.linkImagen);
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
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Grid container sx={{ p: 2 }} spacing={3}>
      {data &&
        data.map((item, index) => (
          <Grid item xs={4} key={item.id}>
            <Card>
              <CardMedia
                sx={{ height: 140 }}
                image={images[index]}
                title="Material"
              />
              <CardContent>
                <Typography variant="title" color="text.secondary">
                  <strong> {item.nombre}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <DescriptionIcon />
                  Descripción: {item.descripcion}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <MonetizationOnIcon /> Precio: {item.precio}
                </Typography>
              </CardContent>
              <CardActions
                disableSpacing
                sx={{
                  backgroundColor: item.color,
                  color: (theme) => theme.palette.common.white,
                }}
              >
                <Button 
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{ m: 1 }}
                  size="small"
                  component={Link}
                  to={`/material/${item.id}`}
                >
                  DETALLE
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}
