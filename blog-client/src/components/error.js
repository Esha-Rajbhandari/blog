import React from 'react';

const FormError = (props) => {
    return (
        props.error.hasError ?
            <div className="text-danger">{props.error.errorMessage}</div>
            :
            null
    )
}

export default FormError;