import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ReactInputMask from "react-input-mask";
import UsuarioService from "../../services/UsuarioService";

export function Signup() {
  const navigate = useNavigate();

  const loginSchema = yup.object({
    correo: yup
      .string()
      .required("El correo es requerido")
      .email("Formaato de e-mail"),
    nombrecompleto: yup
      .string()
      .required("El nombre es requerido")
      .min(5, "El nombre debe tener al menos cinco caracteres")
      .max(100, "El nombre no debe exceder los cien caracteres"),
    identificacion: yup.string().required("La identificación es requerida"),
    direccion: yup
      .string()
      .required("La dirección es requerida")
      .min(5, "La direccion debe tener al menos cinco caracteres")
      .max(300, "La dirección no debe exceder los trecientos caracteres"),
    telefono: yup.string().required("El teléfono es requerido"),
    contrasenna: yup.string().required("La contraseña es requerida"),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      correo: "",
      nombrecompleto: "",
      identificacion: "",
      direccion: "",
      telefono: "",
      contrasenna: "",
      tipo_usuario: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const [error, setError] = useState("");
  const notify = () =>
    toast.success("Usuario registrado", {
      duration: 4000,
      position: "top-center",
    });

  const onSubmit = (DataForm) => {
    try {
      console.log(DataForm);
      setValue("tipo_usuario", 2);
      UsuarioService.createUsuario(DataForm)

        //Registrar usuario
        .then((response) => {
          console.log(response);
          notify();
          return navigate("/usuario/login");
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            notify();
            return navigate("/usuario/login");
          }
        });
    } catch (e) {
      // handle your error
    }
  };

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
              Registar Usuario
            </Typography>
          </Grid>
          <Grid />
          <Grid item xs={12} sm={12} marginLeft={"10%"}>
            <Grid item xs={8} sm={4}>
              {/* ['filled','outlined','standard']. */}
              <FormControl variant="standard" fullWidth>
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

            <Grid item xs={8} sm={6}>
              {/* ['filled','outlined','standard']. */}
              <FormControl variant="standard" fullWidth>
                <Controller
                  name="nombrecompleto"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="nombrecompleto"
                      label="nombrecompleto"
                      error={Boolean(errors.nombrecompleto)}
                      helperText={
                        errors.nombrecompleto
                          ? errors.nombrecompleto.message
                          : " "
                      }
                    />
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={8} sm={4}>
              <FormControl variant="standard" fullWidth>
                <Controller
                  name="identificacion"
                  control={control}
                  render={({ field }) => (
                    <ReactInputMask
                      {...field}
                      mask="9-9999-9999"
                      maskChar=""
                      alwaysShowMask={true}
                    >
                      {() => (
                        <TextField
                          id="identificacion"
                          label="Identificación"
                          error={Boolean(errors.identificacion)}
                          helperText={
                            errors.identificacion
                              ? errors.identificacion.message
                              : " "
                          }
                        />
                      )}
                    </ReactInputMask>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={8} sm={8}>
              {/* ['filled','outlined','standard']. */}
              <FormControl variant="standard" fullWidth>
                <Controller
                  name="direccion"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="direccion"
                      label="Dirección"
                      error={Boolean(errors.direccion)}
                      helperText={
                        errors.direccion ? errors.direccion.message : " "
                      }
                    />
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={8} sm={4}>
              <FormControl variant="standard" fullWidth>
                <Controller
                  name="telefono"
                  control={control}
                  render={({ field }) => (
                    <ReactInputMask
                      {...field}
                      mask="9999-9999"
                      maskChar=""
                      alwaysShowMask={true}
                    >
                      {() => (
                        <TextField
                          id="telefono"
                          label="Teléfono"
                          error={Boolean(errors.telefono)}
                          helperText={
                            errors.telefono ? errors.telefono.message : " "
                          }
                        />
                      )}
                    </ReactInputMask>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={8} sm={6}>
              {/* ['filled','outlined','standard']. */}
              <FormControl variant="standard" fullWidth>
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
                Registrar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
