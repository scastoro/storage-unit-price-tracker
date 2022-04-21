import dbConnect from '../../../lib/dbConnect';
import Unit from '../../../models/Unit';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const unit = await Unit.find({}).limit(5);
        res.status(200).json({ success: true, data: unit });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const unit = await Unit.create(req.body);
        res.status(201).json({ success: true, data: unit });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
