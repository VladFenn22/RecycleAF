
import { useEffect, useState } from 'react';
import recycleaf_logo from '../../assets/recycleaf_slogan.jpg';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import {  FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import MaterialServices from '../../services/MaterialServices';
import UsuarioService from '../../services/UsuarioService';
import { SelectUsuario } from '../CentroAcopio/Form/SelectUsuario';
import { SelectMaterial } from '../CentroAcopio/Form/SelectMaterial';
import CentroAcopioService from '../../services/CentroAcopioService';
import { useFieldArray } from 'react-hook-form';
import EncabezadoServices from '../../services/EncabezadoServices';
import { CanjeResultGrid } from './CanjeResultGrid';
import DetalleCanjeServices from '../../services/DetalleCanjeServices';
import HistorialMaterialServices from '../../services/HistorialMaterialServices';
import {  Box, Autocomplete } from '@mui/material';

export function CanjearMaterial() {
  const navigate = useNavigate();

  const routeParams = useParams()
  const [formSubmitted, setFormSubmitted] = useState(false);
  //id de la pelicula a actualizar
  const id= routeParams.id || null;
  //valores a precargar en el formulario que vienen del API
  const [dataMaterial, setDataMaterial]= useState({})
  const [dataCliente, setDataCliente]= useState({})
  const [nombreCentroAcopio, setNombreCentroAcopio]= useState("")
  const [loadedCliente, setLoadedCliente] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedUserCorreo, setSelectedUserCorreo] = useState("");
  const [selectedUserIdentificacion, setSelectedUserIdentificacion] = useState("");
  const [selectedMaterialIds, setSelectedMaterialIds] = useState([]);


  // Calculate the total quantity and subtotal
  const movieSchema = yup.object({
    id_cliente: yup.number().positive('Selecciona un usuario').required('Selecciona un usuario'),
    materiales: yup
    .array()
    .of(
      yup.object().shape({
        idMaterial: yup.number().required('Selecciona un material'),
        cantidad: yup.number().min(1, 'La cantidad debe ser al menos 1').required('Ingresa la cantidad'),
      })
    )
    .min(1, 'Agrega al menos un material con su cantidad'),
});
    

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
        id: Number(id),
        id_administrador: 1,
        idEncabezado: '',
        id_cliente: '',
        total: '',
        fecha_canje: '',
        materiales:[]
    },
    // Asignación de validaciones
    resolver: yupResolver(movieSchema),
  });
  const watchedMaterials = watch('materiales', []);

  function getMaterialName(id) {
    const material = dataMaterial.find((material) => material.id === id);
    return material ? material.nombre : '-';
  }
  function getMaterialPrice(id) {
    const material = dataMaterial.find((material) => material.id === id);
    return material ? material.precio : '0';
  }
  function getMaterialMedida(id) {
    const material = dataMaterial.find((material) => material.id === id);
    return material ? material.unidad_medida : '';
  }

  function getMaterialSubtotal(id, cantidad) {
    const material = dataMaterial.find((material) => material.id === id);
    return material ? material.precio * cantidad : '';
  }
  const [total, setTotal] = useState();
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const handleMaterialChange = (event, value, index) => {
    const updatedSelectedMaterials = [...selectedMaterials];
    updatedSelectedMaterials[index] = value;
    setSelectedMaterials(updatedSelectedMaterials);
    setValue(`materiales[${index}].idMaterial`, value?.id, {
      shouldValidate: true,
    });
  };

  function calculateTotal(materials) {
    return materials.reduce((total, row) => {
      const subtotal = getMaterialSubtotal(row.idMaterial, row.cantidad);
      return total + subtotal;
    }, 0);
  }

    useEffect(() => {
      setTotal(calculateTotal(watchedMaterials));
    }, [watchedMaterials]);
 


  useEffect(() => {
    // Function to get and format the current date
    const getCurrentDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      setCurrentDate(formattedDate);
    };

    // Call the function on component mount
    getCurrentDate();
  }, []); 
  //Obtener materiales del centro de acopio
  //Obtener clientes
  useEffect(()=>{
    if(id!=undefined && !isNaN(Number(id))){
      MaterialServices.getMaterialCentroAcopio(Number(id))
      .then((response) => {
        console.log(response);
        setDataMaterial(response.data.results);
        setError(response.error);
      })
      
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);

          throw new Error('Respuesta no válida del servidor');
        }
      });
    }
  },[id]);

  useEffect(()=>{
    if(id!=undefined && !isNaN(Number(id))){
      CentroAcopioService.getCentroAcopioById(Number(id))
      .then((response) => {
        console.log(response);
        setNombreCentroAcopio(response.data.results.Nombre_centro_acopio);
        setError(response.error);
      })
      
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);

          throw new Error('Respuesta no válida del servidor');
        }
      });
    }
  },[id]);

  useEffect(() => {
    UsuarioService.getUsuarioClientes()
      .then((response) => {
        console.log(response);
        setDataCliente(response.data.results);
        setLoadedCliente(true);
        setError(response.error);
      }
      )
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          throw new Error('Respuesta no válida del servidor');
        }
      });
  }, []);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'materiales',
  });

  const [error, setError] = useState('');

  // Accion submit
  const onSubmit = async (DataForm) => {
    console.log('Formulario:')
    console.log(DataForm)
    
    try {
      // Asynchronously validate the form data
      await movieSchema.validate(DataForm, { abortEarly: false });
  
      // Form data is valid, proceed with other actions
      DataForm.total = total;
      DataForm.fecha_canje = currentDate;
  
      // Make the API call
      const response = await EncabezadoServices.createEcabezado(DataForm);
      
      
      console.log(response);
  
      // Check the response and provide feedback to the user
      if (response.data.results != null) {
        DataForm.idEncabezdo = response.data.results.id;

        for (const material of watchedMaterials) {
          const detalleData = {
            idEncabezado: DataForm.idEncabezdo,
            id_material: material.idMaterial,
            cantidad: material.cantidad,
            fecha_canje: DataForm.fecha_canje,
            id_cliente: DataForm.id_cliente,
            id_centro_acopio: DataForm.id,
            sub_total_monedas: getMaterialSubtotal(material.idMaterial, material.cantidad),
          };
      
          // Use await to wait for the asynchronous operation to complete
         DetalleCanjeServices.createDetalle(detalleData);
         HistorialMaterialServices.createHistorialMaterial(detalleData);
        }
        setFormSubmitted(true);
        const toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';

            // Create the toast content
            const toastContent = document.createElement('div');
            toastContent.className = 'toast-content';
            toastContent.innerHTML = '¡Canjeo hecho con Éxito!';

            // Append the content to the container
            toastContainer.appendChild(toastContent);

            // Append the container to the body
            document.body.appendChild(toastContainer);

            // Remove the toast after a certain duration
            setTimeout(() => {
              document.body.removeChild(toastContainer);
            }, 4000); // Adjust the duration as needed
                }
            
        // Redirect to the table or perform other actions
      
    } catch (validationError) {
      // Handle validation errors
      console.error(validationError);
      setError(validationError);
    }
  
    };
  const onError = (errors, e) => console.log(errors, e);

  
 

  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
    {formSubmitted ? (
        <CanjeResultGrid
        nombreCentroAcopio={nombreCentroAcopio}
        selectedUserName={selectedUserName}
        selectedUserIdentificacion={selectedUserIdentificacion}
        selectedUserCorreo={selectedUserCorreo}
        currentDate={currentDate}
        total={total}
        watchedMaterials={watchedMaterials}
        getMaterialName={getMaterialName}
        getMaterialMedida={getMaterialMedida}
        getMaterialPrice={getMaterialPrice}
        getMaterialSubtotal={getMaterialSubtotal}
      />
      ) : (
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
  
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' gutterBottom>
              Canjear Material
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              {/* Lista de usuarios */}
                  {loadedCliente && (
                    <Controller
                    name='id_cliente'
                    control={control}
                    render={({ field }) => (
                      <SelectUsuario
                        field={field}
                        data={dataCliente}
                        error={Boolean(errors.idUsuario)}
                        onChange={(selectedUserInfo) => {
                          setValue('id_cliente', selectedUserInfo.idUsuario, { shouldValidate: true });
                          setSelectedUserName(selectedUserInfo.cliente);
                          setSelectedUserCorreo(selectedUserInfo.correo);
                          setSelectedUserIdentificacion(selectedUserInfo.identificacion);
                        }}
                      />
                    )}
                  />
                  )}
                </FormControl>
                </Grid>
              
                <Grid item xs={12} sm={18}>
                <Grid item xs={12} sm={5}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
            {fields.map((field, index) => (
            <div key={field.id}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={2}>
                  {/* ... (previous code) */}
                </Grid>
                <div>
                  <Autocomplete
                    options={dataMaterial}
                    getOptionLabel={(option) => option.nombre}
                    onChange={(event, value) =>
                      handleMaterialChange(event, value, index)
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Selecciona un material" />
                    )}
                  />
                  {selectedMaterials[index] && (
                    <div>
                      <Typography variant="h6">
                      </Typography>
                      <Box
                        sx={{
                          backgroundColor: selectedMaterials[index].color,
                          width: '130px',
                          height: '30px',
                          borderRadius: '8px',
                          marginTop: '8px',
                          marginBottom: '8px',
                        }}
                      />
                    </div>
                  )}
                </div>
                <Controller
                  name={`materiales[${index}].cantidad`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label='Cantidad del material'
                      error={Boolean(errors.materiales?.[index]?.cantidad)}
                      helperText={errors.materiales?.[index]?.cantidad?.message || ' '}
                      type='number'
                      inputProps={{ min: 0 }}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value, 10) || 0;
                        setValue(`materiales[${index}].cantidad`, newQuantity, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  )}
                />
                    <Grid item xs={12} sm={1}>
                      <Button onClick={() => {
                        remove(index);
                        setSelectedMaterialIds(prevIds => prevIds.filter(id => id !== fields[index]?.idMaterial));
                      }} variant='outlined' color='error'>
                        Eliminar
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              ))}
              <Button
                onClick={() => append({})}
                variant='contained'
                color='secondary'
                sx={{ mt: 1 }}
              >
                Agregar Material
              </Button>
              <FormHelperText sx={{ color: '#d32f2f' }}>
                {errors.materiales ? errors.materiales.message : ' '}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
                <Grid container spacing={0}>
       

       <Grid item xs={12}  >
       <Grid container spacing={0}>
           <Grid tem xs={10} sx={{ backgroundColor:'#29524a'}} padding={2}>

           <Typography variant="h6" gutterBottom color={'white'}>
           
           
             <strong>Nombre del centro de acopio: </strong> {' '}{nombreCentroAcopio}
           
           </Typography>
        

           <Typography variant="h6" gutterBottom color={'white'}>
             <strong>Nombre del cliente: </strong> {' '} {selectedUserName}
           </Typography>
           <Typography variant="h6" gutterBottom color={'white'}>
             <strong>Identificación del cliente: </strong> {' '} {selectedUserIdentificacion}
           </Typography>
           <Typography variant="h6" gutterBottom color={'white'}>
            <strong>Correo electrónico: </strong> {' '} {selectedUserCorreo}
           </Typography>
           <Typography variant="h6" gutterBottom color={'white'}>
             <strong>Fecha de canje: </strong> {' '} {currentDate}
            </Typography>

           </Grid>
           <Grid item xs={2} sx={{ backgroundColor:'#29524a', padding: 2, display: 'flex', justifyContent: 'flex-top', alignItems: 'center'  }} >
           <img 
             src={recycleaf_logo}
             style={{ maxWidth: '100px', height: 'auto', marginRight: '10px', }}
           />
            </Grid>
           </Grid>

           <Grid item xs={12} sx={{ paddingTop: 2 }}>
          <TableContainer sx={{ backgroundColor: '#29524a' }}>
            <Table sx={{ minWidth: 100 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography color={'white'} variant="h6">Material</Typography>
                    
                  </TableCell>
                  <TableCell>
                    <Typography color={'white'} variant="h6">Cantidad</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color={'white'} variant="h6">Unidad de Medida</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color={'white'} variant="h6">Precio</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography color={'white'} variant="h6">Sub total de monedas</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {watchedMaterials.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: 'white' }}>{getMaterialName(row.idMaterial)}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{row.cantidad}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{getMaterialMedida(row.idMaterial)}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{getMaterialPrice(row.idMaterial)}</TableCell>
                    <TableCell sx={{ color: 'white' }} align="right">{getMaterialSubtotal(row.idMaterial, row.cantidad)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell align='right' colSpan={9}>
                    <Typography color={'white'} variant="h5">Total de monedas: {total}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography color={'white'} variant="h5">{}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
     </Grid>
     </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              
              type='submit'
              variant='contained'
              color='secondary'
              sx={{ m: 1 }}
              
            >
              Canjear
            </Button>
          </Grid>
        </Grid>
      </form>
      )}
    </>
  );
}