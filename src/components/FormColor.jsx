    import React from 'react';
    import PropTypes from 'prop-types';


    const FormColor = ({ onChange, label, id, value }) => {
        return (
        <div className='form_color'>
            <label htmlFor={id}>{label}</label>
            <div className='form-imput-wrapper'>
            <div
                className='form-imput-fill'
                data-color={value}
                style={{ color: value }}
            ></div>
            <input
                className='entrada'
                onChange={onChange}
                value={value}  
                name={id}
                id={id}
                type="color"
            />
            </div>
            
        </div>
        );
    };

    FormColor.propTypes = {
        onChange: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    };

    export default FormColor;
