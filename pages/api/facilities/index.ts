import dbConnect from '../../../lib/dbConnect';
import Facility from '../../../models/Facility';
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongooseQueryParser } from 'mongoose-query-parser';
import Unit from 'models/Unit';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

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
        const facilities = await Facility.find({});
        res.status(200).json({ success: true, data: facilities });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const facilities = await Facility.create(req.body);
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
