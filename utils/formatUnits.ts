import { colorScheme } from './colorScheme';
import { UnitFormat, Unit } from 'types/types';

export const formatUnits = (units: Unit[]) => {
  const colorSchemeCopy = [...colorScheme];

  const formatted: UnitFormat[] = units.reduce((acc: UnitFormat[], curr) => {
    if (
      !acc.find(
        (item: UnitFormat) =>
          item.label ===
            `${curr.dimensions.length}x${curr.dimensions.width} ${
              curr.climate ? 'climate' : 'non-climate'
            }` && item.climate === curr.climate
      )
    ) {
      acc.push({
        label: `${curr.dimensions.length}x${curr.dimensions.width} ${
          curr.climate ? 'climate' : 'non-climate'
        }`,
        data: [
          {
            x: curr.createdAt?.split('T')?.[0],
            y: curr.price,
          },
        ],
        climate: curr.climate,
        borderColor: colorSchemeCopy.splice(
          Math.floor(Math.random() * colorScheme.length - 1),
          1
        )?.[0],
        fill: false,
      });
    } else {
      acc
        .find(
          (item: UnitFormat) =>
            item.label ===
              `${curr.dimensions.length}x${curr.dimensions.width} ${
                curr.climate ? 'climate' : 'non-climate'
              }` && item.climate === curr.climate
        )
        ?.data.push({
          x: curr.createdAt?.split('T')?.[0],
          y: curr.price,
        });
    }
    return acc;
  }, []);
  return formatted;
};
