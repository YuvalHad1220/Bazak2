import { FunctionComponent, SVGProps } from "react"
import { RegisterOptions } from "react-hook-form";

export interface iSelectable {
  id: string | number,
  value: string
}

export interface iNavItem {
    text: string,
    to: string,
    Icon: FunctionComponent<SVGProps<SVGSVGElement>>
  }
  
export interface iNavSection {
    text: string,
    items: iNavItem[]
  }
  

export interface iMenuTreeItem {
  text: string,
  items?: iMenuTreeItem[]
}

export interface iUnitData {
  title: string,
  trueCount: number,
  falseCount: number,
}

// title will be display value, items.key will be the units
export interface iMagadData {
  [key: string]: {
    title: string,
    items: {
      [key: string]: iUnitData,
    }
  };
}

export type fieldTypes = "SELECT" | "TEXT_FIELD" | "DATE" | "MULTI_SELECT" | "BUTTON" | "TITLE" | "DYNAMIC_LIST";


interface iBasicField {
    id: string,
    title: string,
    width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12, // must be between 1 to 12
    fieldType: fieldTypes,
    dependsOn?: string, // a key
    registerOptions?: RegisterOptions
}

export interface iTextField extends iBasicField {
    inputType: "number" | "text" | "date"
    defaultValue?: number | string | Date,
}


export interface iButtonField extends iBasicField {
    onAction?: (dependOnValue: any) => void
}

export interface iMultipleSelectField extends iBasicField {
    options: iSelectable[],
    defaultSelectedValues?: iSelectable[],
}

export interface iSelectField extends iBasicField {
    options: iSelectable[],
    defaultValue?: iSelectable,

}

export interface iDynamicListField extends iBasicField {
    fields: iField[]
}

export type iField = iTextField | iButtonField | iMultipleSelectField | iSelectField;