import express from 'express'

export const registerValidation = (req :express.Request, res :express.Response, next :express.NextFunction) => {
    try {
        const { email, password } = req.body
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(!email || !password) {
            res.status(400).send({
                message: 'Data is not enought!'
            })
        }
        
        if(!re.test(email)){
            res.status(400).send({
                message: 'Wrong email adress!'
            })
        }

        if(password.length < 3 || password.length > 10){
            res.status(400).send({
                message: 'Incorrect password!'
            })
        }
        next()
    } catch (e) {
        res.status(400).send({
            message: 'Incorrect data!'
        })
    }
}
