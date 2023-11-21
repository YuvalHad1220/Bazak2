import { Autocomplete, TextField } from "@mui/material"
import { iSelectable } from "../interfaces";

interface iMultiSelect {
    options: iSelectable[],
    defaultSelectedValues?: iSelectable[],
    title: string,
    onChange: Function
}

const MultiSelect: React.FC<iMultiSelect> = ({ options, defaultSelectedValues, onChange, title, ...rest }) => {
    return (
      <Autocomplete
        multiple
        disableCloseOnSelect
        forcePopupIcon
        filterSelectedOptions
        freeSolo
        options={options.map(item => item.value)}
        onChange={(_, data) => onChange(data)}
        renderInput={(params) => (
          <TextField {...params} label={title} inputProps={{ ...params.inputProps, readOnly: true }} />
        )}
        defaultValue={defaultSelectedValues?.map(item => item.value)}
        size="small"
        {...rest}
      />
    );
  };
  
  export default MultiSelect;