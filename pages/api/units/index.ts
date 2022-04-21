import dbConnect from '../../../lib/dbConnect';
import Unit from '../../../models/Unit';
import { MongooseQueryParser } from 'mongoose-query-parser';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  console.log(query);

  await dbConnect();

  const parser = new MongooseQueryParser();
  const parsed = parser.parse(query);

  const { filter, limit } = parsed;
  console.log(parsed);

  switch (method) {
    case 'GET':
      try {
        const unit = await Unit.find(filter).limit(limit!);
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
