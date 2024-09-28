import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Provider from "@/models/Provider";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = params;  // provider id

  try {
    const provider = await Provider.findById(id);

    if (!provider) {
      return NextResponse.json({ message: "Provider not found" }, { status: 404 });
    }

    return NextResponse.json({ availableTimes: provider.availableHours }, { status: 200 });
  } catch (error) {
    console.error("Error fetching provider's available times:", error);
    return NextResponse.json({ message: 'Internal server error', success: false }, { status: 500 });
  }
}
