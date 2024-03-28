import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import MaterialServices from "../../services/MaterialServices";
import FormColor from "../FormColor";
import { FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";

export function UpdateMaterial() {
  const navigate = useNavigate();

  const routeParams = useParams();
  //id de la pelicula a actualizar
  const id = routeParams.id || null;
  //valores a precargar en el formulario que vienen del API
  const [values, setValues] = useState(null);
  //Obtener laa película a actualizar usando un useEffect
  useEffect(() => {
    if (id != undefined && !isNaN(Number(id))) {
      MaterialServices.getMaterialFormById(Number(id))
        .then((response) => {
          console.log(response);
          setValues(response.data.results);
          setError(response.error);
          fetchImage(response.data.results.linkImagen);
          setColor(response.data.results.color);
        })

        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            setError(error);

            throw new Error("Respuesta no válida del servidor");
          }
        });
    }
  }, [id]);

  // Esquema de validación
  const materialSchema = yup.object({
    nombre: yup
      .string()
      .required("El nombre del material es requerido")
      .min(3, "El nombre debe tener 3 caracteres"),
    descripcion: yup.string().required("La  descripción es requerida"),
    unidad_medida: yup.string().required("La unidad de medida es requerida"),
    precio: yup.string().required("El precio es requerido"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      descripcion: "",
      unidad_medida: "",
      precio: "",
    },
    values,
    // Asignación de validaciones
    resolver: yupResolver(materialSchema),
  });

  const [error, setError] = useState("");
  const [color, setColor] = useState("");

  // Accion submit
  const onSubmit = async (DataForm) => {
    console.log("Formulario:");
    console.log(DataForm);

    try {
      if (materialSchema.isValid()) {
        const imageUrl = await handleImageUpload();
        DataForm.color = color;

        // Assuming your API expects an 'image' field for the image URL
        DataForm.linkImagen = imageUrl;
        //Crear pelicula
        MaterialServices.updateMaterial(DataForm)
          .then((response) => {
            console.log(response);
            setError(response.error);
            //Respuesta al usuario de creación
            if (response.data.results != null) {
              toast.success(response.data.results, {
                duration: 4000,
                position: "top-center",
              });
              // Redireccion a la tabla
            }
            navigate("/material-table");
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              setError(error);
              throw new Error("Respuesta no válida del servidor");
            }
          });
      }
    } catch (e) {
      //Capturar error
    }
  };
  const onError = (errors, e) => console.log(errors, e);

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  /*  const [selectedColor, setSelectedColor] = useState('#ffffff');

   const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  }; 
 */

  // ...

  const handleImageUpload = async () => {
    if (!file) {
      return null; // No image selected
    }

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        "http://localhost:81/apiRecycleaf/ImangeHandler",
        {
          method: "POST",
          body: formData,
        }
      );

      const imageUrl = await response.text();
      console.log("Image uploaded successfully:", imageUrl);
      return file.name;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  const [image, setImage] = useState(null);

  const fetchImage = async (imageName) => {
    try {
      const response = await MaterialServices.getImage(imageName);
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const imageUrl = URL.createObjectURL(blob);
      setImage(imageUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
      <Grid container sx={{ p:1}} spacing={3}>
          <Grid
            item
            xs={12}
            sm={12}
            backgroundColor={"#48934C"}
            sx={{
              display: "flex",
              borderBottomLeftRadius: "50px",
              borderBottomRightRadius: "50px",
              justifyContent: "start",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              color={"#ffff"}
              sx={{
                fontFamily: "monospace",
                fontWeight: 400,
                textDecoration: "none",
                height: "100%",
                lineHeight: "100%",
                paddingLeft: 1,
                paddingRight: 1,
                paddingBottom: 2,
              }}
            >
              Modificar material
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="descripcion"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="descripcion"
                    label="Descripción del material"
                    error={Boolean(errors.descripcion)}
                    helperText={
                      errors.descripcion ? errors.descripcion.message : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <InputLabel id="unidad-medida-label">Unidad de Medida</InputLabel>
              <Controller
                name="unidad_medida"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="unidad-medida-label"
                    id="unidad_medida"
                    label="Unidad de Medida"
                    error={Boolean(errors.unidad_medida)}
                  >
                    <MenuItem value="kg">Kilogramo (kg)</MenuItem>
                    <MenuItem value="gr">Gramo (gr)</MenuItem>
                    <MenuItem value="l">Litro (l)</MenuItem>
                    <MenuItem value="ml">Mililitro (ml)</MenuItem>
                    <MenuItem value="unidad">Unidad</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.unidad_medida ? errors.unidad_medida.message : " "}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="precio"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="precio"
                    label="Precio"
                    error={Boolean(errors.precio)}
                    helperText={errors.precio ? errors.precio.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item sx={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <FormColor
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleColorChange(e.target.value);
                    }}
                    label="Color"
                    error={Boolean(errors.color)}
                    value={color} // Use the color state here
                    helperText={errors.color ? errors.color.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item sx={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <h2>Seleccione Imágen</h2>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <h2>Imagen Actual:</h2>
              {image && (
                <img src={image} alt="Current" style={{ maxWidth: "300px" }} />
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ m: 1 }}
            >
              Actualizar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
