import { Unit, UnitSizes } from 'types/types';

export default function getUnitSizes(units: Unit[]): UnitSizes[] {
  return units.reduce((acc: UnitSizes[], curr) => {
    if (
      !acc.find(
        (unit) =>
          unit.dimensions.length === curr.dimensions.length &&
          unit.dimensions.width === curr.dimensions.width &&
          unit.climate === unit.climate
      )
    ) {
      acc.push({
        dimensions: {
          length: curr.dimensions.length,
          width: curr.dimensions.width,
        },
        climate: curr.climate,
        selected: true,
        type: curr?.type,
        _id: curr._id,
      });
    }
    return acc;
  }, []);
}
