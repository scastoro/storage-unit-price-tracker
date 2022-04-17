import scrape from './scraper';

export const handleScrape = () => {
  if (process.env.FACILITY_1_URL === undefined) {
    throw new Error('Url undefined');
  }
  scrape(process.env.FACILITY_1_URL, {});
};

handleScrape();
