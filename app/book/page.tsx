"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BookAppointment = () => {
  const searchParams = useSearchParams();
  
  const [providerId, setProviderId] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [email, setEmail] = useState("");
  const [reservationCode, setReservationCode] = useState("");
  const [appointmentId, setAppointmentId] = useState(""); // Store the appointment ID

  useEffect(() => {
    // Retrieve and set values from URL parameters
    const providerIdParam = searchParams.get("providerId");
    const dateTimeParam = searchParams.get("dateTime");

    if (providerIdParam) {
      setProviderId(providerIdParam);
    }
    if (dateTimeParam) {
      setDateTime(dateTimeParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ providerId, dateTime, userEmail: email }),
    });

    const data = await res.json();
    console.log(data);
    setReservationCode(data.reservationCode);
    setAppointmentId(data.appointmentId); // Assume the appointment ID is returned
  };

  const handleDelete = async () => {
    if (!appointmentId) {
      alert("No appointment to delete");
      return;
    }

    const res = await fetch(`/api/appointments/${appointmentId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Appointment deleted successfully");
      setReservationCode(""); // Clear reservation code
      setAppointmentId(""); // Clear appointment ID
    } else {
      alert("Failed to delete appointment");
    }
  };

  const handleReschedule = async () => {
    if (!appointmentId) {
      alert("No appointment to reschedule");
      return;
    }
  
    const newDateTime = prompt("Enter new date and time (YYYY-MM-DDTHH:mm):", dateTime);
    if (newDateTime) {
      const res = await fetch("/api/appointments/reschedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: appointmentId, newDateTime }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("Appointment rescheduled successfully");
        setDateTime(newDateTime); // Update state with new dateTime
  
        // Redirect to provider's page
        window.location.href = data.redirectTo;  // Redirect to provider's page
      } else {
        alert(`Failed to reschedule appointment: ${data.message}`);
      }
    }
  };
  
  

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-8">
      <div className="max-w-md w-full mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-black mb-6">Book an Appointment</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="providerId">Provider ID</Label>
            <Input
              type="text"
              id="providerId"
              className="w-full border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring focus:ring-blue-300"
              value={providerId}
              onChange={(e) => setProviderId(e.target.value)}
              required
              defaultValue={providerId} // Fill with provider ID if available
            />
          </div>
          <div>
            <Label htmlFor="dateTime">Appointment Date & Time</Label>
            <input
              type="text"
              id="dateTime"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              type="email"
              id="email"
              className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Book Appointment
          </Button>
        </form>
        {reservationCode && (
          <p className="mt-4 text-green-600 text-center">Your reservation code: <strong>{reservationCode}</strong></p>
        )}
        {appointmentId && (
          <div className="mt-6 flex justify-between">
            <Button onClick={handleDelete} className="bg-red-600 text-white hover:bg-red-700 transition duration-300">
              Delete Appointment
            </Button>
            <Button onClick={handleReschedule} className="bg-yellow-600 text-white hover:bg-yellow-700 transition duration-300">
              Reschedule Appointment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
