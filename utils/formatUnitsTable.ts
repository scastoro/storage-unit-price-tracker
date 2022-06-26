import { Unit, TableUnit } from 'types/types';

// Format and return unit data for use in React Table
export const formatUnitsTable = (units: Unit[]) => {
  // Generate array of objects that contain the unit size and price that corresponds to a date
  const formatted: TableUnit[] = units.reduce((acc: TableUnit[], curr) => {
    const unitName = `${curr.dimensions.length}x${curr.dimensions.width} ${
      curr.climate ? 'climate' : 'non-climate'
    }`.replace('.', '-');

    console.log(unitName);
    if (
      // Determine if object exists based on name property
      !acc.find(
        (item: TableUnit) =>
          item.name ===
          `${curr.dimensions.length}x${curr.dimensions.width} ${
            curr.climate ? 'climate' : 'non-climate'
          }`.replace('.', '-')
      )
    ) {
      // If not, push new object into array
      acc.push({
        name: `${curr.dimensions.length}x${curr.dimensions.width} ${
          curr.climate ? 'climate' : 'non-climate'
        }`.replace('.', '-'),
        [curr.createdAt?.split('T')?.[0] ? curr.createdAt?.split('T')[0] : 'error']:
          `$${curr.price}`.replace('.', '-'),
      });
      // Else add new property to existing object.
    } else {
      const row = acc?.find(
        (item: TableUnit) =>
          item.name ===
          `${curr.dimensions.length}x${curr.dimensions.width} ${
            curr.climate ? 'climate' : 'non-climate'
          }`.replace('.', '-')
      );
      if (row !== undefined && curr.createdAt?.split('T')?.[0] !== undefined) {
        row[curr.createdAt?.split('T')?.[0]] = `$${curr.price}`.replace('.', '-');
      }
    }
    return acc;
  }, []);
  // console.log('Table Units');
  // console.dir(formatted);
  return formatted;
};
