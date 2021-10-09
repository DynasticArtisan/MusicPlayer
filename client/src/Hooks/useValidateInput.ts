import React, { useState } from "react"




export const useValidateInput = (type :'email'|'password'|'notEmpty' ) => {
    const [value, setValue] = useState('')
    const [touched, setTouched] = useState(false)
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue (e.target.value)
    }
    const onBlur = () => {
        setTouched(true)
    }
    let helperText = null
    if (type === 'email') {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(value)){
            helperText = 'Uncorrect email adress'
        }
    }
    if (type === 'password') {
        if(value.length < 3) {
            helperText = 'Cannot be less than 3 symbols'
        }
        if(value.length > 10) {
            helperText = 'Cannot be more than 10 symbols'
        }
    }
    if(!value){
        helperText = 'Cannot be emty'
    }
    helperText = touched && helperText
    const error = Boolean(helperText)

    return {
        value, onChange, onBlur, error, helperText
    }
}