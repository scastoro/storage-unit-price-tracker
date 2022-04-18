import scrape from './scraper';

// Define different facility scraping functions here
// Handle the passing of arguments and saving of resulting data into the database
// Export functions to be used by the endpoints
export const firstFacilityScrape = () => {
  if (process.env.FACILITY_1_URL === undefined) {
    throw new Error('Url undefined');
  }
  const selectors = {
    item: '.unit-item',
    size: '.card-unit-size-title',
    start_price: 'del',
    price: '.price-bold',
    climate: '.card-text',
    features: '.card-text',
    promotion: '.card-promo',
    unit_type: 'data-size',
  };
  scrape();
};
