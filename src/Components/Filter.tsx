import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import Card from "./Card";
import { iMultiSelectFilter, iToggleFilter, iFilter } from "../interfaces";
import MultiSelect from "./MultiSelect";
import { useState } from "react";




interface iFilterComponent {
  filterFields: iFilter[],
  onFilterChange: (filter: any) => void,
}
const Filter: React.FC<iFilterComponent> = ({filterFields, onFilterChange}) => {
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
          const newFilter = new Set<string>();
          setFilter(newFilter);
          onFilterChange(newFilter);
        }
        else {
          const newFilter = new Set(field.options.map(field => field.id));
          setFilter(newFilter);
          onFilterChange(newFilter);
        }
      };
  
      const onSelection = (optionId: string) => {
        const newFilter = new Set(filter);
        if (newFilter.has(optionId)) {
          newFilter.delete(optionId); // Remove the option if it exists
        } else {
          newFilter.add(optionId); // Add the option if it doesn't exist
        }
      
      console.log("old selected values:", filter);
      console.log("new selected values:", newFilter);
      setFilter(newFilter);
      onFilterChange(newFilter);
  
        
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
      
  
      const Field = ({field} : {field: iFilter}) => {
        switch (field.type) {
            case "MULTISELECT": return parseMultiSelect(field as iMultiSelectFilter);
            case "TOGGLE": return parseToggle(field as iToggleFilter);
            default: return null;
        }
      };
      
    return (
        <Card style={{height: "100%"}}>
            <Grid container columnSpacing={1.5} rowSpacing={2} >
                {filterFields.map(field => (
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