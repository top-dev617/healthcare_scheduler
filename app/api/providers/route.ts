import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Provider from '@/models/Provider';

export async function GET() {
  try {
    await dbConnect();
    const providers = await Provider.find({});
    return NextResponse.json(providers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    // Parse the JSON body from the request
    const { facilityName, doctorName, specialty, availableHours } = await req.json();

    // Create a new provider instance
    const newProvider = new Provider({
      facilityName,
      doctorName,
      specialty,
      availableHours,
    });

    // Save the new provider to the database
    await newProvider.save();

    // Respond with the newly created provider
    return NextResponse.json(newProvider, { status: 201 });
  } catch (error) {
    console.error("Error creating provider:", error);
    return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
  }
}
