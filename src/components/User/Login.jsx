// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { useState, useContext } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// eslint-disable-next-line no-unused-vars
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import UsuarioService from "../../services/UsuarioService";

export function Login() {
  const navigate = useNavigate();
  const { saveUser } = useContext(UserContext);
  // Esquema de validación
  const loginSchema = yup.object({
    correo: yup
      .string()
      .required("El correo es requerido")
      .email("Formato email"),
    contrasenna: yup.string().required("La contraseña es requerida"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // Valores iniciales
    defaultValues: {
      correo: "",
      contrasenna: "",
    },
    // Asignación de validaciones
    resolver: yupResolver(loginSchema),
  });

  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      UsuarioService.loginUsuario(DataForm)
        .then((response) => {
          console.log(response.data.results);
          if (
            response.data.results != null &&
            response.data.results != "undefined" &&
            response.data.results != "Usuario no valido"
          ) {
            //Usuario valido o identificado
            //guardar el token
            saveUser(response.data.results);
            toast.success("Bienvenido", {
              duraction: 4000,
              position: "top-center",
            });
            return navigate("/");
          } else {
            //usuario no válido
            if (
              response.data.results == "undefined" &&
              response.data.results == "Usuario no valido"
            ) {
              toast.error("Usuario NO valido", {
                duraction: 4000,
                position: "top-center",
              });
            }
          }
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            setError(error);
            throw new Error("Respuesta no válida del servidor");
          }
        });
      //Respuesta del API
    } catch (e) {
      // handle your error
    }
  };

  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container sx={{ p: 1 }} spacing={3}>
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
              Ingreso
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="correo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="correo"
                    label="Correo electrónico"
                    error={Boolean(errors.correo)}
                    helperText={errors.correo ? errors.correo.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="contrasenna"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="contrasenna"
                    label="Contraseña"
                    type="password"
                    error={Boolean(errors.contrasenna)}
                    helperText={
                      errors.contrasenna ? errors.contrasenna.message : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ m: 1 }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
