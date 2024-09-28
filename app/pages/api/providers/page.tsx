import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../utils/dbConnect"
import Provider from "../../../../models/Provider";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    const providers = await Provider.find({});
    return res.status(200).json(providers);
  }

  res.status(400).json({ success: false });
}
