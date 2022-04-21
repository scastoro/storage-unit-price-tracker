import dbConnect from '../../../lib/dbConnect';
import Facility from '../../../models/Facility';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const facilities = await Facility.find({}); /* find all the data in our database */
        res.status(200).json({ success: true, data: facilities });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const facilities = await Facility.create(req.body); /* create a new model in the database */
        res.status(201).json({ success: true, data: facilities });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
