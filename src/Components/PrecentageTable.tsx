import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';

import { iMagadData, iUnitData } from "../interfaces";
interface iPrecentageTable {
    magadData: iMagadData
}




const PrecentageTable: React.FC<iPrecentageTable> = ({magadData}) => {
    const theme = useTheme();
    const CenteredTableCell = styled(TableCell)({margin: "auto", textAlign: "center"});
    const StickyTableCell = styled(CenteredTableCell)({position: "sticky", left: "0", backgroundColor: theme.palette.primary.dark});    
    // Collect unique gdod keys and titles
    const uniqueGdods: { [gdodKey: string]: string } = {};

    // Iterate over categories
    for (const categoryKey in magadData) {
        if (magadData.hasOwnProperty(categoryKey)) {
            const category = magadData[categoryKey];
            // Iterate over items in each category
            for (const gdodKey in category.items) {
                if (category.items.hasOwnProperty(gdodKey)) {
                    const gdod = category.items[gdodKey];
                    // Add gdod key and title to the uniqueGdods object
                    uniqueGdods[gdodKey] = gdod.title;
                }
            }
        }
    }

    const getTotalCount = (unit: string) => {
        let totalTrueCount = 0;
        let totalFalseCount = 0;
    
        Object.keys(magadData).forEach((rowHeader) => {
          const carData = magadData[rowHeader].items[unit];
          if (carData) {
            totalTrueCount += carData.trueCount;
            totalFalseCount += carData.falseCount;
          }
        });
    
        // just a random title as it must be provided (wont be displayed in table)
        return { title: unit, trueCount: totalTrueCount, falseCount: totalFalseCount };
      };
      
    
      const sumForMagad = (magad: string) => {
        const foundMagad = magadData[magad];
        
        if (!foundMagad) {
          return { title: "", trueCount: 0, falseCount: 0 };
        }

        const gdodTotals = Object.keys(foundMagad.items).reduce((totals, gdod) => {
          const tankData = foundMagad.items[gdod];
          if (tankData) {
            totals.trueCount += tankData.trueCount;
            totals.falseCount += tankData.falseCount;
          }
          return totals;
        }, { title: magad, trueCount: 0, falseCount: 0 });
      
        return gdodTotals;
      };

      const rowTotals = Object.keys(magadData).reduce((totals, rowHeader) => {
        const magadalTotals = sumForMagad(rowHeader);
        totals.trueCount += magadalTotals.trueCount;
        totals.falseCount += magadalTotals.falseCount;
        return totals;
      }, { title: "all", trueCount: 0, falseCount: 0 });

      console.log(rowTotals);

      const FormattedData = ({ data }: { data?: iUnitData }) => {
        if (!data) {
          return (
            <Typography fontWeight="bold">X</Typography>
          );
        }
    
      const { trueCount, falseCount } = data;
      const percentage = (trueCount / (trueCount + falseCount)) * 100;
      const displayValue = `${trueCount}/${trueCount + falseCount}`;


      const colorClass = percentage < 20 ? 'error.main' : percentage < 80 ? 'warning.main' : 'success.main';
      return (
          <Box sx={{color: colorClass}}>
              <Typography fontWeight="bold">{percentage.toFixed(2)}%</Typography>
              <Typography>{displayValue}</Typography>
          </Box>
        );
      };

      
    return (
        <Table stickyHeader>
            <TableHead>
                <TableRow>
                    {/*empty table cell*/}
                    <StickyTableCell></StickyTableCell>
                    {Object.keys(magadData).map((rowHeader) => (
                        <StickyTableCell key={rowHeader}>{magadData[rowHeader].title}</StickyTableCell>
                    ))}
                    <StickyTableCell>הכל</StickyTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.keys(uniqueGdods).map(gdodId => (
                    <TableRow key={gdodId}>
                        <StickyTableCell>{uniqueGdods[gdodId]}</StickyTableCell>
                        {Object.keys(magadData).map(rowHeader => (
                            <CenteredTableCell key={rowHeader}>
                                <FormattedData data={magadData[rowHeader].items[gdodId]}/>
                            </CenteredTableCell>
                        ))}
                        <CenteredTableCell>
                            <FormattedData data={getTotalCount(gdodId)} />
                        </CenteredTableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <StickyTableCell>הכל</StickyTableCell>
                    {Object.keys(magadData).map((rowHeader) => (
                        <CenteredTableCell key={rowHeader}>
                            <FormattedData data={sumForMagad(rowHeader)} />
                        </CenteredTableCell>
                    ))}
                    <CenteredTableCell><FormattedData data={rowTotals} /></CenteredTableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export default PrecentageTable;