// SelectMaterial.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, TextField, Typography } from '@mui/material';

export function SelectMaterial({ field, data, error, onChange }) {
  return (
    <Autocomplete
      {...field}
      options={data}
      getOptionLabel={(option) => option.nombre}
      renderOption={(props, option) => (
        <li {...props}>
          <Typography style={{ backgroundColor: option.color, padding: '8px' }}>
            {option.nombre}
          </Typography>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Material"
          variant="standard"
          error={error}
          helperText={error ? 'Selecciona un material' : ''}
        />
      )}
      onChange={(e, newValue) => onChange(newValue ? newValue.id : '')}
    />
  );
}

SelectMaterial.propTypes = {
  field: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  error: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
