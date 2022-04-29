import React from 'react'

const useForm = (callback, validate) => {
    const [errors, setErrors] = React.useState({})
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const handleSubmit = e => {
        e.preventDefault();

        // setErrors(validate(values));
        setIsSubmitting(true);
    }

    React.useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback()
        } else {
            setErrors(errors)
        }
    }, [callback, errors, isSubmitting])

    return { handleSubmit, errors };
}

export default useForm;