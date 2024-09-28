import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../utils/dbConnect";
import Appointment from "../../../../models/Appointment";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    const { providerId, dateTime, userEmail } = req.body;

    const reservationCode = uuidv4();
    const appointment = new Appointment({ providerId, dateTime, userEmail, reservationCode });

    await appointment.save();
    return res.status(201).json({ reservationCode });
  }

  res.status(400).json({ success: false });
}
