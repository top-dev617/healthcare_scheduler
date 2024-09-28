"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button"; 
import { Label } from "@/components/ui/label"; 
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; // Import useRouter

const CreateProvider = () => {
  const router = useRouter(); // Initialize useRouter
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
      toast.success(`Provider added successfully! Provider ID: ${newProvider._id}`);
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
    <div className="bg-gradient-to-r from-blue-200 to-blue-400 min-h-screen flex flex-col items-center py-8">
      <div className="max-w-md w-full mx-auto bg-white shadow-lg rounded-lg p-6 mt-16">
        <div className="flex justify-between items-center mb-6"> 
          <Button onClick={() => router.push('/providers')} className="flex items-center text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l6 6m-6-6l6-6" />
            </svg>
            Back to Providers
          </Button>
        </div>
        <h1 className="text-3xl font-bold text-center text-black mb-6">Create Healthcare Provider</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="facilityName">Facility Name</Label>
            <Input
              id="facilityName"
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
              placeholder="Enter facility name"
              required
              className="placeholder-black" // Apply placeholder color
            />
          </div>
          <div>
            <Label htmlFor="doctorName">Doctor Name</Label>
            <Input
              id="doctorName"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              placeholder="Enter doctor name"
              required
              className="placeholder-black" // Apply placeholder color
            />
          </div>
          <div>
            <Label htmlFor="specialty">Specialty</Label>
            <Input
              id="specialty"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              placeholder="Enter specialty"
              required
              className="placeholder-black" // Apply placeholder color
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
                  className="placeholder-black" // Apply placeholder color
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
