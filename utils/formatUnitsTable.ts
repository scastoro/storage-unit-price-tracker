import { Unit, TableUnit } from 'types/types';

export const formatUnitsTable = (units: Unit[]) => {
  const formatted: TableUnit[] = units.reduce((acc: TableUnit[], curr) => {
    if (
      !acc.find(
        (item: TableUnit) =>
          item.name ===
            `${curr.dimensions.length}x${curr.dimensions.width} ${
              curr.climate ? 'climate' : 'non-climate'
            }` && item.climate === curr.climate
      )
    ) {
      acc.push({
        name: `${curr.dimensions.length}x${curr.dimensions.width} ${
          curr.climate ? 'climate' : 'non-climate'
        }`,
        climate: curr.climate,
        [curr.createdAt?.split('T')?.[0] ? curr.createdAt?.split('T')[0] : 'error']: curr.price,
      });
    } else {
      const row = acc?.find(
        (item: TableUnit) =>
          item.name ===
            `${curr.dimensions.length}x${curr.dimensions.width} ${
              curr.climate ? 'climate' : 'non-climate'
            }` && item.climate === curr.climate
      );
      if (row !== undefined && curr.createdAt?.split('T')?.[0] !== undefined) {
        row[curr.createdAt?.split('T')?.[0]] = curr.price;
      }
    }
    return acc;
  }, []);
  console.log('Table Units');
  console.dir(formatted);
  return formatted;
};
