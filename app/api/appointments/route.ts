import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Appointment from "@/models/Appointment";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { providerId, dateTime, userEmail } = await req.json(); // Parse the JSON body from the request

    // Generate a unique reservation code
    const reservationCode = uuidv4();
    
    // Create a new appointment instance
    const appointment = new Appointment({ providerId, dateTime, userEmail, reservationCode });

    // Save the appointment to the database
    await appointment.save();

    // Respond with the reservation code
    return NextResponse.json({ reservationCode }, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ message: 'Internal server error', success: false }, { status: 500 });
  }
}
