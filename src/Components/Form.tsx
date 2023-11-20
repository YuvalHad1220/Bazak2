import classname from "classnames";
import { useForm, RegisterOptions, Controller } from "react-hook-form";
import Card from "./Card";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";

type fieldTypes = "SELECT" | "TEXT_FIELD" | "DATE" | "SELECTIONS_LIST" | "BUTTON";
interface iSelectable {
    id: string | number,
    value: string
}

interface iBasicField {
    id: string,
    title: string,
    width?: number, // must be between 1 to 12
    fieldType: fieldTypes,
    dependsOn?: string, // a key
    registerOptions?: RegisterOptions
}

interface iTextField extends iBasicField {
    inputType?: "number" | "text" | "date" 
}


interface iButtonField extends iBasicField {
    onAction?: (dependOnValue: any) => void
}

interface iMultipleField extends iBasicField {
    options: iSelectable[],
    selectedValues: iSelectable[],
    onChange: (selectedValues: iSelectable[]) => void
}

// a chosen option will be returned on the same type
interface iSelectField extends iBasicField {
    options: iSelectable[],
}

type iField = iTextField | iButtonField | iMultipleField | iSelectField;


const Form = () => {
    const { register, handleSubmit, getValues, trigger, formState: {errors}, getFieldState } = useForm();
    const fields: iField[] = [
        {
            id: "carnumber",
            inputType: "text",
            title: "מספר מכונית",
            fieldType: "TEXT_FIELD",
            width: 2,
            registerOptions: {
                required: "חובה להכניס מספר מכונית",
                maxLength: {value: 8, message: "מספר מכונית חייב להיות בדיוק 8 תווים"},
                minLength: {value: 8, message: "מספר מכונית חייב להיות בדיוק 8 תווים"},

            }
        },
        {
            id: "search_car",
            title: "חיפוש",
            fieldType: "BUTTON",
            width: 1,
            dependsOn: "carnumber",
            onAction: (dependentValue: any) => {console.log(dependentValue)},
        },
        {
            id: "family",
            inputType: "text",
            title: "משפחה",
            fieldType: "TEXT_FIELD",
            width: 3
        },
        {
            id: "status",
            title: "סטאטוס הכלי",
            fieldType: "SELECT",
            options: [
                {id: "working", value:"עובד"},
                {id: "broken", value:"מקולקל"},
                {id: "half", value: "חצי כוח עובד"}
                
            ],
            width: 3
        },
    ]
    const parseTextField = (field: iTextField) => {
        return (
                <TextField size="small" 
                fullWidth 
                error={errors[field.id] ? true : false} 
                type={field.inputType} 
                label={field.title}  
                {...register(field.id, {...field.registerOptions})} />
        )
    }
    const parseButtonField = (field: iButtonField) => {
        const onButtonClick = async () => {
            if (!(field.onAction && field.dependsOn)){
                console.log(field.id, "does not have a dependency function")
            }
            await trigger(field.dependsOn);
            if (getFieldState(field.dependsOn!).error){
                return;
            }

            field.onAction!({value: getValues(field.dependsOn!)})
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

    const parseSelectField = (field: iSelectField) => {
        const value = getValues(field.id);
        
        return (
                <TextField select fullWidth size="small" defaultValue='' label={field.title} value={value} inputProps={register(field.id)}>
                    {field.options.map(selectable => (<MenuItem key={selectable.id} value={selectable.value}>{selectable.value}</MenuItem>))}
                </TextField>
        )

    };

    const Field = ({field} : {field: iField}) => {
        switch (field.fieldType) {
            case "TEXT_FIELD": return parseTextField(field as iTextField);
            case "BUTTON": return parseButtonField(field as iButtonField);
            case "SELECT": return parseSelectField(field as iSelectField);
            
        }
    } 

    return (
        <Card sx={{height: "100%",}}>
        {/*toast on error */}
            <form onSubmit={handleSubmit(data => console.log(data))}>
                <Grid container columnSpacing={2}>
                    {fields.map(field => <Grid item xs={field.width ? field.width : 12} key={field.id}><Field field={field} /></Grid>)}
                </Grid>
                <Button type="submit" variant="contained">הגש</Button>
            </form>
        </Card>
    )
};

export default Form;