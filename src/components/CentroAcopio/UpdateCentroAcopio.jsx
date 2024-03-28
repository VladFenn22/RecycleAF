import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import MaterialService from "../../services/MaterialServices";
import { SelectProvincia } from "./Form/SelectProvincia";
import { SelectCanton } from "./Form/SelectCanton";
import { SelectUsuario } from "./Form/SelectUsuario";
import { toast } from "react-hot-toast";
import { SelectMaterial } from "./Form/SelectMaterial";
import AdminService from "../../services/AdministradorServices";
import CantonServices from "../../services/CantonServices";
import ProvinciaServices from "../../services/ProvinciaServices";
import CentroAcopioService from "../../services/CentroAcopioService";
import InputMask from "react-input-mask";

export function UpdateCentroAcopio() {
  const navigate = useNavigate();

  const routeParams = useParams();

  const id = routeParams.id || null;
  //valores a precargar en el formulario que vienen del API
  const [values, setValues] = useState(null);
  //Obtener laa película a actualizar usando un useEffect
  useEffect(() => {
    if (id != undefined && !isNaN(Number(id))) {
      CentroAcopioService.getCentroAcopioFormById(Number(id))
        .then((response) => {
          console.log(response);
          setValues(response.data.results);
          setError(response.error);
          setSelectedProvincia(response.data.results.idProvincia);
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
  const movieSchema = yup.object({
    nombre: yup
      .string()
      .required("El nombre es requerido")
      .min(2, "El nombre debe tener al menos 2 caracteres"),
    idProvincia: yup.number().required("La provincia es requerida"),
    IdCanton: yup.number().required("El cantón es requerido"),
    direccion: yup.string().required("La  dirección es requerida"),
    telefono: yup
      .string()
      .matches(/^\d{4}-\d{4}$/, "Formato de teléfono inválido")
      .required("El teléfono es requerido"),
    horario_atencion: yup
      .string()
      .required("El horario de atención es requerido"),
    administrador_id: yup
      .number()
      .typeError("Solo acepta números")
      .required("El administrador es requerido"),
    estado: yup.boolean().required("El estado es requerido"),
    material: yup.array().min(1, "Seleccione al menos un material"),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      idProvincia: "1",
      IdCanton: "1",
      direccion: "",
      telefono: "",
      horario_atencion: "",
      estado: true,
      administrador_id: "",
      material: [],
    },
    values,
    // Asignación de validaciones
    resolver: yupResolver(movieSchema),
  });

  const [error, setError] = useState("");

  // Accion submit
  const onSubmit = (DataForm) => {
    console.log("Formulario:");
    console.log(DataForm);

    try {
      DataForm.estado = DataForm.estado ? 1 : 0;

      if (movieSchema.isValid()) {
        //Crear pelicula
        CentroAcopioService.updateCentroAcopio(DataForm)
          .then((response) => {
            console.log(response);
            setError(response.error);

            if (response.data.results != null) {
              toast.success(response.data.results, {
                duration: 4000,
                position: "top-center",
              });
              // Redireccion a la tabla
              return navigate("/centroacopio-table");
            }
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

  //Lista de usuarios
  const [dataUsuario, setDataUsuario] = useState({});
  const [loadedUsuario, setLoadedUsuario] = useState(false);
  useEffect(() => {
    AdminService.getAdminById(routeParams.id)
      .then((response) => {
        console.log(response);
        setDataUsuario(response.data.results);
        setLoadedUsuario(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedUsuario(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, []);

  const [selecetedProvincia, setSelectedProvincia] = useState({});

  const [dataCanton, setDataCanton] = useState({});
  const [loadedCanton, setLoadedCanton] = useState(false);

  useEffect(() => {
    CantonServices.getCantonById(selecetedProvincia)
      .then((response) => {
        console.log(response);
        setDataCanton(response.data.results);
        setLoadedCanton(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedCanton(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, [selecetedProvincia]);

  const [dataProvincia, setDataProvincia] = useState({});
  const [loadedProvincia, setLoadedProvincia] = useState(false);
  useEffect(() => {
    ProvinciaServices.getProvincia()
      .then((response) => {
        console.log(response);
        setDataProvincia(response.data.results);
        setLoadedProvincia(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedProvincia(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, []);

  // Lista de materiales
  const [dataMateriales, setDataMateriales] = useState({});
  const [loadedMateriales, setLoadedMateriales] = useState(false);
  useEffect(() => {
    MaterialService.getMaterial()
      .then((response) => {
        console.log(response);
        setDataMateriales(response.data.results);
        setLoadedMateriales(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedMateriales(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, []);

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
              Modificar centro de acopio
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
                    label="Nombre"
                    error={Boolean(errors.nombre)}
                    helperText={errors.nombre ? errors.nombre.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {/* Lista de provincias */}
              {loadedProvincia && (
                <Controller
                  name="idProvincia"
                  control={control}
                  render={({ field }) => (
                    <SelectProvincia
                      field={field}
                      data={dataProvincia}
                      error={Boolean(errors.idProvincia)}
                      onChange={(value) => {
                        setValue("idProvincia", value, {
                          shouldValidate: true,
                        });
                        setSelectedProvincia(value);
                      }}
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.idProvincia ? errors.idProvincia.message : " "}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {/* Lista de cantones */}
              {loadedCanton && (
                <Controller
                  name="IdCanton"
                  control={control}
                  render={({ field }) => (
                    <SelectCanton
                      field={field}
                      data={dataCanton}
                      error={Boolean(errors.Cantón)}
                      onChange={(e) =>
                        setValue("IdCanton", e.target.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.IdCanton ? errors.IdCanton.message : " "}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
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
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="telefono"
                control={control}
                render={({ field }) => (
                  <InputMask
                    {...field}
                    mask="9999-9999"
                    maskChar=""
                    alwaysShowMask={false}
                  >
                    {() => (
                      <TextField
                        id="telefono"
                        label="Teléfono"
                        error={Boolean(errors.telefono)}
                        helperText={
                          errors.telefono
                            ? errors.telefono.message
                            : "Formato: 1234-5678"
                        }
                      />
                    )}
                  </InputMask>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="horario_atencion"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="horario_atencion"
                    label="Horario de atención"
                    error={Boolean(errors.horario_atencion)}
                    helperText={
                      errors.horario_atencion
                        ? errors.horario_atencion.message
                        : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {loadedUsuario && (
                <Controller
                  name="administrador_id"
                  control={control}
                  render={({ field }) => (
                    <SelectUsuario
                      field={field}
                      data={dataUsuario}
                      error={Boolean(errors.administrador_id)}
                      onChange={(e) =>
                        setValue("administrador_id", e.target.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.administrador_id
                  ? errors.administrador_id.message
                  : " "}
              </FormHelperText>
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

          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {/* Lista de materiales */}
              {loadedMateriales && (
                <Controller
                  name="material"
                  control={control}
                  render={({ field }) => (
                    <SelectMaterial
                      field={field}
                      data={dataMateriales}
                      error={Boolean(errors.material)}
                      onChange={(e) =>
                        setValue("material", e.target.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.material ? errors.material.message : " "}
              </FormHelperText>
            </FormControl>
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
