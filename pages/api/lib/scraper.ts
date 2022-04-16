import puppeteer from 'puppeteer-core';

export const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  if (process.env.FACILITY_1_URL === undefined) {
    throw new Error('Url undefined');
  }
  await page.goto(process.env.FACILITY_1_URL);
  let data = await page.evaluate(() => {
    let results: object[] = [];
    let items = document.querySelectorAll('.unit-item');
    items.forEach((item) => {
      results.push({
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
      });
    });

    return results;
  });

  console.log(data);
  await browser.close();
};
