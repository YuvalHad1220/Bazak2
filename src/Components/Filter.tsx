import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import Card from "./Card";
import { iSelectable } from "../interfaces";
import MultiSelect from "./MultiSelect";
import { useState } from "react";

type tFlterField = "TOGGLE" | "MULTISELECT";
interface iBasicFilter {
    title: string,
    id: string,
    options: iSelectable[],
    type: tFlterField,
    width?: 1|2|3|4|5|6|7|8|9|10|11|12,
    dependsOn?: string,
    unvisibleOn?: string,
    defaultValues?: iSelectable[]
};

interface iToggleFilter extends iBasicFilter{
    selectAll: boolean,
    flexDirection?: "row" | "column"
}

interface iMultiSelectFilter extends iBasicFilter {

}

type iFilter = iToggleFilter | iMultiSelectFilter;

const parseMultiSelect = (field: iMultiSelectFilter) => {
    return (
        <MultiSelect options={field.options} title={field.title} onChange={(data: string[]) => console.log(data)}/>
    );
}

const parseToggle = (field: iToggleFilter) => {
    const [filter, setFilter] = useState<Set<string>>(new Set(field.defaultValues?.map(item => item.id)));
    const isAllChekced = filter.size === field.options.length;
    const onSelectAll = () => {
      if (isAllChekced){
        setFilter(new Set());
      }
      else {
        setFilter(new Set(field.options.map(field => field.id)));
      }
    };

    const onSelection = (optionId: string) => {
      setFilter((prevFilter) => {
        const newFilter = new Set(prevFilter);
        if (newFilter.has(optionId)) {
          newFilter.delete(optionId); // Remove the option if it exists
        } else {
          newFilter.add(optionId); // Add the option if it doesn't exist
        }
  
        return newFilter;
      });

      
    };

    return (
        <FormGroup sx={{display: "flex", flexDirection: field.flexDirection ? field.flexDirection : "column",}}>
            <FormControlLabel control={<Checkbox size="small" checked={filter.size === field.options.length} onChange={onSelectAll}/>} label="בחר הכל" />
            {field.options.map(option => (
                <FormControlLabel key={option.id} control={<Checkbox size="small" checked={filter.has(option.id)} />} onChange={() => onSelection(option.id)} label={option.value}/>
            ))}
        </FormGroup>
    )
}

const Filter = () => {
    console.log("rerender");
    // will be a hook to take into consideration all the changes, need to look into current bazak
    const fields: iFilter[] = [
        {
          title: "זמינות",
          id: "zminot",
          options: [
            { id: "1", value: "זמין" },
            { id: "2", value: "לא זמין" },
          ],
          type: "TOGGLE",
          selectAll: false,
          width: 4,
        },
        {
          title: "סיבת אי זמינות",
          id: "takalaReason",
          options: [
            { id: "3", value: "טיפול" },
            { id: "4", value: "חריג טיפול" },
            { id: "5", value: "תקלה מזדמנת" },
          ],
          defaultValues: [
            { id: "5", value: "תקלה מזדמנת" },
          ],
          type: "TOGGLE",
          width: 6,
        },
        {
          title: "מאגד על",
          id: "magadal",
          options: [
            { id: "6", value: "משהו" },
            { id: "7", value: "משהו2" },
            { id: "8", value: "משהו3" },
          ],
          type: "MULTISELECT",
          unvisibleOn: "magad",
          width: 6,
        },
        {
          title: "מאגד",
          id: "magad",
          options: [
            { id: "9", value: "מאגד 1" },
            { id: "10", value: "מאגד 2" },
            { id: "11", value: "מאגד 4" },
          ],
          type: "MULTISELECT",
          dependsOn: "magadal",
          width: 12,
        },
        {
          title: "אופציות סינון",
          id: "columnsToShow",
          type: "TOGGLE",
          selectAll: true,
          options: [
            { id: "tz", value: "צ׳" },
            { id: "magad_al", value: "מאגד על" },
            { id: "magad", value: "מאגד" },
            { id: "mikbatz", value: "מקבץ" },
            { id: "makt", value: "מק״ט" },
            { id: "description_makt", value: "תיאור מק״ט" },
            { id: "family", value: "משפחה" },
            { id: "pikud", value: "פיקוד" },
            { id: "ogda", value: "אוגדה" },
            { id: "hativa", value: "חטיבה" },
            { id: "gdod", value: "גדוד" },
            { id: "pluga", value: "פלוגה" },
            { id: "shabtak", value: "שבצ״ק" },
            { id: "mikom_bimach", value: "מיקום בימ״ח" },
            { id: "maamad_hakli", value: "מעמד הכלי" },
            { id: "status_hakli", value: "סטאטוס הכלי" },
            { id: "zminut", value: "זמינות" },
            { id: "kshirot_lamilchama", value: "כשירות למלחמה" },
            { id: "yamei_shehiya", value: "ימי שהייה" },
            { id: "mikum", value: "מיקום" },
            { id: "moed_kiyum_acharon", value: "מועד כיול אחרון" },
            { id: "sibot_ay_zminut", value: "סיבות אי-זמינות" },
            { id: "tarih_acharon", value: "תאריך עדכון אחרון" },
          ],
          flexDirection: "row"
        }
      ];
    

    const onClick = (id: string, newValue: string[] | string) => {

    };


    const Field = ({field} : {field: iFilter}) => {
        switch (field.type) {
            case "MULTISELECT": return parseMultiSelect(field as iMultiSelectFilter);
            case "TOGGLE": return parseToggle(field as iToggleFilter);
            default: return null;
        }
    };



    return (
        <Card sx={{height: "100%"}}>
            <Grid container columnSpacing={1.5} rowSpacing={2} >
                {fields.map(field => (
                    <Grid item xs={field.width ? field.width : 12} key={field.id}>
                        <Field field={field} />
                    </Grid>
                ))}
            </Grid>
        </Card>
    )

};


export default Filter;

// will work in a way:
// it will get a list of objects and their options
// will return of the selected options of each, or it will be multiselect, or toggle