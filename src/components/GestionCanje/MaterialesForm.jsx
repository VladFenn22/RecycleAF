import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import Tooltip from '@mui/material/Tooltip';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { SelectMaterial } from '../CentroAcopio/Form/SelectMaterial';

MaterialesForm.propTypes = {
    data: PropTypes.array,
    control: PropTypes.object,
    index: PropTypes.number,
    onRemove: PropTypes.func,
    disableRemoveButton: PropTypes.bool,
  };
  
  export function MaterialesForm({
    data,
    control,
    index,
    onRemove,
    disableRemoveButton,
  }) {
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  
    const handleAddMaterialClick = () => {
      setShowAdditionalFields(true);
    };
  
    return (
      <section>
        <Grid item xs={12} md={12}>
          <List>
            <ListItem>
              <ListItemIcon>
                <Tooltip title={`Material ${index + 1}`}>
                  <IconButton onClick={handleAddMaterialClick}>
                    <DirectionsRunIcon />
                  </IconButton>
                </Tooltip>
              </ListItemIcon>
              <ListItemText>
                <Controller
                  key={index}
                  name={`materiales[${index}].id`}
                  control={control}
                  render={({ field }) => (
                    <SelectMaterial field={field} data={data} />
                  )}
                />
              </ListItemText>
              {showAdditionalFields && (
                <>
                  <ListItemText sx={{ m: 1 }}>
                    <Controller
                      key={index}
                      name={`materiales[${index}].nombre`}
                      control={control}
                      render={({ field }) => <TextField {...field} label='Material' />}
                    />
                  </ListItemText>
                  <ListItemText sx={{ m: 1 }}>
                    <Controller
                      key={index}
                      name={`materiales[${index}].cantidad`}
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} label='Cantidad del material' />
                      )}
                    />
                  </ListItemText>
                  <ListItemText sx={{ m: 1 }}>
                    <Controller
                      key={index}
                      name={`materiales[${index}].unidad_medida`}
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} label='Unidad de Medida' />
                      )}
                    />
                  </ListItemText>
                </>
              )}
              <ListItemIcon>
                <Tooltip title={`Eliminar Material ${index + 1}`}>
                  <span>
                    <IconButton
                      key={index}
                      edge='end'
                      disabled={disableRemoveButton}
                      onClick={() => onRemove(index)}
                      aria-label='Eliminar'
                    >
                      <DeleteIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </ListItemIcon>
            </ListItem>
          </List>
        </Grid>
      </section>
    );
  }