import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Appointment from "@/models/Appointment";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { id, newDateTime } = await req.json();

  try {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return NextResponse.json({ message: "Appointment not found" }, { status: 404 });
    }

    // Update the appointment's dateTime
    appointment.dateTime = newDateTime;
    await appointment.save();

    return NextResponse.json({ message: "Appointment rescheduled successfully", redirectTo: `/appointments/${id}` }, { status: 200 });
  } catch (error) {
    console.error("Error rescheduling appointment:", error);
    return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
  }
}
