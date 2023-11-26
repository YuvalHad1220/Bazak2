import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import { Button, Divider, Grid, MenuItem, TextField } from "@mui/material";
import { iButtonField, iDynamicListField, iField, iMultipleSelectField, iSelectField, iSelectable, iTextField } from "../interfaces";
import React from "react";
import MultiSelect from "./MultiSelect";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";
import { heIL } from "@mui/x-date-pickers";
import "dayjs/locale/he"

interface iForm {
    fields: iField[],
    onValidated: (formData: any) => void
}

const getFullDependantId = (field: iField, parent?: string) => field.dependsOn ? parent ? `${parent}.${field.dependsOn}` : field.dependsOn : undefined;
const getFullFieldId = (field: iField, parent?: string) => parent ? `${parent}.${field.id}` : field.id;
const Form: React.FC<iForm> = ({fields, onValidated}) => {
    const { register, handleSubmit, getValues, control, trigger, formState: {errors}, getFieldState } = useForm({reValidateMode: "onSubmit"});

    const AsTextField = ({field, parent}: {field: iTextField, parent?: string}) => {
        const fullFieldId = getFullFieldId(field, parent);
        return (
                <TextField size="small" 
                fullWidth 
                helperText={errors[fullFieldId]?.message?.toString()}
                error={Boolean(errors[fullFieldId]?.message)} 
                type={field.inputType} 
                label={field.title}  
                {...register(fullFieldId, {...field.registerOptions})} />
        )
    }


    const AsButtonField = ({field, parent}: {field: iButtonField, parent?: string}) => {
        const dependsOnId = getFullDependantId(field, parent);
        const onButtonClick = async () => {
            if (!field.onAction && !dependsOnId) {
                console.log(`${getFullFieldId(field, parent)} does not have a dependency function or a dependant id`);
                return;
            }
            await trigger(dependsOnId);
            if (dependsOnId && field.onAction && !getFieldState(dependsOnId).error) {
                field.onAction({ value: getValues(dependsOnId) });
            }
        };
        return (
            <Button 
            size="small" 
            fullWidth 
            style={{height: "100%"}} 
            type="button" 
            variant="outlined" 
            onClick={onButtonClick}>
                {field.title}
            </Button>
        );
    }
    const AsSelectField = ({field, parent}: {field: iSelectField, parent?: string})  => {
        const fullFieldId = getFullFieldId(field, parent);
        const dependsOnId = getFullDependantId(field, parent);
        let existingValue = getValues(fullFieldId);
        // triggers watching the state of dependsOn field
        if (dependsOnId)
            useWatch({name: dependsOnId, control});
        
        if (field.unvisibleWhen?.includes(getValues(dependsOnId!))) {
            return null;
        }
        
        const displayedOptions: iSelectable[] = Array.isArray(field.options)
            ? field.options
            : getValues(dependsOnId!) && field.options[getValues(dependsOnId!)] || [];
        

        return (
            <TextField 
            select 
            fullWidth 
            size="small" 
            defaultValue={field.defaultValue ? field.defaultValue.id : existingValue ? existingValue : ''}
            label={field.title} 
            disabled={!getValues(dependsOnId!)}
            inputProps={register(fullFieldId)}>
                {displayedOptions.map(selectable => (<MenuItem key={selectable.id} value={selectable.id}>{selectable.value}</MenuItem>))}
            </TextField>
        )

        // return (
        //     <Controller 
        //     name={field.id}
        //     control={control}
        //     defaultValue={field.defaultValue ? field.defaultValue.id : ''}
        //     render={({
        //         field: {onChange, value},
        //         fieldState: { error }
        //     }) => (
        //         <TextField 
        //         select 
        //         fullWidth 
        //         size="small" 
        //         value={value}
        //         label={field.title} 
        //         onChange={onChange}
        //         disabled={!getValues(dependsOnId!)}
        //         inputProps={register(fullFieldId)}>
        //             {displayedOptions.map(selectable => (<MenuItem key={selectable.id} value={selectable.id}>{selectable.value}</MenuItem>))}
        //         </TextField>
        //     )}
        //     />
        // );
        
    }

    const parseDynamicField = (field: iDynamicListField, parent?: string) => {
        const fullFieldId = getFullFieldId(field, parent);
        const {fields, append, remove} = useFieldArray({control, name: fullFieldId,});
        const innerFields = field.fields;

        return (
            <Grid item container columnSpacing={1.5} rowSpacing={2}>
                <Grid item xs={12}>
                    <Button variant="outlined" onClick={() => append({})}>{field.title}</Button>
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
        const fullFieldId = getFullFieldId(field, parent);
        const dependsOnId = getFullDependantId(field, parent);
        if (field.unvisibleWhen?.includes(getValues(dependsOnId!))){
            return null
        }

        let displayedOptions: iSelectable[] = [];
        if (Array.isArray(field.options)){
            displayedOptions = field.options;
        }
        else {
            const selectedValue = getValues(dependsOnId!);
            if (selectedValue && field.options[selectedValue]){
                displayedOptions = field.options[selectedValue]
            }
        }

        return (
            <Controller
                name={fullFieldId}
                control={control}
                render={({ field: { onChange, ..._field } }) => (
                    <MultiSelect
                        title={field.title}
                        options={displayedOptions}
                        onChange={(_: any, data: any) => onChange(data)}
                        {..._field}
                    />
            )}
        />
    )};

    const parseDate = (field: iField, parent?: string) => {
        return (
            <Controller
            name={getFullFieldId(field, parent)}
            control={control}
            defaultValue={null}
            render={({
                field: {onChange, value},
                fieldState: { error }
            }) => (
                <LocalizationProvider
                dateAdapter={AdapterDayjs} 
                adapterLocale="he"
                localeText={heIL.components.MuiLocalizationProvider.defaultProps.localeText}>
                    <DatePicker 
                        label={field.title}
                        value={value}  
                        reduceAnimations
                        format="DD/MM/YYYY"
                        onChange={event => onChange(event)}
                        slotProps={{ textField: { error: !!error, helperText: error?.message, fullWidth: true  } }}
                    />
                </LocalizationProvider>
            )}
            />
        )
    }
    console.log('rerender');
    // parent will follow if we use dynamicField
    const Field = ({field, parent} : {field: iField, parent?: string}) => {
        switch (field.fieldType) {
            case "TEXT_FIELD": return <AsTextField field={field as iTextField} parent={parent} />
            case "BUTTON": return <AsButtonField field={field as iButtonField} parent={parent} />
            case "SELECT": return <AsSelectField field={field as iSelectField} parent={parent} />
            case "TITLE": return <Divider>{field.title}</Divider>
            case "DYNAMIC_LIST": return parseDynamicField(field as iDynamicListField, parent);
            case "MULTI_SELECT": return parseMultiSelect(field as iMultipleSelectField, parent);
            case "DATE": return parseDate(field, parent);
            default: return null;
        }
    }

    return (
            <form onSubmit={handleSubmit(data => onValidated(data))}>
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