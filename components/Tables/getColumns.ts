import { Column } from 'react-table';
import { TableUnit } from 'types/types';
import { format } from 'date-fns'

export function getColumns(units: TableUnit[]): Column[] {
  return units.reduce((acc: Column[], curr) => {
    // Use reduce to loop through every object in units parameter array
    Object.keys(curr)?.forEach((key) => {
      // Remove the hyphen from header, only needed in accessor b/c react table cannot handle periods in accessor
      const columnHeader = key.match(/(\d)-(\d)/) ? key.replace(/-/, '.') : key;
      // Check if object has been created in accumulator based off of the current key
      if (!acc.find((item) => item.Header === columnHeader && item.accessor === key)) {
        // If not, add it to accumulator array
        if (columnHeader === 'date') {
          acc.push({
            Header: columnHeader,
            accessor: key,
            Cell: ({value}) => (format(new Date(value), 'MMM dd, yyyy') as any)
          })
        } else {
          acc.push({
            Header: columnHeader,
            accessor: key,
            // Not sure what I want to display if no value in current cell
            // Cell: ({ value }) => (value ? value : 'N/A'),
          });
        }
      }
      // Else, continue to next iteration
    });
    return acc;
    // Return array of header objects containing all unique date keys
  }, []);
}
