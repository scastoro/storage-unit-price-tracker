import '../../../config';
import puppeteer from 'puppeteer';

const facilityOneScrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  if (process.env.FACILITY_1_URL === undefined) {
    throw Error('Env variable is undefined');
  }
  await page.goto(process.env.FACILITY_1_URL);

  let data = await page.evaluate(() => {
    let items = Array.from(document.querySelectorAll('.unit-item'));
    const results = items.map((item) => {
      return {
        size: item
          .querySelector('.card-unit-size-title')
          ?.textContent?.match(/[+-]?([0-9]*[.])?[0-9]+/g),
        start_price: item
          .querySelector('del')
          ?.textContent?.replace(/,|\$/g, ''),
        price: item
          .querySelector('.price-bold')
          ?.textContent?.replace(/,|\$/g, ''),
        climate: item
          .querySelector('.card-text')
          ?.firstChild?.textContent?.trim()
          .split(', ')
          .includes('Climate Controlled'),
        features: item
          .querySelector('.card-text')
          ?.firstChild?.textContent?.trim()
          .split(', '),
        promotion: item.querySelector('.card-text-promo')?.textContent?.trim(),
        unit_type: item.getAttribute('data-size'),
      };
    });

    return results;
  });

  console.log(data);
  console.log('done');
  await browser.close();
  return data;
};

facilityOneScrape();

export default facilityOneScrape;
