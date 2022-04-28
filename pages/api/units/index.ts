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

  const { select, populate, sort, filter, limit } = parsed;
  console.log(parsed);

  let buildQuery = Unit.find();
  if (filter) {
    buildQuery = Unit.find(filter);
  }
  if (populate) {
    buildQuery = buildQuery.populate(populate);
  }
  if (select) {
    buildQuery = buildQuery.select(select);
  }
  if (limit) {
    buildQuery = buildQuery.limit(limit);
  }
  if (sort) {
    buildQuery = buildQuery.sort(sort);
  }

  switch (method) {
    case 'GET':
      try {
        const unit = await buildQuery;
        res.status(200).json({ success: true, data: unit });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: error });
      }
      break;
    // case 'POST':
    //   try {
    //     const unit = await Unit.create(req.body);
    //     res.status(201).json({ success: true, data: unit });
    //   } catch (error) {
    //     res.status(400).json({ success: false });
    //   }
    //   break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
