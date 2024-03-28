import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

SelectUsuario.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export function SelectUsuario({ field, data, onChange }) {
  return (
    <>
      <>
        <InputLabel id='usuario'>Usuario</InputLabel>
        <Select
          labelId='usuario'
          label='usuario'
          value={field.value}
          onChange={(e) => {
            const selectedUsuario = data.find((usuario) => usuario.id === e.target.value);
            field.onChange(e);
            onChange({
              idUsuario: e.target.value,
              cliente: selectedUsuario.nombrecompleto,
              correo: selectedUsuario.correo,
              identificacion: selectedUsuario.identificacion,
            });
          }}
        >
          {data &&
            data.map((usuario) => (
              <MenuItem key={usuario.id} value={usuario.id}>
                {usuario.nombrecompleto}
              </MenuItem>
            ))}
        </Select>
      </>
    </>
  );
}