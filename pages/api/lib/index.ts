import facilityOneScrape from './facilityOneScrape';
import Unit from '../../../models/Unit';

// Define different facility scraping functions here
// Handle the passing of arguments and saving of resulting data into the database
// Export functions to be used by the endpoints
export const firstFacilityScrape = () => {
  const unit = new Unit({ name: 'test' });
  unit.save();
  facilityOneScrape();
};
