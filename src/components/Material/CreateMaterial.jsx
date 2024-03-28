import {  useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-hot-toast';

import MaterialServices from '../../services/MaterialServices';
import FormColor from '../FormColor';
import { FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

export function CreateMaterial() {
  const navigate = useNavigate();

  // Esquema de validación
  const materialSchema = yup.object({
    nombre: yup
      .string()
      .required('El nombre del material es requerido')
      .min(3, 'El nombre debe tener 3 caracteres'),
    descripcion: yup.string().required('La  descripción es requerida'),
    unidad_medida: yup
      .string()
      .required('La unidad de medida es requerida'),
    precio: yup
      .string()
      .required('El precio es requerido')
  });
  const {
    control,
    handleSubmit,   
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: '',
      descripcion: '', 
      unidad_medida: '',
      precio: '',
    },
    // Asignación de validaciones
    resolver: yupResolver(materialSchema),
  });

  



  const [error, setError] = useState('');

  const[color1, setColor] = useState("#31F7C7");

  // Accion submit
  const onSubmit = async (DataForm) => {
    console.log('Formulario:')
    console.log(DataForm)
    
    try {
      if(materialSchema.isValid()){
        const imageUrl = await handleImageUpload();
        DataForm.color = color1;
  
      // Assuming your API expects an 'image' field for the image URL
      DataForm.linkImagen = imageUrl;
        //Crear material
        MaterialServices.createMaterial(DataForm)
        .then((response) => {
          console.log(response);
          setError(response.error);
          //Respuesta al usuario de creación
          if (response.data.results != null) {
            toast.success(response.data.results, {
              duration: 4000,
              position: 'top-center',
            });
            // Redireccion a la tabla
            
          }
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            setError(error);
            throw new Error('Respuesta no válida del servidor');

          }
          toast.error('Failed to create material. Please try again later.', {
            duration: 4000,
            position: 'top-center',
          });
        });
          }
          navigate('/material-table');
      
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
      const randomNumber = Math.floor(Math.random() * 100000); 
      const fileName = `${randomNumber}_${file.name}`; 
      const formData = new FormData();
      formData.append('image', file, fileName);
  
      const response = await fetch('http://localhost:81/apiRecycleaf/ImangeHandler', {
        method: 'POST',
        body: formData,
      });
  
      const imageUrl = await response.text();
      console.log('Image uploaded successfully:', imageUrl);
      return fileName; // Return the modified file name
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
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
              Crear material
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='descripcion'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='descripcion'
                    label='Descripción del material'
                    error={Boolean(errors.descripcion)}
                    helperText={errors.descripcion ? errors.descripcion.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>

        


          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
            <InputLabel id='unidad-medida-label'>Unidad de Medida</InputLabel>
              <Controller
              name='unidad_medida'
                control={control}
                render={({ field }) => (
                  <Select
                  {...field}
                  labelId='unidad-medida-label'
                  id='unidad_medida'
                  label='Unidad de Medida'
                  error={Boolean(errors.unidad_medida)}
                >
                  <MenuItem value='kg'>Kilogramo (kg)</MenuItem>
                  <MenuItem value='gr'>Gramo (gr)</MenuItem>
                  <MenuItem value='l'>Litro (l)</MenuItem>
                  <MenuItem value='ml'>Mililitro (ml)</MenuItem>
                  <MenuItem value='unidad'>Unidad</MenuItem>
                </Select>
                )}
              />
              <FormHelperText sx={{ color: '#d32f2f' }}>
                 {errors.unidad_medida ? errors.unidad_medida.message : ' '}
              </FormHelperText>

            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
              name='precio'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='precio'
                    label='Precio'
                    error={Boolean(errors.precio)}
                    helperText={errors.precio ? errors.precio.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>


          <Grid item sx={12} sm={4}>
          <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                  <Controller
                    name='color'
                      control={control}
                      render={({ field }) =>(
                        <FormColor
                        {...field}
                        onChange={(e) => setColor(e.target.value)}
                        label='Color'
                        error={Boolean(errors.color)}
                        value={field.value} 
                        helperText={errors.color ? errors.color.message : ' '}
                        />
                      )
                    }
                  />
           </FormControl>
          </Grid>


          <Grid item sx={12} sm={4}>
          <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
          <h2 >Seleccione Imágen</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            

            {file && (
        <div>
          <h2>Imágen Seleccionada:</h2>
          <img
            src={URL.createObjectURL(file)}
            alt="Selected"
            style={{ maxWidth: '300px' }}
          />
        </div>
      )}

            </FormControl>
            
            </Grid>

          
          <Grid item xs={12} sm={12}>
            <Button
              
              type='submit'
              variant='contained'
              color='secondary'
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
