import { Unit, TableUnit } from 'types/types';

/* 
  Format unit data with date and unit sizes as property keys.
  Would probably be better format for table because it has a 
  max amount of keys which translate to table headers.
  Also, data grows with rows rather than columns. 
 */
export const formatUnitsDate = (units: Unit[]): TableUnit[] => {
  const formatted: TableUnit[] = units.reduce((acc: TableUnit[], curr: Unit) => {
    /* Need to replace periods in object property names because react table
      cannot use accessors w/ periods */
    let unitName = `${curr.dimensions.length}x${curr.dimensions.width} `.replace('.', '-');

    if (curr.type === 'parking') {
      unitName += 'parking';
    } else {
      unitName += curr.climate ? 'climate' : 'non-climate';
    }

    // Search accumulator for object with matching date property
    if (!acc.find((item: TableUnit) => item.date === curr.createdAt?.split('T')?.[0])) {
      // If not found, push new object into accumulator array with date property of current object
      // along with current unit size that maps to unit price
      acc.push({
        date: curr.createdAt?.split('T')?.[0] ? curr.createdAt?.split('T')?.[0] : 'error',
        [unitName]: `$${curr.price}`,
      });
    } else {
      // Else add unit size and number pair to object with matching date
      const row = acc?.find((item: TableUnit) => item.date === curr.createdAt?.split('T')?.[0]);
      if (row !== undefined) {
        row[unitName] = `$${curr.price}`;
      }
    }
    return acc;
  }, []);
  console.log('Table Date Units');
  console.dir(formatted);
  // Return object[] with date property and unit size: price key: value pairs
  return formatted;
};
