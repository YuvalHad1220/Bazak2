import { Autocomplete, TextField } from "@mui/material"
import { iSelectable } from "../interfaces";
import { useState } from "react";

interface iMultiSelect {
    options: iSelectable[],
    defaultSelectedValues?: iSelectable[],
    title: string,
    onChange: Function
}

const MultiSelect: React.FC<iMultiSelect> = ({ options, defaultSelectedValues, onChange, title, ...rest }) => {
  const [defaultValues, setDefaultValues] = useState<string[]>(defaultSelectedValues ? defaultSelectedValues.map(item => item.value): []);
  const _internalOnChange = (data: string[]) => {
    if (data.includes("בחר הכל")){
      const newSelected = options.map(item => item.value);
      setDefaultValues(newSelected);
      onChange(newSelected);
    }
    else {
      onChange(data);
    }
  }

  const optionsList = defaultValues.length === options.length ? options.map(item => item.value) : ["בחר הכל", ...options.map(item => item.value)];
    return (
      <Autocomplete
        multiple
        disableCloseOnSelect
        forcePopupIcon
        filterSelectedOptions
        ref={null}
        freeSolo
        options={optionsList}
        onChange={(_, data) => _internalOnChange(data)}
        renderInput={(params) => (
          <TextField {...params} label={title} inputProps={{ ...params.inputProps, readOnly: true }} />
        )}
        defaultValue={defaultValues}
        size="small"
        {...rest}
      />
    );
  };
  
  export default MultiSelect;