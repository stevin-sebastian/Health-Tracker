import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Button from "../../controls/Button";
import Input from "../../controls/Input";
import { useForm, Form } from '../useForm';


const initialFValues = {
    weight: '',
    userID: ''
}

export default function RegisterForm(props) {
    const { addOrEdit, recordForEdit } = props
    console.log(props);
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const input = {
              userID: props.auth.user.id,
              weight: values.weight,
              height: props.auth.user.height
            };
            props.addNewRecord(input, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container >
                <Grid item xs={12}>
                    <Input
                        name="weight"
                        label="Today's Weight (kg)"
                        value={values.weight}
                        onChange={handleInputChange}
                        error={errors.weight}
                        style={{margin: '0px 50px 0px 50px'}}
                    />
                </Grid>
            </Grid>
            <Grid container >
                <Grid item xs={5}></Grid>
                <Grid item xs={2}>
                <div>
                    <Button style={{margin: '15px 0px 0px 0px'}}
                        type="submit"
                        text="Submit" />
                </div>
                </Grid>
                <Grid item xs={5}></Grid>
            </Grid>
        </Form>
    )
}
