// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { firstFacilityScrape } from './lib/index';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  firstFacilityScrape();
  console.log('scraped');
  res.status(200).json({ name: 'John Doe' });
  console.log('response sent');
}
