import puppeteer from 'puppeteer';
import '../../../config';

const facilityTwoScrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  if (process.env.FACILITY_2_URL === undefined) {
    throw Error('Env variable undefined.');
  }
  await page.goto(process.env.FACILITY_2_URL);

  let data = await page.evaluate(() => {
    let items = Array.from(
      document.querySelectorAll('.pure-g li[class*="unit-division-"] ')
    );
    const results = items.map((item) => {
      return {
        size: item
          .querySelector('.container.size')
          ?.textContent?.match(/[+-]?([0-9]*[.])?[0-9]+/g),
        price: item.querySelector('.price')?.textContent?.replace(/,|\$/g, ''),
        climate: item
          .querySelector('.description')
          ?.firstChild?.textContent?.includes('Climate Controlled'),
        features: item
          .querySelector('.no-offer')
          ?.firstChild?.textContent?.trim()
          .split(', '),
        promotion: item
          .querySelector('.specials')
          ?.firstChild?.textContent?.trim(),
        unit_type: item.classList.contains('unit-division-1')
          ? 'small'
          : item.classList.contains('unit-division-2')
          ? 'large'
          : null,
      };
    });

    return results;
  });

  console.log(data);
  console.log('done');
  await browser.close();
  return data;
};

facilityTwoScrape();

export default facilityTwoScrape;
