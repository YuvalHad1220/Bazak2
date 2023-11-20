import { useForm, RegisterOptions } from "react-hook-form";
import Card from "./Card";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { useState } from "react";

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
    dependsOn?: string
}

type iField = iTextField | iButtonField | iMultipleField | iSelectField;
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
    {
        id: "group",
        title: "קבוצה",
        fieldType: "SELECT",
        options: [
            {id: "group1", value:"קבוצה א"},
            {id: "group2", value:"קבוצה ב"},
            {id: "group3", value: "קבוצה ג"}
            
        ],
        width: 3
    },
    {
        id: "magadal",
        title: "מאגד על",
        fieldType: "SELECT",
        options: [
            {
                id: "tank",
                value: "טנק"
            },
            {
                id: "nagmash",
                value: "נגמש"
            },
            {
                id: "rocket",
                value: "טיל"
            }
        ],
        width: 3
    },
    {
        id: "magad",
        title: "מאגד",
        fieldType: "SELECT",
        options: [
            {
                id: "nahash",
                value: "נחש"
            },
            {
                id: "aria",
                value: "אריה"
            },
            {
                id: "tiger",
                value: "נמר"
            }
        ],
        width: 3,
        dependsOn: "magadal"
    },
    {
        id: "mkabaz",
        title: "מקבץ",
        fieldType: "SELECT",
        options: [
            {
                id: "watermelon",
                value: "אבטיח"
            },
            {
                id: "mango",
                value: "מנגו"
            },
            {
                id: "strawberry",
                value: "תות"
            }
        ],
        width: 3,
        dependsOn: "magad"
    },
    {
        id: "makat",
        title: "מקט",
        fieldType: "SELECT",
        options: [
            {
                id: "sandals",
                value: "סנדלים"
            },
            {
                id: "sports_shoes",
                value: "נעלי ספורט"
            },
            {
                id: "boots",
                value: "מגפיים"
            }
        ],
        width: 3,
        dependsOn: "mkabaz"
    },
    {
        id: "pikod",
        title: "פיקוד",
        fieldType: "SELECT",
        options: [
            { id: "pikod1", value: "פיקוד 1" },
            { id: "pikod2", value: "פיקוד 2" },
            { id: "pikod3", value: "פיקוד 3" }
        ],
        width: 3
    },
    {
        id: "ogda",
        title: "אוגדה",
        fieldType: "SELECT",
        options: [
            { id: "ogda1", value: "אוגדה 1" },
            { id: "ogda2", value: "אוגדה 2" },
            { id: "ogda3", value: "אוגדה 3" }
        ],
        width: 3,
        dependsOn: "pikod"
    },
    {
        id: "hativa",
        title: "חטיבה",
        fieldType: "SELECT",
        options: [
            { id: "hativa1", value: "חטיבה 1" },
            { id: "hativa2", value: "חטיבה 2" },
            { id: "hativa3", value: "חטיבה 3" }
        ],
        width: 3,
        dependsOn: "ogda"
    },
    {
        id: "gdod",
        title: "גדוד",
        fieldType: "SELECT",
        options: [
            { id: "gdod1", value: "גדוד 1" },
            { id: "gdod2", value: "גדוד 2" },
            { id: "gdod3", value: "גדוד 3" }
        ],
        width: 3,
        dependsOn: "hativa"
    },
    {
        id: "peluga",
        title: "פלוגה",
        fieldType: "TEXT_FIELD",
        width: 3
    },
    {
        id: "shevetzak",
        title: "שבצק",
        fieldType: "TEXT_FIELD",
        width: 3
    },
    {
        id: "mikomBimach",
        title: "מיקום בימח",
        fieldType: "TEXT_FIELD",
        width: 3
    },
    {
        id: "maamadGdod",
        title: "מעמד גדוד",
        fieldType: "SELECT",
        options: [
            { id: "sadir", value: "סדיר" },
            { id: "miluim", value: "מילואים" },
            { id: "hachai", value: "החי" }
        ],
        width: 3
    }
    
]

const Form = () => {
    const { register, handleSubmit, getValues, trigger, formState: {errors}, getFieldState } = useForm();

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
    console.log("rerender");
    const parseSelectField = (field: iSelectField) => {
        const value = getValues(field.id);
        return (
                <TextField 
                select 
                fullWidth 
                size="small" 
                defaultValue='' 
                label={field.title} 
                {...(value ? {value} : {}) }
                disabled={!getValues(field.dependsOn!)}
                inputProps={register(field.id, {async onChange() {
                    await trigger(field.id)
                },})}>
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
                <Grid container columnSpacing={2} rowSpacing={2.5}>
                    {fields.map(field => <Grid item xs={field.width ? field.width : 12} key={field.id}><Field field={field} /></Grid>)}
                </Grid>
                <Button sx={{mt: 3}} type="submit" variant="contained">הגש</Button>
            </form>
        </Card>
    )
};

export default Form;