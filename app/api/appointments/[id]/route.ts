import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Appointment from "@/models/Appointment";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = params; // Extract the appointment ID from the request parameters

  try {
    // Find the appointment by ID and delete it
    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return NextResponse.json({ message: 'Appointment not found', success: false }, { status: 404 });
    }

    return NextResponse.json({ message: 'Appointment deleted successfully', success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return NextResponse.json({ message: 'Internal server error', success: false }, { status: 500 });
  }
}
