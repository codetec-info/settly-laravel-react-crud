import React, {useState} from "react";

/**
 * I created the useForm hook which is a helper hook to use it in both the Login and Register forms.
 * It contains some state info like errors and message and a single function renderFieldError() to use
 * it to display validation errors below specific form field.
 */
export const form = () => {

    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState('');

    function renderFieldError(field) {
        if (errors && errors.hasOwnProperty(field)) {
            return errors[field][0] ? (
                <span className="invalid-feedback" role="alert"><strong>{errors[field][0]}</strong></span>
            ) : null;
        }

        return null;
    }

    return {
        errors,
        setErrors,
        message,
        setMessage,
        renderFieldError
    }
}