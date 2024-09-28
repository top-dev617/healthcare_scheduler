"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button"; 

import { Label } from "@/components/ui/label"; 


const CreateProvider = () => {
  const [facilityName, setFacilityName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [availableHours, setAvailableHours] = useState([{ dateTime: "" }]);
  const [successMessage, setSuccessMessage] = useState(""); // State to hold the success message

  const handleAddHour = () => {
    setAvailableHours([...availableHours, { dateTime: "" }]); // Add a new date-time entry
  };

  const handleChangeHour = (index: number, value: string) => {
    const newHours = [...availableHours];
    newHours[index].dateTime = value; // Update the specific date-time entry
    setAvailableHours(newHours);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/providers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        facilityName,
        doctorName,
        specialty,
        availableHours: availableHours.map(hour => hour.dateTime), // Extract date-times
      }),
    });

    if (res.ok) {
      const newProvider = await res.json();
      // Set success message with provider ID
      setSuccessMessage(`Provider added successfully! Provider ID: ${newProvider._id}`);
      // Optionally reset the form
      setFacilityName("");
      setDoctorName("");
      setSpecialty("");
      setAvailableHours([{ dateTime: "" }]); // Reset available hours
    } else {
      const errorData = await res.json();
      console.error(errorData.message || "Failed to create provider.");
      setSuccessMessage(""); // Clear the success message on error
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-8">
      <div className="max-w-md w-full mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-black mb-6">Create Healthcare Provider</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="facilityName">Facility Name</Label>
            <Input
              id="facilityName"
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="doctorName">Doctor Name</Label>
            <Input
              id="doctorName"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="specialty">Specialty</Label>
            <Input
              id="specialty"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Available Date and Time</Label>
            {availableHours.map((hour, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  type="datetime-local"
                  value={hour.dateTime}
                  onChange={(e) => handleChangeHour(index, e.target.value)}
                  required
                />
              </div>
            ))}
            <Button type="button" onClick={handleAddHour} className="mt-2">
              Add Another Date/Time
            </Button>
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Create Provider
          </Button>
        </form>
        {successMessage && (
          <div className="mt-4 p-4 bg-green-200 text-green-800 rounded">
            {successMessage} {/* Display success message */}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProvider;
