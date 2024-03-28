import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

SelectProvincia.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};
export function SelectProvincia({ field, data, onChange }) {
  return (
    <>
      <>
        <InputLabel id='provincia'>Provincia</InputLabel>
        <Select
          {...field}
          onChange={(e) => onChange(e.target.value)}
          labelId='provincia'
          label='provincia'
          defaultValue=''
          value={field.value}
        >
          {data &&
            data.map((provincia) => (
              <MenuItem key={provincia.id} value={provincia.id}>
                {provincia.provincia} 
              </MenuItem> 
            ))}
        </Select>
      </>
    </>
  );
}
