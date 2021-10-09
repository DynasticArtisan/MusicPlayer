import React, { useState } from "react"

export const useInput = (initialValue :string) => {
    const [value, setValue] = useState(initialValue)
    const [touched, setTouched] = useState(false)
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue (e.target.value)
    }
    const clear = () => {
        setValue(initialValue)
    }
    const onBlur = () => {
        setTouched(true)
    }
    let emailError = null;
    let passwordError = null;
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(value)){
        emailError = 'Uncorrect email adress'
    }
    if(value.length < 3) {
        passwordError = 'Cannot be less than 3 symbols'
    }
    if(value.length > 10) {
        passwordError = 'Cannot be more than 10 symbols'
    }
    if(!value){
        emailError = 'Cannot be emty'
        passwordError = 'Cannot be emty'
    }

    return {
        value, touched, onChange, clear, onBlur, emailError, passwordError
    }
}