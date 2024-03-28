import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

import CuponServices from "../../services/CuponService";

import { Checkbox, FormControlLabel } from "@mui/material";
import { SelectCategoria } from "./Form/SelectCategoria";
import CategoriaServices from "../../services/CategoriaServices";

export function CreateCupon() {
  const navigate = useNavigate();

  // Esquema de validación
  const cuponSchema = yup.object({
    nombre: yup
      .string()
      .required("El nombre del material es requerido")
      .min(3, "El nombre debe tener 3 caracteres"),
    descripcion: yup.string().required("La  descripción es requerida"),
    precio: yup
      .number()
      .typeError("Solo acepta números")
      .required("El precio es requerido"),
    categoria_id: yup.string().required("La unidad de medida es requerida"),
    fecha_expiracion: yup
      .string()
      .required("La fecha de expiración es requerida"),
    fecha_emision: yup.string().required("La fecha de emision es requerido"),
    estado: yup.boolean().required("El estado es requerido"),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      descripcion: "",
      categoria_id: "",
      fecha_expiracion: "",
      fecha_emision: "",
      estado: true,
    },
    // Asignación de validaciones
    resolver: yupResolver(cuponSchema),
  });

  const [dataCategoria, setDataCategoria] = useState({});
  const [loadedCategoria, setLoadedCategoria] = useState(false);
  useEffect(() => {
    CategoriaServices.getCategoria()
      .then((response) => {
        console.log(response);
        setDataCategoria(response.data.results || []);
        setLoadedCategoria(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedCategoria(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, []);

  const [error, setError] = useState("");

  // Accion submit
  const onSubmit = async (DataForm) => {
    console.log("Formulario:");
    console.log(DataForm);

    try {
      const transformedData = {
        ...DataForm,
        estado: DataForm.estado ? 1 : 0,
      };
      console.log(transformedData);
      if (cuponSchema.isValid()) {
        const imageUrl = await handleImageUpload();

        // Assuming your API expects an 'image' field for the image URL
        DataForm.linkImagen = imageUrl;
        //Crear material

        CuponServices.createCupon(DataForm)
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
              return navigate("/cupon");
            }
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              setError(error);
              throw new Error("Respuesta no válida del servidor");
            }
            toast.error("Failed to create material. Please try again later.", {
              duration: 4000,
              position: "top-center",
            });
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

  const handleImageUpload = async () => {
    if (!file) {
      return null; // No image selected
    }

    try {
      const randomNumber = Math.floor(Math.random() * 100000);
      const fileName = `${randomNumber}_${file.name}`;
      const formData = new FormData();
      formData.append("image", file, fileName);

      const response = await fetch(
        "http://localhost:81/apiRecycleaf/ImangeHandler",
        {
          method: "POST",
          body: formData,
        }
      );

      const imageUrl = await response.text();
      console.log("Image uploaded successfully:", imageUrl);
      return fileName; // Return the modified file name
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container sx={{ p:1 }}  spacing={3}>
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
              Crear un nuevo cupón
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="nombre"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="nombre"
                    label="Nombre del cupón"
                    error={Boolean(errors.nombre)}
                    helperText={errors.nombre ? errors.nombre.message : " "}
                  />
                )}
              />
            </FormControl>
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
                    label="Descripción del cupon"
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

          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {loadedCategoria && (
                <Controller
                  name="categoria_id"
                  control={control}
                  render={({ field }) => (
                    <SelectCategoria
                      field={field}
                      data={dataCategoria}
                      error={Boolean(errors.categoria_id)}
                      onChange={(e) => {
                        setValue("categoria_id", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  )}
                />
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="fecha_expiracion"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="fecha_expiracion"
                    label="Fecha de expiración"
                    error={Boolean(errors.fecha_expiracion)}
                    helperText={
                      errors.fecha_expiracion
                        ? errors.fecha_expiracion.message
                        : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="fecha_emision"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="fecha_emision"
                    label="Fecha de emision"
                    error={Boolean(errors.fecha_emision)}
                    helperText={
                      errors.fecha_emision ? errors.fecha_emision.message : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="estado"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Estado"
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
          <Grid item sx={12} sm={4}>
            {file && (
              <div>
                <h2>Imágen Seleccionada:</h2>
                <img
                  src={URL.createObjectURL(file)}
                  alt="Selected"
                  style={{ maxWidth: "300px" }}
                />
              </div>
            )}
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ m: 1 }}
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
