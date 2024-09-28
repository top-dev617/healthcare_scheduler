
import mongoose, { Schema, Document } from "mongoose";

interface IAppointment extends Document {
  providerId: string;
  dateTime: string;
  userEmail?: string;
  reservationCode: string;
}

const AppointmentSchema: Schema = new Schema({
  providerId: { type: String, required: true },
  dateTime: { type: String, required: true },
  userEmail: { type: String, required: false },
  reservationCode: { type: String, required: true, unique: true },
});

export default mongoose.models.Appointment || mongoose.model<IAppointment>("Appointment", AppointmentSchema);
