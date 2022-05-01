import { Column } from 'react-table';
import { TableUnit } from 'types/types';

export function getColumns(units: TableUnit[]): Column[] {
  return units.reduce((acc: Column[], curr) => {
    // Use reduce to loop through every object in units parameter array
    Object.keys(curr).forEach((key) => {
      // Check if object has been created in accumulator based off of the current key
      if (!acc.find((item) => item.Header === key && item.accessor === key)) {
        // If not, add it to accumulator array
        acc.push({
          Header: key,
          accessor: key,
        });
      }
      // Else, continue to next iteration
    });
    return acc;
    // Return array of header objects containing all unique date keys
  }, []);
}
