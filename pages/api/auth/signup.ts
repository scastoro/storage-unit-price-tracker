import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const hashedPw = await bcrypt.hash(req.body.password, 10);
        const newUser = {
          username: req.body.username,
          password: hashedPw,
          email: req.body.email,
          role: req.body.role,
        };

        const response = await User.create(newUser);
        if (response) {
          res.status(201).json({ success: true, data: newUser });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
