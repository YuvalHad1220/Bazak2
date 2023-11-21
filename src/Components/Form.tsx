import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { iButtonField, iDynamicListField, iField, iMultipleSelectField, iSelectField, iTextField } from "../interfaces";
import React from "react";
import MultiSelect from "./MultiSelect";


interface iForm {
    fields: iField[]
}

const Form: React.FC<iForm> = ({fields}) => {
    const { register, handleSubmit, getValues, control, trigger, formState: {errors}, getFieldState } = useForm({reValidateMode: "onSubmit"});

    const parseTextField = (field: iTextField, parent?: string) => {
        const fullFieldId = parent ? `${parent}.${field.id}` : field.id;
        return (
                <TextField size="small" 
                fullWidth 
                error={errors[field.id] ? true : false} 
                type={field.inputType} 
                label={field.title}  
                {...register(fullFieldId, {...field.registerOptions})} />
        )
    }
    const parseButtonField = (field: iButtonField, parent?: string) => {
        const dependsOnId = field.dependsOn ? parent ? `${parent}.${field.dependsOn}` : field.dependsOn : undefined;
        const onButtonClick = async () => {
            if (!(field.onAction && dependsOnId)){
                console.log(field.id, "does not have a dependency function")
            }
            await trigger(field.dependsOn);
            if (getFieldState(field.dependsOn!).error){
                return;
            }

            field.onAction!({value: getValues(dependsOnId!)})
        }
        return (
            <Button 
            size="small" 
            fullWidth sx={{height: "100%"}} 
            type="button" 
            variant="outlined" 
            onClick={onButtonClick}>
                {field.title}
            </Button>
        );
    }
    const parseSelectField = (field: iSelectField, parent?: string) => {
        const fullFieldId = parent ? `${parent}.${field.id}`: field.id;
        const dependsOnId = field.dependsOn ? parent ? `${parent}.${field.dependsOn}` : field.dependsOn : undefined;
        const value = getValues(fullFieldId);
        return (
                <TextField 
                select 
                fullWidth 
                size="small" 
                defaultValue={field.defaultValue ? field.defaultValue.value : ''}
                label={field.title} 
                {...(value ? {value} : {}) }
                disabled={!getValues(dependsOnId!)}
                inputProps={register(fullFieldId, {async onChange() {
                    await trigger(fullFieldId)
                },})}>
                    {field.options.map(selectable => (<MenuItem key={selectable.id} value={selectable.value}>{selectable.value}</MenuItem>))}
                </TextField>
        )

    };

    const parseDynamicField = (field: iDynamicListField, parent?: string) => {
        const fullFieldId = parent ? `${parent}.${field.id}`: field.id;
        const {fields, append, remove} = useFieldArray({control, name: fullFieldId,});
        const fieldTitle = field.title;
        const innerFields = field.fields;

        return (
            <Grid item container columnSpacing={1.5} rowSpacing={2}>
                <Grid item xs={12}>
                    <Button variant="outlined" onClick={() => append({})}>{fieldTitle}</Button>
                </Grid>
                {fields.map((field, index) => 
                    innerFields.map(innerField => (
                        <Grid item key={`${field.id}-${index}-${innerField.id}`} xs={innerField.width ? innerField.width : 12}>
                            <Field field={innerField} parent={`${fullFieldId}.${index}`}/>
                        </Grid>
                    ))
                )}
            </Grid>

        );
    }

    const parseMultiSelect = (field: iMultipleSelectField, parent?: string) => {
        const fullFieldId = parent ? `${parent}.${field.id}`: field.id;
        return (
            <Controller
                name={fullFieldId}
                control={control}
                render={({ field: { onChange, ..._field } }) => (
                    <MultiSelect
                        title={field.title}
                        options={field.options}
                        onChange={(_: any, data: any) => onChange(data)}
                        {..._field}
                    />
            )}
        />
    )};

    // parent will follow if we use dynamicField
    const Field = ({field, parent} : {field: iField, parent?: string}) => {
        switch (field.fieldType) {
            case "TEXT_FIELD": return parseTextField(field as iTextField, parent);
            case "BUTTON": return parseButtonField(field as iButtonField, parent);
            case "SELECT": return parseSelectField(field as iSelectField, parent);
            case "TITLE": return <Typography textAlign="center" variant="h6">{field.title}</Typography>
            case "DYNAMIC_LIST": return parseDynamicField(field as iDynamicListField, parent);
            case "MULTI_SELECT": return parseMultiSelect(field as iMultipleSelectField, parent);
            default: return null;
        }
    }

    return (
            <form onSubmit={handleSubmit(data => console.log(data))}>
                <Grid container columnSpacing={1.5} rowSpacing={2}>
                    {fields.map(field => (
                        <Grid item xs={field.width ? field.width : 12} key={field.id}>
                            <Field field={field} />
                        </Grid>
                    ))}
                </Grid>
                <Button sx={{mt: 3}} type="submit" variant="contained">הגש</Button>
            </form>
    )
};

export default Form;