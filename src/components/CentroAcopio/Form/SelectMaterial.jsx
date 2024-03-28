import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

SelectMaterial.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
};
export function SelectMaterial({ field, data }) {
  return (
    <>
      <>
        <InputLabel id='material'>Material</InputLabel>
        <Select
          {...field}
          labelId='material'
          label='material'
           multiple
          defaultValue={[]}
          value={field.value}
        >
          {data &&
            data.map((material) => (
              <MenuItem key={material.id} value={material.id}>
                {material.nombre}
              </MenuItem>
            ))}
        </Select>
      </>
    </>
  );
}
