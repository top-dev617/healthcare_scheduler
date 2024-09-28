import mongoose, { Schema, Document } from "mongoose";

interface IProvider extends Document {
  facilityName: string;
  doctorName: string;
  specialty: string;
  availableHours: string[];
}

const ProviderSchema: Schema = new Schema({
  facilityName: { type: String, required: true },
  doctorName: { type: String, required: true },
  specialty: { type: String, required: true },
  availableHours: { type: [String], required: true },
});

export default mongoose.models.Provider || mongoose.model<IProvider>("Provider", ProviderSchema);
