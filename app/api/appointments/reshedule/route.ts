import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Appointment from "@/models/Appointment";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { id, newDateTime } = await req.json(); // Expecting the new date and time in the request body

    // Find the appointment by ID and update its dateTime
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, { dateTime: newDateTime }, { new: true });

    if (!updatedAppointment) {
      return NextResponse.json({ message: "Appointment not found" }, { status: 404 });
    }

    // Delete the old appointment after updating
    await Appointment.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Appointment rescheduled and previous one deleted successfully",
      redirectTo: `/providers/${updatedAppointment.providerId}`,
    }, { status: 200 });
  } catch (error) {
    console.error("Error rescheduling appointment:", error);
    return NextResponse.json({ message: 'Internal server error', success: false }, { status: 500 });
  }
}
