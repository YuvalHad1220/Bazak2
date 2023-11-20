import { FunctionComponent, SVGProps } from "react"

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
  trueCount: number;
  falseCount: number;
}

export interface iMagadData {
  [key: string]: {
    [key: string]: iUnitData;
  };
}

